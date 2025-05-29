
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Send, CheckCircle, AlertCircle, Home, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import ChatInterface from "@/components/ChatInterface";
import { generateRTIResponse, generateRTIDepartment, enhanceRTIApplication } from "@/utils/rtiAI";

interface Message {
  type: "bot" | "user";
  content: string;
  draft?: string;
  isComplete?: boolean;
}

const RTI = () => {
  const [step, setStep] = useState(0);
  const [language, setLanguage] = useState("english");
  const [isLoading, setIsLoading] = useState(false);
  const [rtiData, setRtiData] = useState({
    name: "",
    address: "",
    contact: "",
    email: "",
    issue: "",
    details: "",
    department: "",
    state: ""
  });
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "bot",
      content: "🙏 Namaste! I'm JAN-RTI, your digital guide for RTI (Right to Information) assistance.\n\nI'll help you draft a professional RTI application step by step.\n\nFirst, may I know your full name?"
    }
  ]);

  const handleUserMessage = async (message: string) => {
    setMessages(prev => [...prev, { type: "user", content: message }]);
    setIsLoading(true);
    
    try {
      let botResponse = "";
      
      switch(step) {
        case 0:
          setRtiData(prev => ({ ...prev, name: message }));
          botResponse = language === "english"
            ? "Thank you! Please provide your full address:"
            : "धन्यवाद! कृपया अपना पूरा पता दें:";
          setStep(1);
          break;
          
        case 1:
          setRtiData(prev => ({ ...prev, address: message }));
          botResponse = language === "english"
            ? "Please provide your contact number:"
            : "कृपया अपना संपर्क नंबर दें:";
          setStep(2);
          break;
          
        case 2:
          setRtiData(prev => ({ ...prev, contact: message }));
          botResponse = language === "english"
            ? "Please provide your email address (optional):"
            : "कृपया अपना ईमेल पता दें (वैकल्पिक):";
          setStep(3);
          break;
          
        case 3:
          setRtiData(prev => ({ ...prev, email: message }));
          botResponse = language === "english"
            ? "Which state are you from?"
            : "आप किस राज्य से हैं?";
          setStep(4);
          break;
          
        case 4:
          setRtiData(prev => ({ ...prev, state: message }));
          botResponse = language === "english"
            ? "What is the main issue you want information about?\n\n1. 🏛️ Government Policy\n2. 💰 Financial Records\n3. 🏗️ Development Projects\n4. 🎓 Education Related\n5. 🏥 Healthcare Services\n6. 🌱 Environmental Issues\n7. 📋 Public Records\n8. 🚰 Water & Sanitation\n9. ⚡ Electricity Issues\n10. 🚌 Transportation\n11. 🆔 Certificate Issues\n12. 💼 Employment/Recruitment\n13. 🏠 Housing Schemes\n14. 🌾 Agriculture Support\n15. 📱 Digital Services\n16. 🔍 Other\n\nPlease choose a number or describe your issue:"
            : "आप किस मुख्य मुद्दे के बारे में जानकारी चाहते हैं?\n\n1. 🏛️ सरकारी नीति\n2. 💰 वित्तीय रिकॉर्ड\n3. 🏗️ विकास परियोजनाएं\n4. 🎓 शिक्षा संबंधी\n5. 🏥 स्वास्थ्य सेवाएं\n6. 🌱 पर्यावरण मुद्दे\n7. 📋 सार्वजनिक रिकॉर्ड\n8. 🚰 पानी और स्वच्छता\n9. ⚡ बिजली की समस्याएं\n10. 🚌 परिवहन\n11. 🆔 प्रमाणपत्र मुद्दे\n12. 💼 रोजगार/भर्ती\n13. 🏠 आवास योजनाएं\n14. 🌾 कृषि सहायता\n15. 📱 डिजिटल सेवाएं\n16. 🔍 अन्य\n\nकृपया एक नंबर चुनें या अपना मुद्दा बताएं:";
          setStep(5);
          break;
          
        case 5:
          const issueTypes = {
            english: [
              "Government Policy", "Financial Records", "Development Projects", 
              "Education Related", "Healthcare Services", "Environmental Issues",
              "Public Records", "Water & Sanitation", "Electricity Issues",
              "Transportation", "Certificate Issues", "Employment/Recruitment",
              "Housing Schemes", "Agriculture Support", "Digital Services", "Other"
            ],
            hindi: [
              "सरकारी नीति", "वित्तीय रिकॉर्ड", "विकास परियोजनाएं",
              "शिक्षा संबंधी", "स्वास्थ्य सेवाएं", "पर्यावरण मुद्दे",
              "सार्वजनिक रिकॉर्ड", "पानी और स्वच्छता", "बिजली की समस्याएं",
              "परिवहन", "प्रमाणपत्र मुद्दे", "रोजगार/भर्ती",
              "आवास योजनाएं", "कृषि सहायता", "डिजिटल सेवाएं", "अन्य"
            ]
          };
          
          const issueIndex = parseInt(message) - 1;
          const selectedIssue = issueTypes[language][issueIndex] || message;
          setRtiData(prev => ({ ...prev, issue: selectedIssue }));
          
          botResponse = language === "english"
            ? "Please provide detailed information about what specific information you need:"
            : "कृपया विस्तार से बताएं कि आपको कौन सी विशिष्ट जानकारी चाहिए:";
          setStep(6);
          break;
          
        case 6:
          setRtiData(prev => ({ ...prev, details: message }));
          await generateRTIDraft();
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

  const generateRTIDraft = async () => {
    try {
      // Auto-generate department
      const department = await generateRTIDepartment(rtiData.issue, language);
      const updatedRtiData = { ...rtiData, department };
      
      // Generate enhanced application body
      const enhancedBody = await enhanceRTIApplication(updatedRtiData, language);
      
      const currentData = {
        ...updatedRtiData,
        details: enhancedBody
      };
      
      const rtiId = `RTI-${Date.now()}`;
      const applicationDraft = language === "english" ? 
        `To: The Public Information Officer
${currentData.department}
${currentData.state}

Subject: Application under Right to Information Act, 2005

Respected Sir/Madam,

I, ${currentData.name}, a citizen of India, residing at ${currentData.address}, am seeking information under the Right to Information Act, 2005.

${currentData.details}

I am willing to pay the prescribed fee as per the RTI Act. If any additional fee is required, please inform me beforehand. If the information sought is not available with your office, please transfer this application to the concerned public authority under Section 6(3) of the RTI Act.

I request you to provide the information within the stipulated time period of 30 days as mandated by the RTI Act, 2005.

Contact Details:
Mobile: ${currentData.contact}
Email: ${currentData.email}

Thanking you,

${currentData.name}
Date: ${new Date().toLocaleDateString()}
Application ID: ${rtiId}` 

        : `सेवा में: जन सूचना अधिकारी
${currentData.department}
${currentData.state}

विषय: सूचना का अधिकार अधिनियम, 2005 के तहत आवेदन

महोदय/महोदया,

मैं, ${currentData.name}, भारत का नागरिक, निवासी ${currentData.address}, सूचना का अधिकार अधिनियम, 2005 के तहत जानकारी चाहता हूं।

${currentData.details}

मैं आरटीआई अधिनियम के अनुसार निर्धारित शुल्क देने को तैयार हूं। यदि कोई अतिरिक्त शुल्क आवश्यक है, तो कृपया पहले से सूचित करें। यदि मांगी गई जानकारी आपके कार्यालय में उपलब्ध नहीं है, तो कृपया इस आवेदन को आरटीआई अधिनियम की धारा 6(3) के तहत संबंधित लोक प्राधिकरण को स्थानांतरित करें।

मैं आपसे अनुरोध करता हूं कि आरटीआई अधिनियम, 2005 द्वारा निर्देशित 30 दिनों की निर्धारित समय सीमा के भीतर जानकारी प्रदान करें।

संपर्क विवरण:
मोबाइल: ${currentData.contact}
ईमेल: ${currentData.email}

धन्यवाद,

${currentData.name}
दिनांक: ${new Date().toLocaleDateString()}
आवेदन ID: ${rtiId}`;

      const summary = language === "english" ? `
✅ RTI APPLICATION READY

📋 Application ID: ${rtiId}
👤 Applicant: ${currentData.name}
🏛️ Department: ${currentData.department}
📍 State: ${currentData.state}
📱 Contact: ${currentData.contact}
📧 Email: ${currentData.email}

🎯 Issue Category: ${currentData.issue}

Your RTI application has been drafted successfully!
      ` : `
✅ आरटीआई आवेदन तैयार

📋 आवेदन ID: ${rtiId}
👤 आवेदक: ${currentData.name}
🏛️ विभाग: ${currentData.department}
📍 राज्य: ${currentData.state}
📱 संपर्क: ${currentData.contact}
📧 ईमेल: ${currentData.email}

🎯 मुद्दा श्रेणी: ${currentData.issue}

आपका आरटीआई आवेदन सफलतापूर्वक तैयार हो गया है!
      `;

      setMessages(prev => [...prev, { 
        type: "bot", 
        content: summary,
        draft: applicationDraft,
        isComplete: true
      }]);

      // Add guidance message
      const guidanceMessage = language === "english" 
        ? "📋 **Next Steps & Required Documents:**\n\n**For RTI Filing:**\n• Submit through official RTI portal or in person\n• Pay prescribed fee (₹10 for central govt, varies for states)\n• Keep acknowledgment receipt for tracking\n• Follow up if no response in 30 days\n\n**Required Documents:**\n• Copy of your ID proof\n• Address proof\n• Fee payment receipt\n• This RTI application\n\n**Process:**\n1. Submit application with fee\n2. Get acknowledgment receipt\n3. Wait for response (30 days)\n4. Appeal if unsatisfied with response\n5. Escalate to Information Commission if needed"
        : "📋 **अगले कदम और आवश्यक दस्तावेज:**\n\n**आरटीआई दाखिल करने के लिए:**\n• आधिकारिक आरटीआई पोर्टल या व्यक्तिगत रूप से जमा करें\n• निर्धारित शुल्क दें (केंद्र सरकार के लिए ₹10, राज्यों के लिए अलग)\n• ट्रैकिंग के लिए पावती रसीद रखें\n• 30 दिनों में जवाब न मिले तो फॉलो अप करें\n\n**आवश्यक दस्तावेज:**\n• आपके ID प्रूफ की कॉपी\n• पता प्रमाण\n• शुल्क भुगतान रसीद\n• यह आरटीआई आवेदन\n\n**प्रक्रिया:**\n1. शुल्क के साथ आवेदन जमा करें\n2. पावती रसीद प्राप्त करें\n3. प्रतिक्रिया का इंतज़ार करें (30 दिन)\n4. प्रतिक्रिया से संतुष्ट न होने पर अपील करें\n5. जरूरत पड़ने पर सूचना आयोग तक पहुंचें";

      setTimeout(() => {
        setMessages(prev => [...prev, { type: "bot", content: guidanceMessage }]);
      }, 1000);

    } catch (error) {
      console.error('Error generating RTI draft:', error);
      const errorMessage = language === 'hindi' 
        ? 'आवेदन तैयार करने में समस्या हुई।'
        : 'Error generating application draft.';
      setMessages(prev => [...prev, { type: "bot", content: errorMessage }]);
    }
  };

  const handleChoiceClick = (choice: string) => {
    handleUserMessage(choice);
  };

  return (
    <div className="min-h-screen py-4 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-between items-center mb-4">
            <Link to="/">
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Button>
            </Link>
            <div className="flex justify-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="w-20"></div> {/* Spacer for alignment */}
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">JAN-RTI Assistant</h1>
          <p className="text-lg md:text-xl text-gray-600">AI-powered RTI application assistance</p>
        </div>

        {/* Language Toggle */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-full p-1 shadow-lg border">
            <div className="flex space-x-1">
              <Button 
                variant={language === "english" ? "default" : "ghost"} 
                size="sm"
                onClick={() => setLanguage("english")}
                className={language === "english" ? "bg-blue-500 hover:bg-blue-600" : ""}
              >
                English
              </Button>
              <Button 
                variant={language === "hindi" ? "default" : "ghost"} 
                size="sm"
                onClick={() => setLanguage("hindi")}
                className={language === "hindi" ? "bg-blue-500 hover:bg-blue-600" : ""}
              >
                हिंदी
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chat Interface - Larger */}
          <div className="lg:col-span-3">
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span>RTI Chat Assistant</span>
                  {isLoading && <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin ml-2"></div>}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="p-4" style={{ height: '600px' }}>
                  <ChatInterface
                    messages={messages}
                    onSendMessage={handleUserMessage}
                    placeholder={language === "english" ? "Type your response..." : "अपना उत्तर टाइप करें..."}
                    language={language}
                    className="h-full"
                    isLoading={isLoading}
                  />
                  
                  {/* Quick Choice Buttons */}
                  {step === 5 && (
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
                      {Array.from({length: 16}, (_, i) => (
                        <Button
                          key={i+1}
                          variant="outline"
                          size="sm"
                          onClick={() => handleChoiceClick((i+1).toString())}
                          className="text-xs"
                        >
                          {i+1}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Smaller */}
          <div className="space-y-4">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>Quick Tips</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-xs text-gray-600">
                  <li>• Be specific about the information you need</li>
                  <li>• Include relevant dates and reference numbers</li>
                  <li>• Response time is usually 30 days</li>
                  <li>• Keep a copy of your application</li>
                  <li>• Follow up if no response received</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-sm">
                  <FileText className="w-4 h-4" />
                  <span>RTI Portals</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-xs">
                  <a 
                    href="https://rtionline.gov.in" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block p-2 bg-blue-50 rounded hover:bg-blue-100 transition-colors"
                  >
                    National RTI Portal
                  </a>
                  <a 
                    href="https://cg.gov.in/rti" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block p-2 bg-blue-50 rounded hover:bg-blue-100 transition-colors"
                  >
                    Chhattisgarh RTI Portal
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RTI;
