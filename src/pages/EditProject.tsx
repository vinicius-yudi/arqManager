import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';
import ProjectForm from '../components/projects/ProjectForm';
import { mockProjects } from '../data/mockData';

const EditProject: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const project = mockProjects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900">Projeto não encontrado</h2>
        <p className="text-gray-500 mt-2 mb-6">O projeto que você está procurando não existe ou foi removido.</p>
        <Button variant="primary" onClick={() => navigate('/projects')}>
          Voltar para Projetos
        </Button>
      </div>
    );
  }

  const handleSubmit = (data: any) => {
    // In a real app, this would be an API call
    const projectIndex = mockProjects.findIndex(p => p.id === id);
    if (projectIndex !== -1) {
      mockProjects[projectIndex] = {
        ...mockProjects[projectIndex],
        ...data,
        updatedAt: new Date().toISOString(),
      };
    }
    navigate(`/projects/${id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          icon={<ArrowLeft size={18} />}
          onClick={() => navigate(`/projects/${id}`)}
        >
          Voltar
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Editar Projeto</h1>
          <p className="text-gray-500 mt-1">Atualize as informações do projeto</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <ProjectForm
          project={project}
          onSubmit={handleSubmit}
          onCancel={() => navigate(`/projects/${id}`)}
        />
      </div>
    </div>
  );
};

export default EditProject;