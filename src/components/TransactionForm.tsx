import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Transaction, TransactionType, ExpenseCategory, IncomeCategory } from '../types/transaction';
import { generateId } from '../utils/transactionUtils';

interface TransactionFormProps {
  onAdd: (transaction: Transaction) => void;
}

const expenseCategories: ExpenseCategory[] = [
  'Food',
  'Transportation',
  'Entertainment',
  'Shopping',
  'Bills',
  'Other',
];

const incomeCategories: IncomeCategory[] = [
  'Salary',
  'Freelance',
  'Investments',
  'Business',
  'Other',
];

export function TransactionForm({ onAdd }: TransactionFormProps) {
  const [type, setType] = useState<TransactionType>('expense');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<string>('Other');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const transaction: Transaction = {
      id: generateId(),
      type,
      description,
      amount: parseFloat(amount),
      category,
      date: new Date(),
    };

    onAdd(transaction);
    setDescription('');
    setAmount('');
    setCategory('Other');
  };

  const categories = type === 'expense' ? expenseCategories : incomeCategories;

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="space-y-4">
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => setType('expense')}
            className={`flex-1 py-2 px-4 rounded-md ${
              type === 'expense'
                ? 'bg-red-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Expense
          </button>
          <button
            type="button"
            onClick={() => setType('income')}
            className={`flex-1 py-2 px-4 rounded-md ${
              type === 'income'
                ? 'bg-green-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Income
          </button>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-200">
            Description
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
            required
          />
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-200">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
            min="0"
            step="0.01"
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-200">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className={`w-full flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium text-white ${
            type === 'expense' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add {type === 'expense' ? 'Expense' : 'Income'}
        </button>
      </div>
    </form>
  );
}