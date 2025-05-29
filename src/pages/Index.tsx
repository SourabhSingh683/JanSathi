
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, MessageSquare, Award, Users, CheckCircle, Globe, Sparkles, ArrowRight, Zap, Shield, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: FileText,
      title: "RTI Assistant",
      description: "AI-powered RTI application drafting and filing assistance with smart templates",
      href: "/rti",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: MessageSquare,
      title: "Grievance Assistant", 
      description: "Smart grievance filing and tracking system with automated escalation",
      href: "/grievance",
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50"
    },
    {
      icon: Award,
      title: "Schemes Assistant",
      description: "AI-powered government schemes discovery with eligibility matching",
      href: "/schemes", 
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50"
    }
  ];

  const benefits = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get instant AI-powered responses and draft applications in seconds"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is protected with enterprise-grade security"
    },
    {
      icon: Clock,
      title: "24/7 Available",
      description: "Access government services anytime, anywhere"
    }
  ];

  return (
    <Layout>
      {/* Hero Section with Enhanced Animations */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-green-50 animate-pulse"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-indian-saffron to-indian-green rounded-full mb-6 animate-bounce">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 animate-fade-in">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-indian-saffron via-indian-white to-indian-green bg-clip-text text-transparent animate-pulse">
                JanSathi
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-gray-600 max-w-4xl mx-auto mb-6 animate-fade-in">
              Your AI-Powered Digital Gateway to Government Services
            </p>
            <p className="text-lg text-gray-500 max-w-3xl mx-auto animate-fade-in">
              Experience the future of citizen services with intelligent assistants that understand your needs. 
              Available in Hindi and English, no registration required.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in">
            <Link to="/schemes">
              <Button size="lg" className="bg-gradient-to-r from-indian-saffron to-orange-600 hover:from-orange-600 hover:to-indian-saffron text-white font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                Get Started Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/how-it-works">
              <Button variant="outline" size="lg" className="border-2 border-indian-saffron text-indian-saffron hover:bg-indian-saffron hover:text-white py-4 px-8 rounded-xl text-lg transition-all duration-300">
                How It Works
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section with Enhanced Cards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              AI-Powered Government Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Revolutionary technology meets citizen services. Experience government assistance like never before.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border-0 shadow-lg bg-white overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${feature.color}`}></div>
                  <CardHeader className="text-center pb-4 pt-8">
                    <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center px-6 pb-8">
                    <CardDescription className="text-gray-600 mb-8 text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                    <Link to={feature.href}>
                      <Button className={`w-full bg-gradient-to-r ${feature.color} hover:shadow-lg text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105`}>
                        Launch Assistant
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indian-saffron/10 to-indian-green/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose JanSathi?
            </h2>
            <p className="text-xl text-gray-600">
              Experience the benefits of AI-powered government services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-indian-saffron to-indian-green rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-indian-saffron to-indian-green rounded-3xl p-12 text-white shadow-2xl">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform Your Government Service Experience?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of citizens who are already using JanSathi for their government service needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/schemes">
                <Button size="lg" variant="secondary" className="bg-white text-indian-saffron hover:bg-gray-100 font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105">
                  Start Using JanSathi
                </Button>
              </Link>
              <Link to="/why-we-need">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-indian-saffron py-4 px-8 rounded-xl text-lg transition-all duration-300">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
