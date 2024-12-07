import React from 'react';
import { format } from 'date-fns';
import { Transaction } from '../types/transaction';
import { Trash2 } from 'lucide-react';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

export function TransactionList({ transactions, onDelete }: TransactionListProps) {
  return (
    <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {format(transaction.date, 'MMM dd, yyyy')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    transaction.type === 'expense' ? 'bg-red-900 text-red-200' : 'bg-green-900 text-green-200'
                  }`}>
                    {transaction.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {transaction.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {transaction.category}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                  transaction.type === 'expense' ? 'text-red-400' : 'text-green-400'
                }`}>
                  ${transaction.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <button
                    onClick={() => onDelete(transaction.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}