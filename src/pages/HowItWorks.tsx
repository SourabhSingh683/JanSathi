
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare, FileText, Award, Sparkles, CheckCircle, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  const steps = [
    {
      icon: MessageSquare,
      title: "Choose Your Assistant",
      description: "Select from RTI, Grievance, or Schemes Assistant based on your needs",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Sparkles,
      title: "Chat with AI",
      description: "Our intelligent AI understands your queries in Hindi or English",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: FileText,
      title: "Get Instant Help",
      description: "Receive personalized guidance, drafts, and application links",
      color: "from-green-500 to-green-600"
    },
    {
      icon: CheckCircle,
      title: "Take Action",
      description: "Submit your applications or access services with confidence",
      color: "from-orange-500 to-orange-600"
    }
  ];

  const features = [
    {
      icon: Zap,
      title: "Instant Responses",
      description: "Get answers to your government service queries in seconds, not hours."
    },
    {
      icon: Users,
      title: "No Registration",
      description: "Start using JanSathi immediately without creating accounts or providing personal data."
    },
    {
      icon: Award,
      title: "Personalized Guidance",
      description: "AI-powered recommendations based on your specific situation and requirements."
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6 animate-fade-in">
              How JanSathi Works
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in">
              Discover how our AI-powered platform simplifies government services in just 4 simple steps
            </p>
          </div>

          {/* Steps Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Simple Steps to Success
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                    <CardHeader>
                      <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center mb-4`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-gray-500 mb-2">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <CardTitle className="text-xl font-bold text-gray-900">
                        {step.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Features Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Why It's Revolutionary
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-12 h-12 mx-auto rounded-lg bg-gradient-to-r from-indian-saffron to-indian-green flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-lg font-bold text-gray-900">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-indian-saffron to-indian-green rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Experience the Future of Government Services?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join the revolution and start using JanSathi today
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/schemes">
                <Button size="lg" variant="secondary" className="bg-white text-indian-saffron hover:bg-gray-100">
                  Try JanSathi Now
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/why-we-need">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-indian-saffron">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HowItWorks;
