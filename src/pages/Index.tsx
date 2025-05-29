
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, MessageSquare, Award, Users, CheckCircle, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: FileText,
      title: "RTI Assistant",
      description: "AI-powered RTI application drafting and filing assistance",
      href: "/rti",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: MessageSquare,
      title: "Grievance Assistant", 
      description: "Smart grievance filing and tracking system",
      href: "/grievance",
      color: "from-red-500 to-red-600"
    },
    {
      icon: Award,
      title: "Schemes Assistant",
      description: "Comprehensive government schemes information and eligibility",
      href: "/schemes", 
      color: "from-green-500 to-green-600"
    }
  ];

  const stats = [
    { icon: Users, label: "Citizens Served", value: "50,000+" },
    { icon: FileText, label: "RTI Applications", value: "15,000+" },
    { icon: MessageSquare, label: "Grievances Resolved", value: "25,000+" },
    { icon: Award, label: "Scheme Queries", value: "30,000+" },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-indian-saffron to-indian-green bg-clip-text text-transparent">
                JanSathi
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 animate-fade-in">
              Your Digital Gateway to Government Services
            </p>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto animate-fade-in">
              Access RTI services, file grievances, and explore government schemes with AI-powered assistance. 
              Available in Hindi and English, no registration required.
            </p>
          </div>

          {/* Language Toggle */}
          <div className="flex justify-center mb-12 animate-fade-in">
            <div className="bg-white rounded-full p-2 shadow-lg border-2 border-gray-100">
              <div className="flex space-x-2">
                <Button variant="default" size="sm" className="bg-indian-saffron hover:bg-orange-600">
                  English
                </Button>
                <Button variant="outline" size="sm">
                  हिंदी
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              AI-Powered Government Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the future of citizen services with our intelligent assistants
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-2 hover:border-indian-saffron/20">
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="text-gray-600 mb-6 text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                    <Link to={feature.href}>
                      <Button className="w-full bg-gradient-to-r from-indian-saffron to-orange-600 hover:from-orange-600 hover:to-indian-saffron text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300">
                        Get Started
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indian-saffron/10 to-indian-green/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Serving Citizens Nationwide
            </h2>
            <p className="text-xl text-gray-600">
              Making government services accessible to everyone
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                    <Icon className="w-8 h-8 text-indian-saffron" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Highlights */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why Choose JanSathi?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-indian-green mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No Registration Required
                    </h3>
                    <p className="text-gray-600">
                      Access all services instantly without creating accounts or providing personal information.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Globe className="w-6 h-6 text-indian-green mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Multilingual Support
                    </h3>
                    <p className="text-gray-600">
                      Available in both Hindi and English to serve citizens in their preferred language.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <FileText className="w-6 h-6 text-indian-green mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      AI-Powered Assistance
                    </h3>
                    <p className="text-gray-600">
                      Intelligent chatbots that understand your needs and provide personalized guidance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-indian-saffron/20 to-indian-green/20 rounded-2xl p-8">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Get Started Today
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Choose any of our AI assistants to begin your journey towards easier government service access.
                  </p>
                  <div className="grid grid-cols-1 gap-3">
                    <Link to="/rti">
                      <Button className="w-full justify-start bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200">
                        <FileText className="w-4 h-4 mr-2" />
                        RTI Assistant
                      </Button>
                    </Link>
                    <Link to="/grievance">
                      <Button className="w-full justify-start bg-red-50 text-red-700 hover:bg-red-100 border border-red-200">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Grievance Assistant
                      </Button>
                    </Link>
                    <Link to="/schemes">
                      <Button className="w-full justify-start bg-green-50 text-green-700 hover:bg-green-100 border border-green-200">
                        <Award className="w-4 h-4 mr-2" />
                        Schemes Assistant
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
