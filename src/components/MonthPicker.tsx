import React from 'react';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MonthPickerProps {
  currentDate: Date;
  onMonthChange: (date: Date) => void;
}

export function MonthPicker({ currentDate, onMonthChange }: MonthPickerProps) {
  const handlePreviousMonth = () => {
    const newDate = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
    onMonthChange(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
    onMonthChange(newDate);
  };

  return (
    <div className="flex items-center justify-between bg-gray-800 px-4 py-2 rounded-lg shadow-md">
      <button
        onClick={handlePreviousMonth}
        className="p-2 hover:bg-gray-700 rounded-full text-gray-300"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <span className="text-lg font-medium text-gray-200">
        {format(currentDate, 'MMMM yyyy')}
      </span>
      <button
        onClick={handleNextMonth}
        className="p-2 hover:bg-gray-700 rounded-full text-gray-300"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}