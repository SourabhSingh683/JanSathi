
import Layout from "@/components/Layout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Send, Download, Globe, User, MapPin } from "lucide-react";

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
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content: "🙏 Namaste! I'm JAN-RTI — your digital guide for RTI (Right to Information) assistance.\n\nPlease choose what you'd like to do:\n1️⃣ File an RTI\n2️⃣ Do you want any information?"
    }
  ]);

  const departments = {
    english: [
      "Water Department",
      "Electricity Department", 
      "Pension & Benefits",
      "Education Department",
      "Labour & Employment",
      "Petroleum & Natural Gas",
      "Revenue Department",
      "Health Department",
      "Transport Department",
      "Other"
    ],
    hindi: [
      "जल विभाग",
      "विद्युत विभाग",
      "पेंशन एवं लाभ",
      "शिक्षा विभाग", 
      "श्रम एवं रोजगार",
      "पेट्रोलियम एवं प्राकृतिक गैस",
      "राजस्व विभाग",
      "स्वास्थ्य विभाग",
      "परिवहन विभाग",
      "अन्य"
    ]
  };

  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  const handleUserMessage = (message: string) => {
    setMessages(prev => [...prev, { type: "user", content: message }]);
    
    setTimeout(() => {
      let botResponse = "";
      
      if (step === 0) {
        if (message.includes("1") || message.toLowerCase().includes("file")) {
          botResponse = language === "english" 
            ? "🔄 Please select your language:\n• English\n• हिंदी"
            : "🔄 कृपया अपनी भाषा चुनें:\n• English\n• हिंदी";
          setStep(1);
        } else {
          botResponse = language === "english"
            ? "I can help you with general RTI information. What would you like to know about RTI process?"
            : "मैं आपको RTI की सामान्य जानकारी दे सकता हूं। RTI प्रक्रिया के बारे में आप क्या जानना चाहते हैं?";
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

  return (
    <Layout>
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <FileText className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">JAN-RTI Assistant</h1>
            <p className="text-xl text-gray-600">AI-powered RTI application assistance</p>
          </div>

          {/* Chat Interface */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>RTI Chat Assistant</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96 overflow-y-auto mb-4 p-4 bg-gray-50 rounded-lg">
                {messages.map((message, index) => (
                  <div key={index} className={`mb-4 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                    <div className={`inline-block p-3 rounded-lg max-w-xs lg:max-w-md ${
                      message.type === 'user' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-white text-gray-800 border'
                    }`}>
                      <pre className="whitespace-pre-wrap font-sans">{message.content}</pre>
                      {message.draft && (
                        <div className="mt-3 p-3 bg-gray-100 rounded text-sm">
                          <pre className="whitespace-pre-wrap font-mono text-xs">{message.draft}</pre>
                          <Button 
                            size="sm" 
                            className="mt-2"
                            onClick={() => {
                              const element = document.createElement('a');
                              const file = new Blob([message.draft], {type: 'text/plain'});
                              element.href = URL.createObjectURL(file);
                              element.download = 'RTI_Application.txt';
                              document.body.appendChild(element);
                              element.click();
                              document.body.removeChild(element);
                            }}
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex space-x-2">
                <Input
                  placeholder={language === "english" ? "Type your message..." : "अपना संदेश टाइप करें..."}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      const message = e.target.value.trim();
                      if (message) {
                        handleUserMessage(message);
                        e.target.value = '';
                      }
                    }
                  }}
                />
                <Button 
                  onClick={() => {
                    const input = document.querySelector('input');
                    const message = input.value.trim();
                    if (message) {
                      handleUserMessage(message);
                      input.value = '';
                    }
                  }}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
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

            <Card>
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
