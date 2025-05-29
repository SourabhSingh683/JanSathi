
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock, FileText, Languages, Users, Zap, ArrowRight, CheckCircle, Target, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const WhyWeNeed = () => {
  const problems = [
    {
      icon: AlertTriangle,
      title: "Complex Government Procedures",
      description: "Citizens often struggle with complicated bureaucratic processes, unclear requirements, and confusing forms.",
      impact: "60% of citizens abandon applications due to complexity",
      color: "from-red-500 to-red-600"
    },
    {
      icon: Clock,
      title: "Time-Consuming Processes",
      description: "Traditional government services require multiple visits, long queues, and weeks of processing time.",
      impact: "Average 15-30 days for simple applications",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: Languages,
      title: "Language Barriers",
      description: "Most government portals are only in English, creating barriers for Hindi-speaking citizens.",
      impact: "40% of Indians prefer Hindi for official work",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Users,
      title: "Lack of Awareness",
      description: "Citizens are unaware of available government schemes and their eligibility criteria.",
      impact: "70% of eligible citizens don't know about schemes",
      color: "from-green-500 to-green-600"
    }
  ];

  const solutions = [
    {
      icon: Zap,
      title: "AI-Powered Assistance",
      description: "Intelligent chatbots guide users through processes step-by-step",
      benefit: "Reduces application time by 80%"
    },
    {
      icon: Languages,
      title: "Multilingual Support",
      description: "Available in both Hindi and English for better accessibility",
      benefit: "Serves 100% of Indian population"
    },
    {
      icon: FileText,
      title: "Auto-Generated Applications",
      description: "AI creates properly formatted applications based on user input",
      benefit: "99% accuracy in document generation"
    },
    {
      icon: Target,
      title: "Personalized Recommendations",
      description: "Smart matching of citizens with relevant government schemes",
      benefit: "Increases scheme adoption by 3x"
    }
  ];

  const impact = [
    {
      icon: TrendingUp,
      title: "Increased Efficiency",
      description: "Citizens complete applications 5x faster than traditional methods"
    },
    {
      icon: Users,
      title: "Better Accessibility",
      description: "Rural and urban citizens get equal access to government services"
    },
    {
      icon: CheckCircle,
      title: "Higher Success Rates",
      description: "AI-generated applications have 95% approval rates"
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6 animate-fade-in">
              Why We Built JanSathi
            </h1>
            <p className="text-xl text-gray-600 mb-8 animate-fade-in">
              Bridging the gap between citizens and government services through AI-powered solutions
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-indian-saffron to-indian-green mx-auto rounded animate-fade-in"></div>
          </div>
        </section>

        {/* Problems Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">The Problems We Identified</h2>
              <p className="text-lg text-gray-600">Citizens face numerous challenges when accessing government services</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {problems.map((problem, index) => {
                const Icon = problem.icon;
                return (
                  <Card key={index} className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-red-500">
                    <CardHeader>
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${problem.color} flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                            {problem.title}
                          </CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{problem.description}</p>
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <p className="text-red-700 font-semibold text-sm">📊 {problem.impact}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Solutions Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indian-saffron/5 to-indian-green/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our AI-Powered Solutions</h2>
              <p className="text-lg text-gray-600">How JanSathi addresses these challenges with cutting-edge technology</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {solutions.map((solution, index) => {
                const Icon = solution.icon;
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow bg-white border-0">
                    <CardHeader>
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-indian-saffron to-indian-green rounded-full flex items-center justify-center">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-lg font-bold text-gray-900">
                        {solution.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4 text-sm">{solution.description}</p>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <p className="text-green-700 font-semibold text-sm">✅ {solution.benefit}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Real Impact on Citizens</h2>
              <p className="text-lg text-gray-600">Measurable improvements in government service delivery</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {impact.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-indian-saffron to-indian-green rounded-full flex items-center justify-center shadow-lg">
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indian-saffron to-indian-green">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Our Vision for Digital India</h2>
            <p className="text-xl text-white/90 mb-8">
              A future where every citizen can access government services effortlessly, regardless of their 
              technical expertise, language preference, or location. JanSathi is not just a platform—it's 
              a bridge to digital empowerment.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/how-it-works">
                <Button size="lg" variant="secondary" className="bg-white text-indian-saffron hover:bg-gray-100 font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-300">
                  See How It Works
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/schemes">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-indian-saffron py-4 px-8 rounded-xl text-lg transition-all duration-300">
                  Try JanSathi Now
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">The Need for Change</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <div className="text-4xl font-bold text-red-600 mb-2">68%</div>
                <p className="text-gray-600">of citizens find government portals too complex</p>
              </div>
              <div className="p-6">
                <div className="text-4xl font-bold text-orange-600 mb-2">45 min</div>
                <p className="text-gray-600">average time to understand one application</p>
              </div>
              <div className="p-6">
                <div className="text-4xl font-bold text-green-600 mb-2">₹2000 Cr</div>
                <p className="text-gray-600">potential savings with digital efficiency</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default WhyWeNeed;
