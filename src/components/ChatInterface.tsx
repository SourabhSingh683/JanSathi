
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface Message {
  type: "bot" | "user";
  content: string;
  draft?: string;
  isComplete?: boolean;
}

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  placeholder?: string;
  language?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  messages, 
  onSendMessage, 
  placeholder = "Type your message...",
  language = "english" 
}) => {
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim());
      setInputValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-96">
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto mb-4 p-4 bg-gray-50 rounded-lg space-y-4"
      >
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md p-3 rounded-lg ${
              message.type === 'user' 
                ? 'bg-blue-500 text-white' 
                : 'bg-white text-gray-800 border shadow-sm'
            }`}>
              <pre className="whitespace-pre-wrap font-sans text-sm">{message.content}</pre>
              {message.draft && (
                <div className="mt-3 p-3 bg-gray-100 rounded text-sm">
                  <pre className="whitespace-pre-wrap font-mono text-xs">{message.draft}</pre>
                  <Button 
                    size="sm" 
                    className="mt-2"
                    onClick={() => {
                      const element = document.createElement('a');
                      const file = new Blob([message.draft!], {type: 'text/plain'});
                      element.href = URL.createObjectURL(file);
                      element.download = 'Application.txt';
                      document.body.appendChild(element);
                      element.click();
                      document.body.removeChild(element);
                    }}
                  >
                    <Send className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="flex space-x-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
          onKeyPress={handleKeyPress}
          className="flex-1"
        />
        <Button onClick={handleSend} className="px-4">
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInterface;
