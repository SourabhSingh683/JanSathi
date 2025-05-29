
import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Award, Send, Search, ExternalLink, Users, DollarSign, CheckCircle, Sparkles } from "lucide-react";
import ChatInterface from "@/components/ChatInterface";
import QuickActionButtons from "@/components/QuickActionButtons";
import { generateSchemeResponse } from "@/utils/geminiAI";

interface Message {
  type: "bot" | "user";
  content: string;
}

const Schemes = () => {
  const [language, setLanguage] = useState("english");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "bot",
      content: "🙏 Namaste! I'm your AI-powered Schemes Assistant. I can help you discover government schemes, check eligibility, and provide application guidance.\n\nWhat would you like to know about today?\n\n1️⃣ Browse schemes by category\n2️⃣ Check your eligibility for specific schemes\n3️⃣ Get application links and process\n4️⃣ Ask about scheme benefits"
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

  const categorySchemes = {
    "Education": [
      "PM Scholarship Scheme", "Merit Cum Means Scholarship", "Post Matric Scholarship",
      "National Means Cum Merit Scholarship", "Begum Hazrat Mahal National Scholarship"
    ],
    "Healthcare": [
      "Ayushman Bharat", "Pradhan Mantri Surakshit Matritva Abhiyan", "Mission Indradhanush",
      "Rashtriya Swasthya Bima Yojana", "Janani Suraksha Yojana"
    ],
    "Employment": [
      "MGNREGA", "Pradhan Mantri Kaushal Vikas Yojana", "MUDRA Yojana",
      "Stand Up India", "Startup India"
    ],
    "Agriculture": [
      "PM Kisan Samman Nidhi", "Pradhan Mantri Fasal Bima Yojana", "Soil Health Card",
      "Pradhan Mantri Krishi Sinchai Yojana", "National Food Security Mission"
    ],
    "Housing": [
      "Pradhan Mantri Awas Yojana", "Credit Linked Subsidy Scheme", "Rental Housing Scheme",
      "Affordable Housing in Partnership", "Beneficiary Led Individual House Construction"
    ]
  };

  const handleUserMessage = async (message: string) => {
    setMessages(prev => [...prev, { type: "user", content: message }]);
    setIsLoading(true);
    
    try {
      // Check if user selected a category
      const selectedCat = schemeCategories.english.find(cat => 
        message.toLowerCase().includes(cat.toLowerCase()) ||
        message.includes("1") || message.toLowerCase().includes("category")
      );

      if (selectedCat && categorySchemes[selectedCat as keyof typeof categorySchemes]) {
        const schemes = categorySchemes[selectedCat as keyof typeof categorySchemes];
        const response = `Here are the main schemes under ${selectedCat}:\n\n${schemes.map((scheme, i) => `${i+1}. ${scheme}`).join('\n')}\n\nFor detailed information about any scheme, please visit: https://services.india.gov.in\n\nWhich specific scheme would you like to know more about?`;
        
        setMessages(prev => [...prev, { type: "bot", content: response }]);
      } else {
        // Use Gemini AI for general queries
        const aiResponse = await generateSchemeResponse(message, language);
        setMessages(prev => [...prev, { type: "bot", content: aiResponse }]);
      }
    } catch (error) {
      const errorMessage = language === "hindi" 
        ? "माफ़ करें, कुछ तकनीकी समस्या है। कृपया फिर से कोशिश करें।"
        : "Sorry, there was a technical issue. Please try again.";
      setMessages(prev => [...prev, { type: "bot", content: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    handleUserMessage(`Tell me about ${category} schemes`);
  };

  const quickOptions = [
    "Show me education schemes",
    "Check healthcare schemes", 
    "Employment opportunities",
    "Housing schemes for poor families"
  ];

  return (
    <Layout>
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center animate-pulse">
                <Award className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2 animate-fade-in">
              AI Schemes Assistant
            </h1>
            <p className="text-xl text-gray-600 animate-fade-in">
              Powered by <Sparkles className="inline w-4 h-4 text-yellow-500" /> AI • Discover government schemes instantly
            </p>
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
            {/* Enhanced Chat Interface */}
            <div>
              <Card className="mb-6 shadow-xl border-0">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-green-600" />
                    <span>AI Schemes Chat Assistant</span>
                    {isLoading && <Sparkles className="w-4 h-4 text-yellow-500 animate-spin" />}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="p-4">
                    <ChatInterface
                      messages={messages}
                      onSendMessage={handleUserMessage}
                      placeholder={language === "english" ? "Ask about schemes..." : "योजनाओं के बारे में पूछें..."}
                      language={language}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Quick Action Buttons */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <QuickActionButtons 
                    options={quickOptions}
                    onSelect={handleUserMessage}
                    language={language}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Scheme Categories Browser */}
            <div>
              <Card className="shadow-xl border-0">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
                  <CardTitle className="flex items-center space-x-2">
                    <Search className="w-5 h-5 text-blue-600" />
                    <span>Browse Scheme Categories</span>
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
                  <div className="grid grid-cols-2 gap-3">
                    {(language === "english" ? schemeCategories.english : schemeCategories.hindi).map((category, index) => (
                      <Button 
                        key={index}
                        variant="outline" 
                        className="h-20 flex flex-col items-center justify-center text-center hover:bg-green-50 hover:border-green-200 transition-all duration-200 hover:scale-105"
                        onClick={() => handleCategorySelect(category)}
                      >
                        <Award className="w-6 h-6 mb-2 text-green-500" />
                        <span className="text-sm font-medium">{category}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Info Card */}
              <Card className="mt-6 shadow-lg bg-gradient-to-r from-green-50 to-blue-50">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-3 text-gray-800">
                    {language === "english" ? "How it works:" : "यह कैसे काम करता है:"}
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      {language === "english" ? "AI-powered scheme recommendations" : "AI द्वारा योजना सुझाव"}
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      {language === "english" ? "Real-time eligibility checking" : "तत्काल पात्रता जांच"}
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      {language === "english" ? "Direct application links" : "सीधे आवेदन लिंक"}
                    </li>
                  </ul>
                  <Button 
                    className="w-full mt-4 bg-green-600 hover:bg-green-700" 
                    asChild
                  >
                    <a href="https://services.india.gov.in" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Visit India.gov.in
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Schemes;
