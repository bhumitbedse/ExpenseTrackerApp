import React, { useState } from 'react';
import { Target } from 'lucide-react';

interface BudgetGoalProps {
  monthlyExpenses: number;
  budgetGoal: number;
  onUpdateBudgetGoal: (goal: number) => void;
}

export function BudgetGoal({ monthlyExpenses, budgetGoal, onUpdateBudgetGoal }: BudgetGoalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newGoal, setNewGoal] = useState(budgetGoal.toString());
  
  const progress = Math.min((monthlyExpenses / budgetGoal) * 100, 100);
  const remaining = Math.max(budgetGoal - monthlyExpenses, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const goal = parseFloat(newGoal);
    if (!isNaN(goal) && goal > 0) {
      onUpdateBudgetGoal(goal);
      setIsEditing(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Target className="w-5 h-5 text-blue-400 mr-2" />
          <h3 className="text-lg font-medium text-gray-200">Monthly Budget Goal</h3>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-sm text-blue-400 hover:text-blue-300"
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            className="w-full rounded-md bg-gray-700 border-gray-600 text-white"
            min="0"
            step="0.01"
            required
          />
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            Save Goal
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between text-sm text-gray-300">
            <span>Progress</span>
            <span>${monthlyExpenses.toFixed(2)} / ${budgetGoal.toFixed(2)}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full ${
                progress >= 100 ? 'bg-red-600' : progress >= 80 ? 'bg-yellow-600' : 'bg-green-600'
              }`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-300">Remaining</span>
            <span className={`font-medium ${remaining > 0 ? 'text-green-400' : 'text-red-400'}`}>
              ${remaining.toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}