import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Transaction } from '../types/transaction';
import { TransactionForm } from '../components/TransactionForm';
import { TransactionList } from '../components/TransactionList';
import { TransactionChart } from '../components/TransactionChart';
import { TransactionStats } from '../components/TransactionStats';
import { BudgetGoal } from '../components/BudgetGoal';
import { MonthPicker } from '../components/MonthPicker';
import { ExportButton } from '../components/ExportButton';
import { ThemeSwitcher } from '../components/ThemeSwitcher';
import { filterTransactionsByMonth, calculateTotal } from '../utils/transactionUtils';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { Wallet, LogOut } from 'lucide-react';

export default function Dashboard() {
  const { theme } = useTheme();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('transactions', []);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [budgetGoal, setBudgetGoal] = useLocalStorage('budgetGoal', 2000);

  const monthlyTransactions = filterTransactionsByMonth(transactions, currentDate);
  const monthlyExpenses = calculateTotal(monthlyTransactions, 'expense');

  const handleAddTransaction = (transaction: Transaction) => {
    setTransactions([transaction, ...transactions]);
    toast.success(`${transaction.type === 'expense' ? 'Expense' : 'Income'} added successfully!`);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id));
    toast.success('Transaction deleted successfully!');
  };

  const handleUpdateBudgetGoal = (goal: number) => {
    setBudgetGoal(goal);
    toast.success('Budget goal updated successfully!');
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
      toast.success('Logged out successfully!');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  return (
    <div className={`min-h-screen ${theme.background} ${theme.text}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 space-y-4 sm:space-y-0">
          <div className="flex items-center">
            <Wallet className="w-8 h-8 text-blue-400 mr-3" />
            <div>
              <h1 className="text-3xl font-bold">Finance Tracker</h1>
              <p className={`text-sm ${theme.textMuted}`}>{currentUser?.displayName}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <ThemeSwitcher />
            <div className="flex space-x-4">
              <ExportButton 
                transactions={monthlyTransactions} 
                currentDate={currentDate}
              />
              <MonthPicker
                currentDate={currentDate}
                onMonthChange={setCurrentDate}
              />
              <button
                onClick={handleLogout}
                className={`flex items-center px-4 py-2 rounded-md ${theme.button.primary} ${theme.button.primaryHover}`}
              >
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>

        <TransactionStats transactions={monthlyTransactions} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Transactions</h2>
              <ExportButton transactions={transactions} />
            </div>
            <TransactionList
              transactions={monthlyTransactions}
              onDelete={handleDeleteTransaction}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <TransactionChart transactions={monthlyTransactions} type="expense" />
              <TransactionChart transactions={monthlyTransactions} type="income" />
            </div>
          </div>
          <div className="space-y-8">
            <TransactionForm onAdd={handleAddTransaction} />
            <BudgetGoal
              monthlyExpenses={monthlyExpenses}
              budgetGoal={budgetGoal}
              onUpdateBudgetGoal={handleUpdateBudgetGoal}
            />
          </div>
        </div>
      </div>
    </div>
  );
}