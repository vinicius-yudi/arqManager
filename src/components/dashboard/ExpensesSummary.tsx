import React from 'react';
import Card, { CardContent, CardHeader } from '../ui/Card';
import { Expense } from '../../types';

interface ExpensesSummaryProps {
  expenses: Expense[];
  budget: number;
}

const ExpensesSummary: React.FC<ExpensesSummaryProps> = ({ expenses, budget }) => {
  // Calculate total expenses
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  // Group expenses by category
  const expensesByCategory = expenses.reduce((acc, expense) => {
    if (!acc[expense.category]) {
      acc[expense.category] = 0;
    }
    acc[expense.category] += expense.amount;
    return acc;
  }, {} as Record<string, number>);
  
  // Sort categories by amount
  const sortedCategories = Object.entries(expensesByCategory).sort((a, b) => b[1] - a[1]);
  
  // Generate colors for the chart
  const colors = ['#334e68', '#0c9fa6', '#f76c5e', '#3b82f6', '#10b981', '#f59e0b'];
  
  return (
    <Card className="h-full">
      <CardHeader>
        <h3 className="text-lg font-semibold text-gray-900">Resumo de Gastos</h3>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center mb-6">
            <div className="relative w-32 h-32">
              {/* SVG Circle Progress */}
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  className="text-gray-200"
                  strokeWidth="10"
                  stroke="currentColor"
                  fill="transparent"
                  r="40"
                  cx="50"
                  cy="50"
                />
                <circle
                  className="text-[#f76c5e]"
                  strokeWidth="10"
                  strokeDasharray={250}
                  strokeDashoffset={250 - (250 * (totalExpenses / budget)) / 100}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="40"
                  cx="50"
                  cy="50"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-gray-700">
                  {Math.round((totalExpenses / budget) * 100)}%
                </span>
                <span className="text-xs text-gray-500">do orçamento</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
            <span>Total de Gastos</span>
            <span>Orçamento</span>
          </div>
          
          <div className="flex justify-between text-sm mb-6">
            <span className="font-bold text-gray-900">R$ {totalExpenses.toLocaleString('pt-BR')}</span>
            <span className="text-gray-500">R$ {budget.toLocaleString('pt-BR')}</span>
          </div>
          
          <h4 className="text-sm font-medium text-gray-700 mb-2">Gastos por Categoria</h4>
          
          <div className="space-y-3">
            {sortedCategories.map(([category, amount], index) => (
              <div key={category}>
                <div className="flex justify-between items-center text-sm mb-1">
                  <span className="text-gray-700">{category}</span>
                  <span className="text-gray-900">R$ {amount.toLocaleString('pt-BR')}</span>
                </div>
                <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full rounded-full"
                    style={{ 
                      width: `${(amount / totalExpenses) * 100}%`,
                      backgroundColor: colors[index % colors.length] 
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpensesSummary;