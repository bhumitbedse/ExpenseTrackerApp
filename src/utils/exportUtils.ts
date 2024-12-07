import { Transaction } from '../types/transaction';
import { format } from 'date-fns';
import * as XLSX from 'xlsx';

export const exportToCSV = (transactions: Transaction[], fileName: string) => {
  const data = formatTransactionsForExport(transactions);
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Transactions');
  XLSX.writeFile(wb, `${fileName}.xlsx`);
};

const formatTransactionsForExport = (transactions: Transaction[]) => {
  return transactions.map(transaction => ({
    Date: format(transaction.date, 'yyyy-MM-dd'),
    Type: transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1),
    Description: transaction.description,
    Category: transaction.category,
    Amount: transaction.amount.toFixed(2),
  }));
};