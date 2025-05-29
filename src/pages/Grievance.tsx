
import Layout from "@/components/Layout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Send, Upload, AlertCircle, CheckCircle } from "lucide-react";

interface Message {
  type: "bot" | "user";
  content: string;
  isComplete?: boolean;
}

const Grievance = () => {
  const [step, setStep] = useState(0);
  const [language, setLanguage] = useState("english");
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
      "Corruption",
      "Harassment",
      "Service Delay",
      "Poor Infrastructure",
      "Water Issues",
      "Electricity Problems",
      "Healthcare Issues",
      "Education Problems",
      "Transport Issues",
      "Environmental Concerns",
      "Other"
    ],
    hindi: [
      "भ्रष्टाचार",
      "उत्पीड़न",
      "सेवा में देरी",
      "खराब ढांचा",
      "पानी की समस्या",
      "बिजली की समस्या",
      "स्वास्थ्य की समस्या",
      "शिक्षा की समस्या",
      "परिवहन की समस्या",
      "पर्यावरण संबंधी चिंता",
      "अन्य"
    ]
  };

  const urgencyLevels = {
    english: ["Low", "Medium", "High", "Immediate"],
    hindi: ["कम", "मध्यम", "उच्च", "तत्काल"]
  };

  const handleUserMessage = (message: string) => {
    setMessages(prev => [...prev, { type: "user", content: message }]);
    
    setTimeout(() => {
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
            generateGrievanceSummary();
            return;
          }
          break;
          
        case 9:
          setGrievanceData(prev => ({ ...prev, outcome: message }));
          generateGrievanceSummary();
          return;
      }
      
      setMessages(prev => [...prev, { type: "bot", content: botResponse }]);
    }, 1000);
  };

  const generateGrievanceSummary = () => {
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

Thank you for using our Grievance Portal. Your concern has been registered and will be addressed by the relevant authorities.
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

हमारे शिकायत पोर्टल का उपयोग करने के लिए धन्यवाद। आपकी चिंता दर्ज कर ली गई है और इसे संबंधित अधिकारियों द्वारा संबोधित किया जाएगा।
    `;

    setMessages(prev => [...prev, { 
      type: "bot", 
      content: summary,
      isComplete: true
    }]);
  };

  return (
    <Layout>
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
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

          {/* Chat Interface */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5" />
                <span>Grievance Chat Assistant</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96 overflow-y-auto mb-4 p-4 bg-gray-50 rounded-lg">
                {messages.map((message, index) => (
                  <div key={index} className={`mb-4 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                    <div className={`inline-block p-3 rounded-lg max-w-xs lg:max-w-md ${
                      message.type === 'user' 
                        ? 'bg-red-500 text-white' 
                        : 'bg-white text-gray-800 border'
                    }`}>
                      <pre className="whitespace-pre-wrap font-sans text-sm">{message.content}</pre>
                      {message.isComplete && (
                        <div className="mt-3">
                          <Button 
                            size="sm" 
                            className="bg-green-500 hover:bg-green-600"
                            onClick={() => {
                              setStep(0);
                              setGrievanceData({
                                name: "", contact: "", email: "", type: "",
                                description: "", location: "", date: "", urgency: "",
                                previousReport: "", outcome: ""
                              });
                              setMessages([{
                                type: "bot",
                                content: "Would you like to file another grievance? If yes, please provide your name:"
                              }]);
                            }}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            File New Grievance
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex space-x-2">
                <Input
                  placeholder={language === "english" ? "Type your response..." : "अपना उत्तर टाइप करें..."}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      const target = e.target as HTMLInputElement;
                      const message = target.value.trim();
                      if (message) {
                        handleUserMessage(message);
                        target.value = '';
                      }
                    }
                  }}
                />
                <Button 
                  onClick={() => {
                    const input = document.querySelector('input') as HTMLInputElement;
                    const message = input.value.trim();
                    if (message) {
                      handleUserMessage(message);
                      input.value = '';
                    }
                  }}
                  className="bg-red-500 hover:bg-red-600"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Additional Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="w-5 h-5" />
                  <span>Evidence Upload</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">
                  Upload supporting documents, images, or audio files
                </p>
                <Button variant="outline" className="w-full">
                  <Upload className="w-4 h-4 mr-2" />
                  Select Files
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5" />
                  <span>Important Tips</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Provide detailed and accurate information</li>
                  <li>• Include evidence if available</li>
                  <li>• Track your grievance using the ID</li>
                  <li>• Follow up if no response within timeline</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Grievance;
