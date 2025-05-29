
import Layout from "@/components/Layout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, Globe, User } from "lucide-react";
import ChatInterface from "@/components/ChatInterface";
import QuickActionButtons from "@/components/QuickActionButtons";

interface Message {
  type: "bot" | "user";
  content: string;
  draft?: string;
}

const RTI = () => {
  const [step, setStep] = useState(0);
  const [language, setLanguage] = useState("english");
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

  const handleUserMessage = (message: string) => {
    setMessages(prev => [...prev, { type: "user", content: message }]);
    
    setTimeout(() => {
      let botResponse = "";
      
      if (step === 0) {
        if (message.includes("File") || message.includes("1")) {
          botResponse = language === "english" 
            ? "🔄 Please select your preferred language:"
            : "🔄 कृपया अपनी भाषा चुनें:";
          setStep(1);
        } else {
          botResponse = language === "english"
            ? "I can help you with general RTI information. RTI (Right to Information) is a constitutional right that allows citizens to access government information. What specific information would you like to know about the RTI process?"
            : "मैं आपको RTI की सामान्य जानकारी दे सकता हूं। RTI (सूचना का अधिकार) एक संवैधानिक अधिकार है जो नागरिकों को सरकारी जानकारी प्राप्त करने की अनुमति देता है। RTI प्रक्रिया के बारे में आप क्या जानना चाहते हैं?";
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
        botResponse = language === "english"
          ? `Thanks! Please provide more details about your ${message}-related issue.`
          : `धन्यवाद! कृपया अपनी ${message} संबंधी समस्या के बारे में और विस्तार से बताएं।`;
        setStep(5);
      } else if (step === 5) {
        setFormData(prev => ({ ...prev, details: message }));
        generateRTIDraft();
        return;
      }
      
      setMessages(prev => [...prev, { type: "bot", content: botResponse }]);
    }, 1000);
  };

  const generateRTIDraft = () => {
    const draft = language === "english" ? `
Subject: Application for Information under Right to Information Act, 2005

To,
Public Information Officer,
${formData.department || "Relevant Department"},
${formData.state}

Sir/Madam,

I, ${formData.name}, resident of ${formData.state}, would like to obtain the following information under the Right to Information Act, 2005:

1. Issue Details: ${formData.details}
2. Related Topic: ${formData.issue}

I request you to provide the above information within the stipulated time period of 30 days as per the RTI Act.

Thanking you,
${formData.name}
Date: ${new Date().toLocaleDateString()}
    ` : `
विषय: सूचना के अधिकार अधिनियम, 2005 के तहत जानकारी प्राप्त करने हेतु आवेदन

सेवा में,
लोक सूचना अधिकारी,
${formData.department || "संबंधित विभाग"},
${formData.state}

महोदय/महोदया,

मैं ${formData.name}, ${formData.state} का निवासी हूं। मैं RTI अधिनियम, 2005 के तहत निम्नलिखित जानकारी प्राप्त करना चाहता/चाहती हूं:

1. मुद्दे का विवरण: ${formData.details}
2. संबंधित विषय: ${formData.issue}

आपसे अनुरोध है कि कृपया RTI कानून के तहत निर्धारित 30 दिनों के भीतर उपरोक्त जानकारी प्रदान करें।

सादर धन्यवाद,
${formData.name}
दिनांक: ${new Date().toLocaleDateString()}
    `;

    setMessages(prev => [...prev, { 
      type: "bot", 
      content: language === "english" 
        ? "Here's your RTI application draft:" 
        : "यहाँ आपका RTI आवेदन प्रारूप है:",
      draft: draft
    }]);
  };

  const getCurrentOptions = () => {
    if (step === 0) return initialOptions;
    if (step === 1) return languageOptions;
    return [];
  };

  return (
    <Layout>
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
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

          {/* Chat Interface */}
          <Card className="mb-6 shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <span>RTI Chat Assistant</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-4">
                <ChatInterface
                  messages={messages}
                  onSendMessage={handleUserMessage}
                  placeholder={language === "english" ? "Type your message..." : "अपना संदेश टाइप करें..."}
                  language={language}
                />
                
                {/* Quick Action Buttons for choices */}
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

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RTI;
