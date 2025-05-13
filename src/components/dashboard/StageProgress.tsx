import React from 'react';
import Card, { CardContent, CardHeader } from '../ui/Card';
import { ProjectStage } from '../../types';

interface StageProgressProps {
  stages: ProjectStage[];
}

const StageProgress: React.FC<StageProgressProps> = ({ stages }) => {
  const totalStages = stages.length;
  const completedStages = stages.filter(stage => stage.status === 'completed').length;
  const inProgressStages = stages.filter(stage => stage.status === 'in_progress').length;
  
  // Calculate overall progress
  const overallProgress = Math.round(
    (stages.reduce((sum, stage) => sum + stage.progress, 0) / totalStages) || 0
  );
  
  return (
    <Card className="h-full">
      <CardHeader>
        <h3 className="text-lg font-semibold text-gray-900">Progresso das Etapas</h3>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center mb-6">
            <div className="relative w-32 h-32">
              {/* SVG Circle Progress */}
              <svg className="w-full h-full" viewBox="0 0 100 100">
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
                  className="text-[#0c9fa6]"
                  strokeWidth="10"
                  strokeDasharray={250}
                  strokeDashoffset={250 - (250 * overallProgress) / 100}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="40"
                  cx="50"
                  cy="50"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-gray-700">{overallProgress}%</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-[#f0f4f8] p-4 rounded-lg">
              <p className="text-2xl font-bold text-gray-700">{totalStages}</p>
              <p className="text-sm text-gray-500">Total</p>
            </div>
            
            <div className="bg-[#0c9fa6] bg-opacity-10 p-4 rounded-lg">
              <p className="text-2xl font-bold text-[#0c9fa6]">{inProgressStages}</p>
              <p className="text-sm text-[#0c9fa6]">Em andamento</p>
            </div>
            
            <div className="bg-green-100 p-4 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{completedStages}</p>
              <p className="text-sm text-green-600">Concluídas</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StageProgress;