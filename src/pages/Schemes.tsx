
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Search, Users, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import ChatInterface from "@/components/ChatInterface";
import { generateSchemeResponse, getSchemeDetails } from "@/utils/geminiAI";

interface Message {
  type: "bot" | "user";
  content: string;
  isComplete?: boolean;
}

const Schemes = () => {
  const [language, setLanguage] = useState("english");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "bot",
      content: "🙏 Namaste! I'm your AI Schemes Assistant. I can help you discover government schemes you're eligible for.\n\nYou can either:\n1. Ask me about specific schemes\n2. Browse by category below\n3. Tell me about your situation for personalized recommendations\n\nHow can I help you today?"
    }
  ]);

  const schemeCategories = {
    english: [
      "Education & Scholarships", "Healthcare & Insurance", "Employment & Skill Development",
      "Agriculture & Farming", "Women & Child Development", "Housing & Infrastructure",
      "Senior Citizens", "Financial Services", "Digital Services", "Environment & Energy"
    ],
    hindi: [
      "शिक्षा और छात्रवृत्ति", "स्वास्थ्य और बीमा", "रोजगार और कौशल विकास",
      "कृषि और खेती", "महिला और बाल विकास", "आवास और बुनियादी ढांचा",
      "वरिष्ठ नागरिक", "वित्तीय सेवाएं", "डिजिटल सेवाएं", "पर्यावरण और ऊर्जा"
    ]
  };

  const handleUserMessage = async (message: string) => {
    setMessages(prev => [...prev, { type: "user", content: message }]);
    setIsLoading(true);
    
    try {
      const response = await generateSchemeResponse(message, language);
      setMessages(prev => [...prev, { type: "bot", content: response }]);
    } catch (error) {
      console.error('Schemes AI Error:', error);
      const errorMessage = language === 'hindi' 
        ? 'माफ़ करें, कुछ तकनीकी समस्या है। कृपया फिर से कोशिश करें।'
        : 'Sorry, there was a technical issue. Please try again.';
      setMessages(prev => [...prev, { type: "bot", content: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryClick = async (category: string) => {
    setIsLoading(true);
    setMessages(prev => [...prev, { type: "user", content: `Tell me about ${category} schemes` }]);
    
    try {
      const query = `Provide comprehensive information about Indian government schemes in the category: ${category}. Include eligibility, benefits, application process, and official links.`;
      const response = await generateSchemeResponse(query, language);
      setMessages(prev => [...prev, { type: "bot", content: response }]);
    } catch (error) {
      console.error('Category schemes error:', error);
      const errorMessage = language === 'hindi' 
        ? 'इस श्रेणी की योजनाओं की जानकारी प्राप्त करने में समस्या हुई।'
        : 'Unable to fetch schemes for this category.';
      setMessages(prev => [...prev, { type: "bot", content: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSchemeDetail = async (schemeName: string) => {
    setIsLoading(true);
    setMessages(prev => [...prev, { type: "user", content: schemeName }]);
    
    try {
      const response = await getSchemeDetails(schemeName, language);
      setMessages(prev => [...prev, { type: "bot", content: response }]);
    } catch (error) {
      console.error('Scheme details error:', error);
      const errorMessage = language === 'hindi' 
        ? 'इस योजना की विस्तृत जानकारी प्राप्त करने में समस्या हुई।'
        : 'Unable to fetch detailed information for this scheme.';
      setMessages(prev => [...prev, { type: "bot", content: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-4 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-emerald-100">
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
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="w-20"></div>
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">AI Schemes Assistant</h1>
          <p className="text-lg md:text-xl text-gray-600">Discover government schemes tailored for you</p>
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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chat Interface - Larger */}
          <div className="lg:col-span-3">
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                <CardTitle className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-green-600" />
                  <span>AI Schemes Chat Assistant</span>
                  {isLoading && <div className="w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin ml-2"></div>}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="p-4" style={{ height: '600px' }}>
                  <ChatInterface
                    messages={messages}
                    onSendMessage={handleUserMessage}
                    placeholder={language === "english" ? "Ask about schemes..." : "योजनाओं के बारे में पूछें..."}
                    language={language}
                    className="h-full"
                    isLoading={isLoading}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Smaller */}
          <div className="space-y-4">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-sm">
                  <Search className="w-4 h-4" />
                  <span>Browse Categories</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-2">
                  {schemeCategories[language].map((category, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleCategoryClick(category)}
                      className="text-xs text-left justify-start h-auto py-2 px-3 whitespace-normal"
                      disabled={isLoading}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-sm">
                  <Users className="w-4 h-4" />
                  <span>Quick Links</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-xs">
                  <a 
                    href="https://services.india.gov.in" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block p-2 bg-green-50 rounded hover:bg-green-100 transition-colors"
                  >
                    India.gov.in Portal
                  </a>
                  <a 
                    href="https://www.myscheme.gov.in" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block p-2 bg-green-50 rounded hover:bg-green-100 transition-colors"
                  >
                    MyScheme Portal
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

export default Schemes;
