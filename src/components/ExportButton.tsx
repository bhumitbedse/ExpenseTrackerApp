import React from 'react';
import { Download } from 'lucide-react';
import { Transaction } from '../types/transaction';
import { exportToCSV } from '../utils/exportUtils';
import { format } from 'date-fns';

interface ExportButtonProps {
  transactions: Transaction[];
  currentDate?: Date;
}

export function ExportButton({ transactions, currentDate }: ExportButtonProps) {
  const handleExport = () => {
    const fileName = currentDate
      ? `transactions_${format(currentDate, 'yyyy-MM')}`
      : 'all_transactions';
    exportToCSV(transactions, fileName);
  };

  return (
    <button
      onClick={handleExport}
      className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm"
    >
      <Download className="w-4 h-4 mr-2" />
      Export to Excel
    </button>
  );
}