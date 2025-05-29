
import React from 'react';
import { Button } from "@/components/ui/button";

interface QuickActionButtonsProps {
  options: string[];
  onSelect: (option: string) => void;
  language?: string;
}

const QuickActionButtons: React.FC<QuickActionButtonsProps> = ({ options, onSelect, language }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
      {options.map((option, index) => (
        <Button
          key={index}
          variant="outline"
          className="text-left justify-start h-auto py-3 px-4 hover:bg-blue-50 hover:border-blue-200"
          onClick={() => onSelect(option)}
        >
          <span className="font-medium text-blue-600 mr-2">{index + 1}.</span>
          {option}
        </Button>
      ))}
    </div>
  );
};

export default QuickActionButtons;
