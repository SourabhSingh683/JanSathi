
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileText, MessageSquare, Award, Users, CheckCircle, Globe, Sparkles, ArrowRight, Zap, Shield, Clock, Star, Target, TrendingUp } from "lucide-react";
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

  const problemsWesolve = [
    {
      icon: Target,
      title: "Complex Government Procedures",
      description: "Simplifying bureaucratic processes with AI guidance",
      color: "text-red-500"
    },
    {
      icon: Clock,
      title: "Time-Consuming Applications",
      description: "Reducing application time from hours to minutes",
      color: "text-blue-500"
    },
    {
      icon: Globe,
      title: "Language Barriers",
      description: "Supporting both Hindi and English for better accessibility",
      color: "text-green-500"
    },
    {
      icon: TrendingUp,
      title: "Lack of Awareness",
      description: "Educating citizens about available government schemes",
      color: "text-purple-500"
    }
  ];

  return (
    <Layout>
      {/* Hero Section with Enhanced Animations */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-green-50"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-indian-saffron/20 to-indian-green/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-8 -left-8 w-96 h-96 bg-gradient-to-tr from-indian-green/20 to-indian-saffron/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-indian-saffron to-indian-green rounded-full mb-6 animate-bounce">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 animate-fade-in">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-orange-600 via-orange-800 to-green-600 bg-clip-text text-transparent font-extrabold">
                JanSathi
              </span>
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-600 max-w-4xl mx-auto mb-6 animate-fade-in">
              Your AI-Powered Digital Gateway to Government Services
            </p>
            <p className="text-base md:text-lg text-gray-500 max-w-3xl mx-auto animate-fade-in">
              Experience the future of citizen services with intelligent assistants that understand your needs. 
              Available in Hindi and English, no registration required.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="lg" className="bg-gradient-to-r from-indian-saffron to-orange-600 hover:from-orange-600 hover:to-indian-saffron text-white font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Choose Your Assistant
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 bg-white shadow-2xl border rounded-xl p-2 z-50">
                <DropdownMenuItem asChild className="p-0">
                  <Link to="/rti" className="flex items-center w-full p-3 hover:bg-blue-50 rounded-lg transition-colors">
                    <FileText className="w-5 h-5 mr-3 text-blue-500" />
                    <div>
                      <div className="font-medium text-gray-900">RTI Assistant</div>
                      <div className="text-sm text-gray-500">File RTI applications</div>
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="p-0">
                  <Link to="/grievance" className="flex items-center w-full p-3 hover:bg-red-50 rounded-lg transition-colors">
                    <MessageSquare className="w-5 h-5 mr-3 text-red-500" />
                    <div>
                      <div className="font-medium text-gray-900">Grievance Assistant</div>
                      <div className="text-sm text-gray-500">File complaints</div>
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="p-0">
                  <Link to="/schemes" className="flex items-center w-full p-3 hover:bg-green-50 rounded-lg transition-colors">
                    <Award className="w-5 h-5 mr-3 text-green-500" />
                    <div>
                      <div className="font-medium text-gray-900">Schemes Assistant</div>
                      <div className="text-sm text-gray-500">Discover schemes</div>
                    </div>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              AI-Powered Government Services
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
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
                    <CardTitle className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center px-6 pb-8">
                    <CardDescription className="text-gray-600 mb-8 text-sm md:text-base leading-relaxed">
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

      {/* Problems We Solve Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indian-saffron/5 to-indian-green/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Problems We Solve
            </h2>
            <p className="text-lg md:text-xl text-gray-600">
              Making government services accessible and user-friendly for everyone
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {problemsWesolve.map((problem, index) => {
              const Icon = problem.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow border-0 bg-white/80 backdrop-blur">
                  <CardHeader>
                    <div className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center bg-gray-50 ${problem.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-lg font-bold text-gray-900">
                      {problem.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">
                      {problem.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose JanSathi?
            </h2>
            <p className="text-lg md:text-xl text-gray-600">
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
          <div className="bg-gradient-to-r from-indian-saffron to-indian-green rounded-3xl p-8 md:p-12 text-white shadow-2xl">
            <h2 className="text-2xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Government Service Experience?
            </h2>
            <p className="text-lg md:text-xl mb-8 opacity-90">
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
