import React from 'react';
import Badge from './Badge';

interface StatusBadgeProps {
  status: 'pending' | 'in_progress' | 'completed';
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const statusConfig = {
    pending: {
      variant: 'warning' as const,
      label: 'Pendente',
    },
    in_progress: {
      variant: 'primary' as const,
      label: 'Em Andamento',
    },
    completed: {
      variant: 'success' as const,
      label: 'Concluído',
    },
  };

  const config = statusConfig[status];

  return (
    <Badge variant={config.variant} className={className}>
      {config.label}
    </Badge>
  );
};

export default StatusBadge;