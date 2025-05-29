
import Layout from "@/components/Layout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Globe, User } from "lucide-react";
import ChatInterface from "@/components/ChatInterface";
import QuickActionButtons from "@/components/QuickActionButtons";
import { generateRTIResponse, generateRTIDepartment, enhanceRTIApplication } from "@/utils/rtiAI";

interface Message {
  type: "bot" | "user";
  content: string;
  draft?: string;
}

const RTI = () => {
  const [step, setStep] = useState(0);
  const [language, setLanguage] = useState("english");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    state: "",
    department: "",
    issue: "",
    details: ""
  });
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "bot",
      content: "🙏 Namaste! I'm JAN-RTI — your digital guide for RTI (Right to Information) assistance.\n\nPlease choose what you'd like to do:"
    }
  ]);

  const initialOptions = [
    "File an RTI Application",
    "Get RTI Information & Guidance"
  ];

  const languageOptions = [
    "English",
    "हिंदी (Hindi)"
  ];

  const handleUserMessage = async (message: string) => {
    setMessages(prev => [...prev, { type: "user", content: message }]);
    setIsLoading(true);
    
    try {
      let botResponse = "";
      
      if (step === 0) {
        if (message.includes("File") || message.includes("1")) {
          botResponse = language === "english" 
            ? "🔄 Please select your preferred language:"
            : "🔄 कृपया अपनी भाषा चुनें:";
          setStep(1);
        } else {
          botResponse = await generateRTIResponse(message, language);
        }
      } else if (step === 1) {
        if (message.toLowerCase().includes("hindi") || message.includes("हिंदी")) {
          setLanguage("hindi");
          botResponse = "कृपया अपना पूरा नाम बताएं।";
        } else {
          setLanguage("english");
          botResponse = "May I know your full name?";
        }
        setStep(2);
      } else if (step === 2) {
        setFormData(prev => ({ ...prev, name: message }));
        botResponse = language === "english"
          ? "Which state are you from?"
          : "आप किस राज्य से हैं?";
        setStep(3);
      } else if (step === 3) {
        setFormData(prev => ({ ...prev, state: message }));
        botResponse = language === "english"
          ? "Great! Please tell me what issue you want information about or file an RTI for. Just a keyword is enough (e.g., water, pension, electricity, LPG)."
          : "बहुत बढ़िया! कृपया बताएं कि आप किस मुद्दे के बारे में जानकारी चाहते हैं या RTI दाखिल करना चाहते हैं। सिर्फ एक कीवर्ड काफी है (जैसे: पानी, पेंशन, बिजली, LPG)।";
        setStep(4);
      } else if (step === 4) {
        setFormData(prev => ({ ...prev, issue: message }));
        const department = await generateRTIDepartment(message, language);
        setFormData(prev => ({ ...prev, department }));
        botResponse = language === "english"
          ? `Thanks! Please provide more details about your ${message}-related issue.`
          : `धन्यवाद! कृपया अपनी ${message} संबंधी समस्या के बारे में और विस्तार से बताएं।`;
        setStep(5);
      } else if (step === 5) {
        setFormData(prev => ({ ...prev, details: message }));
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
      const enhancedBody = await enhanceRTIApplication(formData, language);
      
      const draft = language === "english" ? `
Subject: Application for Information under Right to Information Act, 2005

To,
Public Information Officer,
${formData.department},
${formData.state}

Sir/Madam,

I, ${formData.name}, resident of ${formData.state}, would like to obtain the following information under the Right to Information Act, 2005:

${enhancedBody}

I request you to provide the above information within the stipulated time period of 30 days as per the RTI Act, 2005.

Thanking you,

${formData.name}
Date: ${new Date().toLocaleDateString()}
Contact: [Your Contact Details]
      ` : `
विषय: सूचना के अधिकार अधिनियम, 2005 के तहत जानकारी प्राप्त करने हेतु आवेदन

सेवा में,
लोक सूचना अधिकारी,
${formData.department},
${formData.state}

महोदय/महोदया,

मैं ${formData.name}, ${formData.state} का निवासी हूं। मैं RTI अधिनियम, 2005 के तहत निम्नलिखित जानकारी प्राप्त करना चाहता/चाहती हूं:

${enhancedBody}

आपसे अनुरोध है कि कृपया RTI कानून के तहत निर्धारित 30 दिनों के भीतर उपरोक्त जानकारी प्रदान करें।

सादर धन्यवाद,

${formData.name}
दिनांक: ${new Date().toLocaleDateString()}
संपर्क: [आपकी संपर्क जानकारी]
      `;

      setMessages(prev => [...prev, { 
        type: "bot", 
        content: language === "english" 
          ? "Here's your RTI application draft. You can download it and submit through the appropriate portal:" 
          : "यहाँ आपका RTI आवेदन प्रारूप है। आप इसे डाउनलोड करके उपयुक्त पोर्टल के माध्यम से जमा कर सकते हैं:",
        draft: draft
      }]);

      // Add guidance message
      const guidanceMessage = language === "english" 
        ? "📋 **Next Steps for RTI Filing:**\n\n1. Download the draft application above\n2. Visit the online RTI portal for your state\n3. Fill the online form or upload the draft\n4. Pay the application fee (usually ₹10)\n5. Keep the acknowledgment receipt\n6. Follow up if no response in 30 days\n\n**Required Documents:**\n• Copy of ID proof\n• Address proof\n• RTI application draft\n• Payment receipt"
        : "📋 **RTI दाखिल करने के लिए अगले कदम:**\n\n1. ऊपर दिया गया आवेदन डाउनलोड करें\n2. अपने राज्य के RTI पोर्टल पर जाएं\n3. ऑनलाइन फॉर्म भरें या ड्राफ्ट अपलोड करें\n4. आवेदन शुल्क भुगतान करें (आमतौर पर ₹10)\n5. स्वीकृति रसीद रखें\n6. 30 दिन में जवाब न मिले तो फॉलो अप करें\n\n**आवश्यक दस्तावेज:**\n• पहचान प्रमाण की प्रति\n• पता प्रमाण\n• RTI आवेदन ड्राफ्ट\n• भुगतान रसीद";

      setTimeout(() => {
        setMessages(prev => [...prev, { type: "bot", content: guidanceMessage }]);
      }, 1000);

    } catch (error) {
      console.error('Error generating RTI draft:', error);
    }
  };

  const getCurrentOptions = () => {
    if (step === 0) return initialOptions;
    if (step === 1) return languageOptions;
    return [];
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center animate-pulse">
              <FileText className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2 animate-fade-in">JAN-RTI Assistant</h1>
          <p className="text-xl text-gray-600 animate-fade-in">AI-powered RTI application assistance</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chat Interface - Larger */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span>RTI Chat Assistant</span>
                  {isLoading && <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin ml-2"></div>}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="p-4">
                  <ChatInterface
                    messages={messages}
                    onSendMessage={handleUserMessage}
                    placeholder={language === "english" ? "Type your message..." : "अपना संदेश टाइप करें..."}
                    language={language}
                    className="h-[600px]"
                  />
                  
                  {getCurrentOptions().length > 0 && (
                    <div className="mt-4">
                      <QuickActionButtons 
                        options={getCurrentOptions()}
                        onSelect={handleUserMessage}
                        language={language}
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="w-5 h-5" />
                  <span>RTI Portals</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="https://rtionline.gov.in/" target="_blank" rel="noopener noreferrer">
                      National RTI Portal
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="https://rtionline.cg.gov.in/" target="_blank" rel="noopener noreferrer">
                      Chhattisgarh RTI Portal
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Quick Tips</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Be specific about the information you need</li>
                  <li>• Include relevant dates and reference numbers</li>
                  <li>• Response time is usually 30 days</li>
                  <li>• Keep a copy of your application</li>
                  <li>• Follow up if no response received</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RTI;
