
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Send, CheckCircle, AlertCircle } from "lucide-react";
import ChatInterface from "@/components/ChatInterface";
import { generateGrievanceResponse } from "@/utils/grievanceAI";

interface Message {
  type: "bot" | "user";
  content: string;
  isComplete?: boolean;
}

const Grievance = () => {
  const [step, setStep] = useState(0);
  const [language, setLanguage] = useState("english");
  const [isLoading, setIsLoading] = useState(false);
  const [grievanceData, setGrievanceData] = useState({
    name: "",
    contact: "",
    email: "",
    type: "",
    description: "",
    location: "",
    date: "",
    urgency: "",
    previousReport: "",
    outcome: ""
  });
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "bot",
      content: "🙏 Namaste! I'm your Grievance Assistant. I'm here to help you file and track your complaints.\n\nI'll guide you through the process step by step. Let's start!\n\nMay I know your full name?"
    }
  ]);

  const grievanceTypes = {
    english: [
      "Corruption", "Harassment", "Service Delay", "Poor Infrastructure", "Water Issues",
      "Electricity Problems", "Healthcare Issues", "Education Problems", "Transport Issues",
      "Environmental Concerns", "Other"
    ],
    hindi: [
      "भ्रष्टाचार", "उत्पीड़न", "सेवा में देरी", "खराब ढांचा", "पानी की समस्या",
      "बिजली की समस्या", "स्वास्थ्य की समस्या", "शिक्षा की समस्या", "परिवहन की समस्या",
      "पर्यावरण संबंधी चिंता", "अन्य"
    ]
  };

  const urgencyLevels = {
    english: ["Low", "Medium", "High", "Immediate"],
    hindi: ["कम", "मध्यम", "उच्च", "तत्काल"]
  };

  const handleUserMessage = async (message: string) => {
    setMessages(prev => [...prev, { type: "user", content: message }]);
    setIsLoading(true);
    
    try {
      let botResponse = "";
      
      switch(step) {
        case 0:
          setGrievanceData(prev => ({ ...prev, name: message }));
          botResponse = language === "english"
            ? "Thank you! Please provide your contact number:"
            : "धन्यवाद! कृपया अपना संपर्क नंबर दें:";
          setStep(1);
          break;
          
        case 1:
          setGrievanceData(prev => ({ ...prev, contact: message }));
          botResponse = language === "english"
            ? "Please provide your email address (optional):"
            : "कृपया अपना ईमेल पता दें (वैकल्पिक):";
          setStep(2);
          break;
          
        case 2:
          setGrievanceData(prev => ({ ...prev, email: message }));
          botResponse = language === "english"
            ? "What type of grievance would you like to file? Please choose from:\n" + grievanceTypes.english.map((type, i) => `${i+1}. ${type}`).join('\n')
            : "आप किस प्रकार की शिकायत दर्ज करना चाहते हैं? कृपया चुनें:\n" + grievanceTypes.hindi.map((type, i) => `${i+1}. ${type}`).join('\n');
          setStep(3);
          break;
          
        case 3:
          const typeIndex = parseInt(message) - 1;
          const selectedType = grievanceTypes[language][typeIndex] || message;
          setGrievanceData(prev => ({ ...prev, type: selectedType }));
          botResponse = language === "english"
            ? "Please describe your issue in detail:"
            : "कृपया अपनी समस्या का विस्तृत विवरण दें:";
          setStep(4);
          break;
          
        case 4:
          setGrievanceData(prev => ({ ...prev, description: message }));
          botResponse = language === "english"
            ? "Where did this issue occur? (Address or location):"
            : "यह समस्या कहाँ हुई? (पता या स्थान):";
          setStep(5);
          break;
          
        case 5:
          setGrievanceData(prev => ({ ...prev, location: message }));
          botResponse = language === "english"
            ? "When did this incident occur? (Date):"
            : "यह घटना कब घटी? (दिनांक):";
          setStep(6);
          break;
          
        case 6:
          setGrievanceData(prev => ({ ...prev, date: message }));
          botResponse = language === "english"
            ? "What is the urgency level?\n1. Low\n2. Medium\n3. High\n4. Immediate"
            : "तात्कालिकता का स्तर क्या है?\n1. कम\n2. मध्यम\n3. उच्च\n4. तत्काल";
          setStep(7);
          break;
          
        case 7:
          const urgencyIndex = parseInt(message) - 1;
          const selectedUrgency = urgencyLevels[language][urgencyIndex] || message;
          setGrievanceData(prev => ({ ...prev, urgency: selectedUrgency }));
          botResponse = language === "english"
            ? "Have you reported this issue before? (Yes/No):"
            : "क्या आपने इस समस्या की पहले रिपोर्ट की है? (हाँ/नहीं):";
          setStep(8);
          break;
          
        case 8:
          setGrievanceData(prev => ({ ...prev, previousReport: message }));
          if (message.toLowerCase().includes('yes') || message.toLowerCase().includes('हाँ')) {
            botResponse = language === "english"
              ? "What was the outcome of your previous report?"
              : "आपकी पिछली रिपोर्ट का क्या परिणाम था?";
            setStep(9);
          } else {
            await generateGrievanceSummary();
            return;
          }
          break;
          
        case 9:
          setGrievanceData(prev => ({ ...prev, outcome: message }));
          await generateGrievanceSummary();
          return;
      }
      
      setMessages(prev => [...prev, { type: "bot", content: botResponse }]);
    } catch (error) {
      const errorMessage = language === 'hindi' 
        ? 'माफ़ करें, कुछ तकनीकी समस्या है।'
        : 'Sorry, there was a technical issue.';
      setMessages(prev => [...prev, { type: "bot", content: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateGrievanceSummary = async () => {
    const grievanceId = `GRV-${Date.now()}`;
    const summary = language === "english" ? `
🎯 GRIEVANCE SUMMARY

📋 Grievance ID: ${grievanceId}
👤 Name: ${grievanceData.name}
📞 Contact: ${grievanceData.contact}
📧 Email: ${grievanceData.email}
🏷️ Type: ${grievanceData.type}
📍 Location: ${grievanceData.location}
📅 Date of Incident: ${grievanceData.date}
⚡ Urgency: ${grievanceData.urgency}

📝 Description:
${grievanceData.description}

${grievanceData.previousReport ? `📋 Previous Report: ${grievanceData.previousReport}` : ''}
${grievanceData.outcome ? `📊 Previous Outcome: ${grievanceData.outcome}` : ''}

✅ Status: Successfully Submitted
🕐 Expected Response: 15-30 working days
📲 Updates: Will be sent via SMS/Email

Thank you for using our Grievance Portal.
    ` : `
🎯 शिकायत सारांश

📋 शिकायत ID: ${grievanceId}
👤 नाम: ${grievanceData.name}
📞 संपर्क: ${grievanceData.contact}
📧 ईमेल: ${grievanceData.email}
🏷️ प्रकार: ${grievanceData.type}
📍 स्थान: ${grievanceData.location}
📅 घटना की तारीख: ${grievanceData.date}
⚡ तात्कालिकता: ${grievanceData.urgency}

📝 विवरण:
${grievanceData.description}

${grievanceData.previousReport ? `📋 पिछली रिपोर्ट: ${grievanceData.previousReport}` : ''}
${grievanceData.outcome ? `📊 पिछला परिणाम: ${grievanceData.outcome}` : ''}

✅ स्थिति: सफलतापूर्वक जमा किया गया
🕐 अपेक्षित प्रतिक्रिया: 15-30 कार्य दिवस
📲 अपडेट: SMS/ईमेल के माध्यम से भेजे जाएंगे

धन्यवाद!
    `;

    setMessages(prev => [...prev, { 
      type: "bot", 
      content: summary,
      isComplete: true
    }]);

    // Add guidance message
    const guidanceMessage = language === "english" 
      ? "📋 **Next Steps & Required Documents:**\n\n**For Grievance Filing:**\n• Keep your Grievance ID for tracking\n• Retain copies of all related documents\n• Follow up if no response in stipulated time\n• Escalate to higher authorities if needed\n\n**Required Documents (if applicable):**\n• Copy of previous complaints\n• Supporting evidence (photos, receipts)\n• Identity proof\n• Address proof\n• Relevant certificates or permits\n\n**Process:**\n1. Submit grievance through official portal\n2. Wait for acknowledgment\n3. Track status using Grievance ID\n4. Respond to any queries from officials\n5. Escalate if unsatisfied with resolution"
      : "📋 **अगले कदम और आवश्यक दस्तावेज:**\n\n**शिकायत दर्ज करने के लिए:**\n• ट्रैकिंग के लिए अपना शिकायत ID रखें\n• सभी संबंधित दस्तावेजों की प्रति रखें\n• निर्धारित समय में जवाब न मिले तो फॉलो अप करें\n• जरूरत पड़ने पर उच्च अधिकारियों तक पहुंचें\n\n**आवश्यक दस्तावेज (यदि लागू हो):**\n• पिछली शिकायतों की प्रति\n• सहायक सबूत (फोटो, रसीदें)\n• पहचान प्रमाण\n• पता प्रमाण\n• संबंधित प्रमाणपत्र या परमिट\n\n**प्रक्रिया:**\n1. आधिकारिक पोर्टल के माध्यम से शिकायत जमा करें\n2. स्वीकृति की प्रतीक्षा करें\n3. शिकायत ID का उपयोग करके स्थिति ट्रैक करें\n4. अधिकारियों के किसी भी प्रश्न का उत्तर दें\n5. समाधान से संतुष्ट न होने पर आगे बढ़ाएं";

    setTimeout(() => {
      setMessages(prev => [...prev, { type: "bot", content: guidanceMessage }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-red-50 to-pink-100">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Grievance Assistant</h1>
          <p className="text-xl text-gray-600">Smart grievance filing and tracking system</p>
        </div>

        {/* Language Toggle */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-full p-1 shadow-lg border">
            <div className="flex space-x-1">
              <Button 
                variant={language === "english" ? "default" : "ghost"} 
                size="sm"
                onClick={() => setLanguage("english")}
                className={language === "english" ? "bg-red-500 hover:bg-red-600" : ""}
              >
                English
              </Button>
              <Button 
                variant={language === "hindi" ? "default" : "ghost"} 
                size="sm"
                onClick={() => setLanguage("hindi")}
                className={language === "hindi" ? "bg-red-500 hover:bg-red-600" : ""}
              >
                हिंदी
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Chat Interface - Larger */}
          <div className="lg:col-span-3">
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-red-50 to-pink-50">
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5 text-red-600" />
                  <span>Grievance Chat Assistant</span>
                  {isLoading && <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin ml-2"></div>}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="p-4">
                  <ChatInterface
                    messages={messages}
                    onSendMessage={handleUserMessage}
                    placeholder={language === "english" ? "Type your response..." : "अपना उत्तर टाइप करें..."}
                    language={language}
                    className="h-[600px]"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Smaller */}
          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>Important Tips</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-xs text-gray-600">
                  <li>• Provide detailed information</li>
                  <li>• Include evidence if available</li>
                  <li>• Track using Grievance ID</li>
                  <li>• Follow up if needed</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grievance;
