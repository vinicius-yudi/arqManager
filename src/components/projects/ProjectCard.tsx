import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card, { CardContent, CardFooter, CardHeader } from '../ui/Card';
import Avatar from '../ui/Avatar';
import Progress from '../ui/Progress';
import { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { id, name, location, startDate, endDate, client, team, progress } = project;
  
  // Calculate days remaining
  const today = new Date();
  const end = new Date(endDate);
  const daysRemaining = Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  return (
    <Link to={`/projects/${id}`}>
      <Card className="h-full cursor-pointer">
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900 truncate">{name}</h3>
          <div className="flex items-center mt-1 text-sm text-gray-500">
            <MapPin size={16} className="mr-1" />
            <span className="truncate">{location}</span>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Calendar size={16} className="text-gray-500 mr-1" />
                <span className="text-sm text-gray-500">
                  {new Date(startDate).toLocaleDateString('pt-BR')} - {new Date(endDate).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">Progresso</span>
                <span className="text-sm font-medium text-gray-700">{progress}%</span>
              </div>
              <Progress value={progress} color="secondary" />
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Cliente</p>
              <div className="flex items-center">
                <Avatar src={client.avatar} name={client.name} size="sm" />
                <span className="ml-2 text-sm text-gray-700">{client.name}</span>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between items-center">
          <div className="flex -space-x-2">
            {team.slice(0, 3).map((member) => (
              <Avatar
                key={member.id}
                src={member.avatar}
                name={member.name}
                size="sm"
                className="border-2 border-white"
              />
            ))}
            {team.length > 3 && (
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-xs font-medium text-gray-700 border-2 border-white">
                +{team.length - 3}
              </div>
            )}
          </div>
          
          <div className={`text-sm font-medium ${daysRemaining > 30 ? 'text-green-600' : daysRemaining > 7 ? 'text-yellow-600' : 'text-red-600'}`}>
            {daysRemaining > 0 ? `${daysRemaining} dias restantes` : 'Prazo vencido'}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProjectCard;