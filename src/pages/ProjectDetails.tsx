import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, Edit, MessageSquare, Clock, Users, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card, { CardContent } from '../components/ui/Card';
import Avatar from '../components/ui/Avatar';
import StageCard from '../components/projects/StageCard';
import ProjectSummary from '../components/dashboard/ProjectSummary';
import StageProgress from '../components/dashboard/StageProgress';
import ExpensesSummary from '../components/dashboard/ExpensesSummary';
import RecentPhotos from '../components/dashboard/RecentPhotos';
import ChatWindow from '../components/chat/ChatWindow';
import { mockProjects } from '../data/mockData';

type Tab = 'overview' | 'stages' | 'team' | 'budget' | 'chat';

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [chatOpen, setChatOpen] = useState(false);
  
  // Find project by ID
  const project = mockProjects.find(p => p.id === id);
  
  if (!project) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900">Projeto não encontrado</h2>
        <p className="text-gray-500 mt-2 mb-6">O projeto que você está procurando não existe ou foi removido.</p>
        <Link to="/projects">
          <Button variant="primary">Voltar para Projetos</Button>
        </Link>
      </div>
    );
  }
  
  // Group stages by status for display
  const inProgressStages = project.stages.filter(stage => stage.status === 'in_progress');
  const pendingStages = project.stages.filter(stage => stage.status === 'pending');
  const completedStages = project.stages.filter(stage => stage.status === 'completed');
  
  // Get all photos from all stages
  const allPhotos = project.stages.flatMap(stage => stage.photos);
  
  // Toggle chat window
  const toggleChat = () => {
    setChatOpen(!chatOpen);
  };
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <Link to="/projects" className="mr-4">
            <Button variant="outline" size="sm" icon={<ArrowLeft size={18} />}>
              Voltar
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
            <p className="text-gray-500 mt-1">{project.location}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            icon={<MessageSquare size={18} />}
            onClick={toggleChat}
          >
            Chat
          </Button>
          <Button
            variant="primary"
            icon={<Edit size={18} />}
          >
            Editar
          </Button>
        </div>
      </div>
      
      <nav className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 text-sm font-medium border-b-2 ${
            activeTab === 'overview'
              ? 'border-[#334e68] text-[#334e68]'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Visão Geral
        </button>
        <button
          onClick={() => setActiveTab('stages')}
          className={`px-4 py-2 text-sm font-medium border-b-2 ${
            activeTab === 'stages'
              ? 'border-[#334e68] text-[#334e68]'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Etapas
        </button>
        <button
          onClick={() => setActiveTab('team')}
          className={`px-4 py-2 text-sm font-medium border-b-2 ${
            activeTab === 'team'
              ? 'border-[#334e68] text-[#334e68]'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Equipe
        </button>
        <button
          onClick={() => setActiveTab('budget')}
          className={`px-4 py-2 text-sm font-medium border-b-2 ${
            activeTab === 'budget'
              ? 'border-[#334e68] text-[#334e68]'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Orçamento
        </button>
        <button
          onClick={() => setActiveTab('chat')}
          className={`px-4 py-2 text-sm font-medium border-b-2 ${
            activeTab === 'chat'
              ? 'border-[#334e68] text-[#334e68]'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Chat
        </button>
      </nav>
      
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ProjectSummary project={project} />
          </div>
          <div>
            <StageProgress stages={project.stages} />
          </div>
          <div className="lg:col-span-2">
            <RecentPhotos photos={allPhotos} />
          </div>
          <div>
            <ExpensesSummary expenses={project.expenses} budget={project.budget} />
          </div>
        </div>
      )}
      
      {activeTab === 'stages' && (
        <div className="space-y-8">
          {inProgressStages.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Em Andamento</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {inProgressStages.map(stage => (
                  <StageCard key={stage.id} stage={stage} onClick={() => {}} />
                ))}
              </div>
            </div>
          )}
          
          {pendingStages.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Pendentes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pendingStages.map(stage => (
                  <StageCard key={stage.id} stage={stage} onClick={() => {}} />
                ))}
              </div>
            </div>
          )}
          
          {completedStages.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Concluídas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedStages.map(stage => (
                  <StageCard key={stage.id} stage={stage} onClick={() => {}} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      
      {activeTab === 'team' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Cliente</h2>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Avatar 
                    src={project.client.avatar} 
                    name={project.client.name} 
                    size="lg" 
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{project.client.name}</h3>
                    <p className="text-gray-500">{project.client.email}</p>
                    <div className="flex items-center mt-2 text-sm text-gray-500">
                      <Clock size={16} className="mr-1" />
                      <span>Cliente desde {new Date(project.createdAt).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Equipe</h2>
              <Button variant="outline" size="sm" icon={<Plus size={16} />}>
                Adicionar Membro
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.team.map(member => (
                <Card key={member.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <Avatar 
                        src={member.avatar} 
                        name={member.name} 
                        size="lg" 
                      />
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
                        <p className="text-gray-500">{member.role}</p>
                        <p className="text-sm text-gray-500 mt-1">{member.contact}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'budget' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Gastos do Projeto</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {project.expenses.map(expense => (
                          <tr key={expense.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{expense.description}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.category}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(expense.date).toLocaleDateString('pt-BR')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              R$ {expense.amount.toLocaleString('pt-BR')}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div>
              <ExpensesSummary expenses={project.expenses} budget={project.budget} />
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'chat' && (
        <div className="h-[600px]">
          <ChatWindow messages={project.messages} client={project.client} />
        </div>
      )}
      
      {/* Floating Chat Window */}
      {chatOpen && (
        <div className="fixed bottom-4 right-4 w-[350px] h-[500px] z-30 shadow-xl rounded-lg overflow-hidden">
          <div className="flex justify-between items-center bg-[#334e68] text-white p-3">
            <div className="flex items-center">
              <Avatar src={project.client.avatar} name={project.client.name} size="sm" />
              <span className="ml-2 font-medium">{project.client.name}</span>
            </div>
            <button onClick={toggleChat} className="text-white hover:text-gray-200">
              <X size={20} />
            </button>
          </div>
          <ChatWindow messages={project.messages} client={project.client} />
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;

// Import the X icon
const X = (props: { size: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size}
    height={props.size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);