import React from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { Transaction } from '../types/transaction';
import { calculateTotal } from '../utils/transactionUtils';

interface TransactionStatsProps {
  transactions: Transaction[];
}

export function TransactionStats({ transactions }: TransactionStatsProps) {
  const totalIncome = calculateTotal(transactions, 'income');
  const totalExpenses = calculateTotal(transactions, 'expense');
  const balance = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Income</p>
            <p className="text-xl font-bold text-green-400">${totalIncome.toFixed(2)}</p>
          </div>
          <TrendingUp className="w-8 h-8 text-green-400" />
        </div>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Expenses</p>
            <p className="text-xl font-bold text-red-400">${totalExpenses.toFixed(2)}</p>
          </div>
          <TrendingDown className="w-8 h-8 text-red-400" />
        </div>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Balance</p>
            <p className={`text-xl font-bold ${balance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              ${balance.toFixed(2)}
            </p>
          </div>
          <DollarSign className="w-8 h-8 text-blue-400" />
        </div>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Savings Rate</p>
            <p className={`text-xl font-bold ${savingsRate >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {savingsRate.toFixed(1)}%
            </p>
          </div>
          <div className="w-8 h-8 flex items-center justify-center">
            <span className="text-2xl">💰</span>
          </div>
        </div>
      </div>
    </div>
  );
}