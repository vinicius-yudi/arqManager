import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import ProjectList from '../components/projects/ProjectList';
import { mockProjects } from '../data/mockData';

const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter projects based on search term
  const filteredProjects = mockProjects.filter(project => 
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projetos</h1>
          <p className="text-gray-500 mt-1">Gerencie todos os seus projetos</p>
        </div>
        <Button 
          variant="primary" 
          icon={<Plus size={18} />}
          onClick={() => navigate('/projects/new')}
        >
          Novo Projeto
        </Button>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Input
            placeholder="Buscar projetos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4 sm:mb-0 sm:w-72"
            icon={<Search size={18} />}
          />
          
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">Todos</Button>
            <Button variant="ghost" size="sm">Em Andamento</Button>
            <Button variant="ghost" size="sm">Concluídos</Button>
            <Button variant="ghost" size="sm">Atrasados</Button>
          </div>
        </div>
      </div>
      
      {filteredProjects.length > 0 ? (
        <ProjectList projects={filteredProjects} />
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum projeto encontrado</h3>
          <p className="text-gray-500 mb-6">Tente ajustar seus filtros ou criar um novo projeto</p>
          <Button 
            variant="primary" 
            icon={<Plus size={18} />}
            onClick={() => navigate('/projects/new')}
          >
            Criar Novo Projeto
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;