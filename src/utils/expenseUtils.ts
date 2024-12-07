import { Expense } from '../types/expense';
import { startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';

export const generateId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

export const filterExpensesByMonth = (expenses: Expense[], date: Date): Expense[] => {
  const start = startOfMonth(date);
  const end = endOfMonth(date);

  return expenses.filter((expense) =>
    isWithinInterval(expense.date, { start, end })
  );
};

export const calculateTotalExpenses = (expenses: Expense[]): number => {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
};

export const groupExpensesByCategory = (expenses: Expense[]): Record<string, number> => {
  return expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);
};