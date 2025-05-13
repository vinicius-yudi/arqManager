import React from 'react';
import { ClipboardList, Image, Calendar } from 'lucide-react';
import Card, { CardContent, CardHeader } from '../ui/Card';
import Progress from '../ui/Progress';
import StatusBadge from '../ui/StatusBadge';
import { ProjectStage } from '../../types';

interface StageCardProps {
  stage: ProjectStage;
  onClick: () => void;
}

const StageCard: React.FC<StageCardProps> = ({ stage, onClick }) => {
  const { name, description, status, progress, startDate, endDate, tasks, photos } = stage;
  
  return (
    <Card className="h-full cursor-pointer" onClick={onClick}>
      <CardHeader className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        </div>
        <StatusBadge status={status} />
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700">Progresso</span>
              <span className="text-sm font-medium text-gray-700">{progress}%</span>
            </div>
            <Progress value={progress} color={status === 'completed' ? 'success' : 'secondary'} />
          </div>
          
          <div className="flex text-sm text-gray-500 items-center">
            <Calendar size={16} className="mr-1" />
            <span>
              {new Date(startDate).toLocaleDateString('pt-BR')} - {new Date(endDate).toLocaleDateString('pt-BR')}
            </span>
          </div>
          
          <div className="flex justify-between">
            <div className="flex items-center text-sm text-gray-500">
              <ClipboardList size={16} className="mr-1" />
              <span>{tasks.length} tarefas</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-500">
              <Image size={16} className="mr-1" />
              <span>{photos.length} fotos</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StageCard;