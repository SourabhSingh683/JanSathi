
import Layout from "@/components/Layout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Award, Send, Search, ExternalLink, Users, DollarSign, Calendar, CheckCircle } from "lucide-react";

const Schemes = () => {
  const [language, setLanguage] = useState("english");
  const [searchQuery, setSearchQuery] = useState("");
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content: "🙏 Namaste! I'm your Schemes Assistant. I can help you find government schemes, check eligibility, and provide application links.\n\nWhat can I help you with today?\n\n1️⃣ Find schemes by category\n2️⃣ Check eligibility for specific schemes\n3️⃣ Get application links\n4️⃣ Ask about scheme benefits"
    }
  ]);

  const schemeCategories = {
    english: [
      "Education", "Healthcare", "Employment", "Agriculture", "Women Empowerment",
      "Senior Citizens", "Housing", "Financial Inclusion", "Social Security", "Skill Development"
    ],
    hindi: [
      "शिक्षा", "स्वास्थ्य", "रोजगार", "कृषि", "महिला सशक्तिकरण",
      "वरिष्ठ नागरिक", "आवास", "वित्तीय समावेश", "सामाजिक सुरक्षा", "कौशल विकास"
    ]
  };

  const popularSchemes = [
    {
      id: 1,
      name: "Pradhan Mantri Kisan Samman Nidhi",
      nameHindi: "प्रधानमंत्री किसान सम्मान निधि",
      category: "Agriculture",
      categoryHindi: "कृषि",
      benefit: "₹6,000 per year",
      benefitHindi: "₹6,000 प्रति वर्ष",
      eligibility: "Small & marginal farmers",
      eligibilityHindi: "छोटे और सीमांत किसान",
      link: "https://pmkisan.gov.in/",
      description: "Financial assistance to farmers",
      descriptionHindi: "किसानों को वित्तीय सहायता"
    },
    {
      id: 2,
      name: "Ayushman Bharat",
      nameHindi: "आयुष्मान भारत",
      category: "Healthcare",
      categoryHindi: "स्वास्थ्य",
      benefit: "₹5 lakh health insurance",
      benefitHindi: "₹5 लाख स्वास्थ्य बीमा",
      eligibility: "Poor & vulnerable families",
      eligibilityHindi: "गरीब और कमजोर परिवार",
      link: "https://pmjay.gov.in/",
      description: "Health insurance scheme",
      descriptionHindi: "स्वास्थ्य बीमा योजना"
    },
    {
      id: 3,
      name: "Pradhan Mantri Awas Yojana",
      nameHindi: "प्रधानमंत्री आवास योजना",
      category: "Housing",
      categoryHindi: "आवास",
      benefit: "Housing subsidy",
      benefitHindi: "आवास सब्सिडी",
      eligibility: "EWS, LIG, MIG families",
      eligibilityHindi: "EWS, LIG, MIG परिवार",
      link: "https://pmaymis.gov.in/",
      description: "Affordable housing scheme",
      descriptionHindi: "किफायती आवास योजना"
    },
    {
      id: 4,
      name: "Beti Bachao Beti Padhao",
      nameHindi: "बेटी बचाओ बेटी पढ़ाओ",
      category: "Women Empowerment",
      categoryHindi: "महिला सशक्तिकरण",
      benefit: "Education & social security",
      benefitHindi: "शिक्षा और सामाजिक सुरक्षा",
      eligibility: "Girl children & women",
      eligibilityHindi: "बालिकाएं और महिलाएं",
      link: "https://wcd.nic.in/bbbp-scheme",
      description: "Girl child welfare scheme",
      descriptionHindi: "बालिका कल्याण योजना"
    }
  ];

  const handleUserMessage = (message: string) => {
    setMessages(prev => [...prev, { type: "user", content: message }]);
    
    setTimeout(() => {
      let botResponse = "";
      
      if (message.includes("1") || message.toLowerCase().includes("category")) {
        botResponse = language === "english"
          ? "Here are the main scheme categories:\n\n" + schemeCategories.english.map((cat, i) => `${i+1}. ${cat}`).join('\n') + "\n\nWhich category interests you?"
          : "यहाँ मुख्य योजना श्रेणियां हैं:\n\n" + schemeCategories.hindi.map((cat, i) => `${i+1}. ${cat}`).join('\n') + "\n\nआपको कौन सी श्रेणी में रुचि है?";
      } else if (message.includes("2") || message.toLowerCase().includes("eligibility")) {
        botResponse = language === "english"
          ? "I can help you check eligibility for various schemes. Please tell me:\n\n• Your age\n• Your annual income\n• Your occupation\n• Your family size\n• Any specific scheme you're interested in"
          : "मैं आपको विभिन्न योजनाओं के लिए पात्रता जांचने में मदद कर सकता हूं। कृपया बताएं:\n\n• आपकी उम्र\n• आपकी वार्षिक आय\n• आपका व्यवसाय\n• आपके परिवार का आकार\n• कोई विशिष्ट योजना जिसमें आपकी रुचि है";
      } else if (message.includes("3") || message.toLowerCase().includes("links")) {
        botResponse = language === "english"
          ? "Here are some popular scheme application links:\n\n🔗 PM Kisan: https://pmkisan.gov.in/\n🔗 Ayushman Bharat: https://pmjay.gov.in/\n🔗 PM Awas Yojana: https://pmaymis.gov.in/\n🔗 Jan Aushadhi: https://janaushadhi.gov.in/\n\nWhich specific scheme link do you need?"
          : "यहाँ कुछ लोकप्रिय योजना आवेदन लिंक हैं:\n\n🔗 PM किसान: https://pmkisan.gov.in/\n🔗 आयुष्मान भारत: https://pmjay.gov.in/\n🔗 PM आवास योजना: https://pmaymis.gov.in/\n🔗 जन औषधि: https://janaushadhi.gov.in/\n\nआपको किस विशिष्ट योजना लिंक की आवश्यकता है?";
      } else if (message.includes("4") || message.toLowerCase().includes("benefits")) {
        botResponse = language === "english"
          ? "Government schemes offer various benefits:\n\n💰 Financial assistance\n🏥 Healthcare coverage\n🏠 Housing support\n📚 Education scholarships\n👥 Employment opportunities\n🌾 Agricultural support\n\nWhich type of benefit are you looking for?"
          : "सरकारी योजनाएं विभिन्न लाभ प्रदान करती हैं:\n\n💰 वित्तीय सहायता\n🏥 स्वास्थ्य कवरेज\n🏠 आवास सहायता\n📚 शिक्षा छात्रवृत्ति\n👥 रोजगार के अवसर\n🌾 कृषि सहायता\n\nआप किस प्रकार के लाभ की तलाश कर रहे हैं?";
      } else {
        // Handle specific scheme queries
        const schemes = popularSchemes.filter(scheme => 
          scheme.name.toLowerCase().includes(message.toLowerCase()) ||
          scheme.category.toLowerCase().includes(message.toLowerCase()) ||
          (language === "hindi" && (
            scheme.nameHindi.includes(message) ||
            scheme.categoryHindi.includes(message)
          ))
        );
        
        if (schemes.length > 0) {
          const scheme = schemes[0];
          botResponse = language === "english"
            ? `📋 ${scheme.name}\n\n🏷️ Category: ${scheme.category}\n💰 Benefit: ${scheme.benefit}\n👥 Eligibility: ${scheme.eligibility}\n📝 Description: ${scheme.description}\n🔗 Apply: ${scheme.link}\n\nWould you like more details about eligibility or other schemes?`
            : `📋 ${scheme.nameHindi}\n\n🏷️ श्रेणी: ${scheme.categoryHindi}\n💰 लाभ: ${scheme.benefitHindi}\n👥 पात्रता: ${scheme.eligibilityHindi}\n📝 विवरण: ${scheme.descriptionHindi}\n🔗 आवेदन: ${scheme.link}\n\nक्या आप पात्रता या अन्य योजनाओं के बारे में और जानकारी चाहते हैं?`;
        } else {
          botResponse = language === "english"
            ? "I understand you're looking for information about schemes. Could you please be more specific? You can ask about:\n\n• Specific scheme names\n• Categories like education, healthcare, housing\n• Your eligibility criteria\n• Application process"
            : "मैं समझता हूं कि आप योजनाओं के बारे में जानकारी चाहते हैं। कृपया अधिक स्पष्ट हों? आप पूछ सकते हैं:\n\n• विशिष्ट योजना नाम\n• श्रेणियां जैसे शिक्षा, स्वास्थ्य, आवास\n• आपकी पात्रता मानदंड\n• आवेदन प्रक्रिया";
        }
      }
      
      setMessages(prev => [...prev, { type: "bot", content: botResponse }]);
    }, 1000);
  };

  const filteredSchemes = popularSchemes.filter(scheme =>
    scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    scheme.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (language === "hindi" && (
      scheme.nameHindi.includes(searchQuery) ||
      scheme.categoryHindi.includes(searchQuery)
    ))
  );

  return (
    <Layout>
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <Award className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Schemes Assistant</h1>
            <p className="text-xl text-gray-600">Discover government schemes and check eligibility</p>
          </div>

          {/* Language Toggle */}
          <div className="flex justify-center mb-6">
            <div className="bg-white rounded-full p-1 shadow-lg border">
              <div className="flex space-x-1">
                <Button 
                  variant={language === "english" ? "default" : "ghost"} 
                  size="sm"
                  onClick={() => setLanguage("english")}
                  className={language === "english" ? "bg-green-500 hover:bg-green-600" : ""}
                >
                  English
                </Button>
                <Button 
                  variant={language === "hindi" ? "default" : "ghost"} 
                  size="sm"
                  onClick={() => setLanguage("hindi")}
                  className={language === "hindi" ? "bg-green-500 hover:bg-green-600" : ""}
                >
                  हिंदी
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Chat Interface */}
            <div>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="w-5 h-5" />
                    <span>Schemes Chat Assistant</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80 overflow-y-auto mb-4 p-4 bg-gray-50 rounded-lg">
                    {messages.map((message, index) => (
                      <div key={index} className={`mb-4 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                        <div className={`inline-block p-3 rounded-lg max-w-xs lg:max-w-md ${
                          message.type === 'user' 
                            ? 'bg-green-500 text-white' 
                            : 'bg-white text-gray-800 border'
                        }`}>
                          <pre className="whitespace-pre-wrap font-sans text-sm">{message.content}</pre>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Input
                      placeholder={language === "english" ? "Ask about schemes..." : "योजनाओं के बारे में पूछें..."}
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
                      className="bg-green-500 hover:bg-green-600"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Schemes Browser */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Search className="w-5 h-5" />
                    <span>Browse Schemes</span>
                  </CardTitle>
                  <div className="flex space-x-2 mt-4">
                    <Input
                      placeholder={language === "english" ? "Search schemes..." : "योजनाओं में खोजें..."}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {filteredSchemes.map((scheme) => (
                      <div key={scheme.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-gray-900 text-sm">
                            {language === "english" ? scheme.name : scheme.nameHindi}
                          </h3>
                          <Badge variant="secondary" className="text-xs">
                            {language === "english" ? scheme.category : scheme.categoryHindi}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center space-x-2">
                            <DollarSign className="w-4 h-4 text-green-500" />
                            <span className="text-gray-600">
                              {language === "english" ? scheme.benefit : scheme.benefitHindi}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4 text-blue-500" />
                            <span className="text-gray-600">
                              {language === "english" ? scheme.eligibility : scheme.eligibilityHindi}
                            </span>
                          </div>
                        </div>
                        
                        <div className="mt-3 flex space-x-2">
                          <Button size="sm" variant="outline" asChild>
                            <a href={scheme.link} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-3 h-3 mr-1" />
                              Apply
                            </a>
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => handleUserMessage(scheme.name)}
                          >
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              {language === "english" ? "Scheme Categories" : "योजना श्रेणियां"}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {(language === "english" ? schemeCategories.english : schemeCategories.hindi).map((category, index) => (
                <Button 
                  key={index}
                  variant="outline" 
                  className="h-20 flex flex-col items-center justify-center text-center hover:bg-green-50 hover:border-green-200"
                  onClick={() => handleUserMessage(category)}
                >
                  <Award className="w-6 h-6 mb-2 text-green-500" />
                  <span className="text-sm font-medium">{category}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Schemes;
