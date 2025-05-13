import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';
import ProjectForm from '../components/projects/ProjectForm';
import { mockProjects } from '../data/mockData';

const NewProject: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (data: any) => {
    // In a real app, this would be an API call
    const newProject = {
      id: String(mockProjects.length + 1),
      ...data,
      progress: 0,
      stages: [],
      expenses: [],
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockProjects.push(newProject);
    navigate(`/projects/${newProject.id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          icon={<ArrowLeft size={18} />}
          onClick={() => navigate('/projects')}
        >
          Voltar
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Novo Projeto</h1>
          <p className="text-gray-500 mt-1">Crie um novo projeto de construção</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <ProjectForm
          onSubmit={handleSubmit}
          onCancel={() => navigate('/projects')}
        />
      </div>
    </div>
  );
};

export default NewProject;