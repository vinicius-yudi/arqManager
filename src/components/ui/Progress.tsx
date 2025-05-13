import React from 'react';

interface ProgressProps {
  value: number; // 0-100
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  showValue?: boolean;
  className?: string;
}

const Progress: React.FC<ProgressProps> = ({
  value,
  size = 'md',
  color = 'primary',
  showValue = false,
  className = '',
}) => {
  // Ensure value is within bounds
  const normalizedValue = Math.max(0, Math.min(100, value));

  const sizeStyles = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-4',
  };

  const colorStyles = {
    primary: 'bg-[#334e68]',
    secondary: 'bg-[#0c9fa6]',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500',
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center">
        <div className="w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`${sizeStyles[size]} ${colorStyles[color]} transition-all duration-500 ease-in-out`}
            style={{ width: `${normalizedValue}%` }}
            role="progressbar"
            aria-valuenow={normalizedValue}
            aria-valuemin={0}
            aria-valuemax={100}
          ></div>
        </div>
        {showValue && (
          <span className="ml-2 text-sm font-medium text-gray-700 min-w-[40px] text-right">
            {normalizedValue}%
          </span>
        )}
      </div>
    </div>
  );
};

export default Progress;