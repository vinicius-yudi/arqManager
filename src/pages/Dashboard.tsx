import React from 'react';
import { Plus } from 'lucide-react';
import Button from '../components/ui/Button';
import ProjectList from '../components/projects/ProjectList';
import { mockProjects } from '../data/mockData';

const Dashboard: React.FC = () => {
  // Get in progress projects
  const inProgressProjects = mockProjects.filter(project => project.progress > 0 && project.progress < 100);
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Painel de Controle</h1>
          <p className="text-gray-500 mt-1">Gerencie seus projetos e acompanhe o progresso</p>
        </div>
        <Button variant="primary" icon={<Plus size={18} />}>
          Novo Projeto
        </Button>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <h3 className="font-semibold text-lg text-gray-700">Projetos Ativos</h3>
          <p className="font-bold text-3xl mt-2 text-[#334e68]">{inProgressProjects.length}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <h3 className="font-semibold text-lg text-gray-700">Tarefas Pendentes</h3>
          <p className="font-bold text-3xl mt-2 text-[#f76c5e]">12</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <h3 className="font-semibold text-lg text-gray-700">Próximas Visitas</h3>
          <p className="font-bold text-3xl mt-2 text-[#0c9fa6]">3</p>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Projetos em Andamento</h2>
        <ProjectList projects={inProgressProjects} />
      </div>
    </div>
  );
};

export default Dashboard;