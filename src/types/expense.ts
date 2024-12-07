export interface Expense {
  id: string;
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