export type TransactionType = 'expense' | 'income';

export interface Transaction {
  id: string;
  type: TransactionType;
  description: string;
  amount: number;
  category: string;
  date: Date;
}

export type ExpenseCategory =
  | 'Food'
  | 'Transportation'
  | 'Entertainment'
  | 'Shopping'
  | 'Bills'
  | 'Other';

export type IncomeCategory =
  | 'Salary'
  | 'Freelance'
  | 'Investments'
  | 'Business'
  | 'Other';