
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, FileText, MessageSquare, Award, Info, HelpCircle } from "lucide-react";
import { useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "RTI Assistant", href: "/rti", icon: FileText },
    { name: "Grievance Assistant", href: "/grievance", icon: MessageSquare },
    { name: "Schemes Assistant", href: "/schemes", icon: Award },
    { name: "How It Works", href: "/how-it-works", icon: Info },
    { name: "Why We Need", href: "/why-we-need", icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50">
      <header className="bg-white shadow-lg border-b-4 border-gradient-to-r from-indian-saffron via-indian-white to-indian-green sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-indian-saffron to-indian-green rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-white font-bold text-xl">JS</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 group-hover:text-indian-saffron transition-colors">JanSathi</h1>
                <p className="text-sm text-gray-600 hidden sm:block">Digital Citizen Services</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                      isActive
                        ? "bg-indian-saffron text-white shadow-lg"
                        : "text-gray-700 hover:bg-gray-100 hover:shadow-md hover:scale-105"
                    }`}
                  >
                    <Icon size={18} />
                    <span className="hidden xl:block">{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative z-50"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t z-40">
              <div className="px-4 pt-2 pb-3 space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center space-x-3 px-3 py-3 rounded-md transition-all duration-300 ${
                        isActive
                          ? "bg-indian-saffron text-white shadow-lg"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon size={20} />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-indian-saffron to-indian-green rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">JS</span>
                </div>
                <h3 className="text-xl font-semibold">JanSathi</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Empowering citizens with AI-powered digital access to government services. 
                Making bureaucracy simple, transparent, and accessible to everyone.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-indian-saffron rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">IN</span>
                </div>
                <div className="w-8 h-8 bg-indian-green rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">AI</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-300">
                <li>RTI Applications</li>
                <li>Grievance Filing</li>
                <li>Government Schemes</li>
                <li>AI Assistance</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
                <li><Link to="/why-we-need" className="hover:text-white transition-colors">Why We Need</Link></li>
                <li><a href="https://services.india.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">India.gov.in</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 JanSathi. Democratizing access to government services through AI.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
