import { Transaction } from '../types/transaction';
import { startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';

export const generateId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

export const filterTransactionsByMonth = (transactions: Transaction[], date: Date): Transaction[] => {
  const start = startOfMonth(date);
  const end = endOfMonth(date);

  return transactions.filter((transaction) =>
    isWithinInterval(transaction.date, { start, end })
  );
};

export const calculateTotal = (transactions: Transaction[], type: 'expense' | 'income'): number => {
  return transactions
    .filter(t => t.type === type)
    .reduce((total, t) => total + t.amount, 0);
};

export const groupByCategory = (transactions: Transaction[], type: 'expense' | 'income'): Record<string, number> => {
  return transactions
    .filter(t => t.type === type)
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);
};