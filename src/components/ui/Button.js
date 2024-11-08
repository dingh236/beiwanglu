import React from 'react';

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  ...props 
}) => {
  const variants = {
    primary: 'bg-violet-600 text-white hover:bg-violet-700',
    secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
    outline: 'border-2 border-violet-600 text-violet-600 hover:bg-violet-50'
  };
  
  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button 
      className={`${variants[variant]} ${sizes[size]} rounded-lg transition-colors duration-200`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
