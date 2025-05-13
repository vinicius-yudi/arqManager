import React from 'react';
import { Building2, Calendar, Users } from 'lucide-react';
import Card, { CardContent, CardHeader } from '../ui/Card';
import Progress from '../ui/Progress';
import { Project } from '../../types';

interface ProjectSummaryProps {
  project: Project;
}

const ProjectSummary: React.FC<ProjectSummaryProps> = ({ project }) => {
  const { name, location, startDate, endDate, team, progress, stages, budget, expenses } = project;
  
  // Calculate total expenses
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const budgetPercentage = (totalExpenses / budget) * 100;
  
  // Calculate days remaining
  const today = new Date();
  const end = new Date(endDate);
  const totalDays = Math.ceil((end.getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24));
  const daysRemaining = Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const daysPercentage = 100 - ((daysRemaining / totalDays) * 100);
  
  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-bold text-gray-900">Resumo do Projeto</h2>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-700">Progresso Total</span>
            <span className="text-sm font-medium text-gray-700">{progress}%</span>
          </div>
          <Progress value={progress} color="secondary" size="lg" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center mb-2">
              <Building2 size={20} className="text-[#334e68] mr-2" />
              <h3 className="text-sm font-medium text-gray-700">Localização</h3>
            </div>
            <p className="text-sm text-gray-600">{location}</p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center mb-2">
              <Calendar size={20} className="text-[#334e68] mr-2" />
              <h3 className="text-sm font-medium text-gray-700">Prazo</h3>
            </div>
            <p className="text-sm text-gray-600">
              {daysRemaining > 0 ? `${daysRemaining} dias restantes` : 'Prazo vencido'}
            </p>
            <div className="mt-2">
              <Progress 
                value={daysPercentage} 
                color={daysRemaining > 30 ? 'success' : daysRemaining > 7 ? 'warning' : 'danger'} 
                size="sm" 
              />
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center mb-2">
              <Users size={20} className="text-[#334e68] mr-2" />
              <h3 className="text-sm font-medium text-gray-700">Equipe</h3>
            </div>
            <p className="text-sm text-gray-600">{team.length} membros</p>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-700">Orçamento</span>
            <span className="text-sm font-medium text-gray-700">
              R$ {totalExpenses.toLocaleString('pt-BR')} / R$ {budget.toLocaleString('pt-BR')}
            </span>
          </div>
          <Progress 
            value={budgetPercentage} 
            color={budgetPercentage > 90 ? 'danger' : budgetPercentage > 70 ? 'warning' : 'success'} 
          />
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Etapas</h3>
          <div className="space-y-2">
            {stages.map((stage) => (
              <div key={stage.id} className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{stage.name}</span>
                <div className="flex items-center w-32">
                  <Progress value={stage.progress} size="sm" className="flex-grow mr-2" />
                  <span className="text-xs text-gray-500">{stage.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectSummary;