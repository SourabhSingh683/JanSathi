
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Users, Globe, Smartphone, AlertTriangle, CheckCircle, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const WhyWeNeed = () => {
  const problems = [
    {
      icon: Clock,
      title: "Time-Consuming Processes",
      description: "Citizens spend hours navigating complex government procedures and paperwork",
      stat: "Average 6+ hours per application"
    },
    {
      icon: AlertTriangle,
      title: "Language Barriers",
      description: "Many citizens struggle with English-only government websites and forms",
      stat: "60% prefer regional languages"
    },
    {
      icon: Users,
      title: "Lack of Guidance",
      description: "No personalized assistance for understanding eligibility and requirements",
      stat: "70% need help with forms"
    },
    {
      icon: Globe,
      title: "Information Scattered",
      description: "Government information is spread across multiple websites and offices",
      stat: "100+ different portals"
    }
  ];

  const solutions = [
    {
      icon: Smartphone,
      title: "AI-Powered Assistance",
      description: "Intelligent chatbots that understand your needs and provide instant help",
      impact: "Reduces application time by 80%"
    },
    {
      icon: Globe,
      title: "Multilingual Support",
      description: "Complete support in Hindi and English for better accessibility",
      impact: "Serves 95% of Indian population"
    },
    {
      icon: CheckCircle,
      title: "Unified Platform",
      description: "All government services accessible from a single, user-friendly interface",
      impact: "One platform for all needs"
    },
    {
      icon: TrendingUp,
      title: "Smart Recommendations",
      description: "Personalized suggestions based on your profile and requirements",
      impact: "Improves success rate by 60%"
    }
  ];

  const impact = [
    { metric: "10M+", label: "Citizens Can Benefit", color: "text-blue-600" },
    { metric: "80%", label: "Time Reduction", color: "text-green-600" },
    { metric: "24/7", label: "Availability", color: "text-purple-600" },
    { metric: "15+", label: "Languages Supported", color: "text-orange-600" }
  ];

  return (
    <Layout>
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6 animate-fade-in">
              Why India Needs JanSathi
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in">
              Bridging the gap between citizens and government services through intelligent technology
            </p>
          </div>

          {/* Problems Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
              The Current Challenges
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Citizens face numerous obstacles when accessing government services. Here's what we're solving:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {problems.map((problem, index) => {
                const Icon = problem.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300 border-l-4 border-red-400">
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg font-bold text-gray-900">
                            {problem.title}
                          </CardTitle>
                          <div className="text-sm font-semibold text-red-600">
                            {problem.stat}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">
                        {problem.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Solutions Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
              Our AI-Powered Solutions
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              JanSathi leverages cutting-edge AI technology to transform how citizens interact with government services:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {solutions.map((solution, index) => {
                const Icon = solution.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300 border-l-4 border-green-400">
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg font-bold text-gray-900">
                            {solution.title}
                          </CardTitle>
                          <div className="text-sm font-semibold text-green-600">
                            {solution.impact}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">
                        {solution.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Impact Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              The JanSathi Impact
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {impact.map((item, index) => (
                <div key={index} className="text-center">
                  <div className={`text-4xl font-bold ${item.color} mb-2`}>
                    {item.metric}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vision Section */}
          <div className="bg-gradient-to-r from-indian-saffron to-indian-green rounded-2xl p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-6">
              Building a Digital India for Every Citizen
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
              JanSathi represents more than just a platform—it's a movement towards making government services 
              accessible, efficient, and citizen-friendly. Together, we're creating a future where every Indian 
              can easily access their rights and benefits.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/schemes">
                <Button size="lg" variant="secondary" className="bg-white text-indian-saffron hover:bg-gray-100">
                  Join the Movement
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-indian-saffron">
                  See How It Works
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WhyWeNeed;
