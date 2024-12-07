import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Transaction } from '../types/transaction';
import { groupByCategory } from '../utils/transactionUtils';

interface TransactionChartProps {
  transactions: Transaction[];
  type: 'expense' | 'income';
}

const COLORS = {
  expense: ['#ef4444', '#f87171', '#fca5a5', '#fecaca', '#fee2e2', '#fef2f2'],
  income: ['#22c55e', '#4ade80', '#86efac', '#bbf7d0', '#dcfce7', '#f0fdf4'],
};

export function TransactionChart({ transactions, type }: TransactionChartProps) {
  const categoryData = groupByCategory(transactions, type);
  const data = Object.entries(categoryData).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-medium text-gray-200 mb-4">
        {type === 'expense' ? 'Expense' : 'Income'} Distribution
      </h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {data.map((_, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[type][index % COLORS[type].length]} 
                />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => `$${value.toFixed(2)}`}
              contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
              itemStyle={{ color: '#e5e7eb' }}
            />
            <Legend wrapperStyle={{ color: '#e5e7eb' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}