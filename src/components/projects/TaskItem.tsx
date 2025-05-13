import React from 'react';
import { Calendar } from 'lucide-react';
import StatusBadge from '../ui/StatusBadge';
import Avatar from '../ui/Avatar';
import { Task } from '../../types';

interface TaskItemProps {
  task: Task;
  assignee?: { name: string; avatar?: string };
}

const TaskItem: React.FC<TaskItemProps> = ({ task, assignee }) => {
  const { title, description, status, dueDate } = task;
  
  // Check if task is overdue
  const isOverdue = new Date(dueDate) < new Date() && status !== 'completed';
  
  return (
    <div className="border border-gray-200 rounded-md p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium text-gray-900">{title}</h4>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        </div>
        <StatusBadge status={status} />
      </div>
      
      <div className="mt-4 flex justify-between items-center">
        <div className={`flex items-center text-sm ${isOverdue ? 'text-red-600' : 'text-gray-500'}`}>
          <Calendar size={16} className="mr-1" />
          <span>{new Date(dueDate).toLocaleDateString('pt-BR')}</span>
          {isOverdue && <span className="ml-2 text-red-600 font-medium">Atrasado</span>}
        </div>
        
        {assignee && (
          <div className="flex items-center">
            <Avatar src={assignee.avatar} name={assignee.name} size="sm" />
            <span className="ml-2 text-sm text-gray-700">{assignee.name}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskItem;