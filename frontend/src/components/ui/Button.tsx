import { cn } from '../../lib/utils';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'destructive' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  ...props 
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        {
          // Variants
          'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-xl ring-blue-500/50':
            variant === 'primary',
          'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 ring-gray-500/50':
            variant === 'secondary',
          'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl ring-red-500/50':
            variant === 'destructive',
          'border border-gray-200 hover:bg-gray-50 hover:border-gray-300 ring-gray-500/50':
            variant === 'outline',
        },
        {
          // Sizes
          'h-9 px-4 py-2 text-sm': size === 'sm',
          'h-10 px-6 py-2 text-sm': size === 'md',
          'h-12 px-8 py-3 text-base': size === 'lg',
        },
        className
      )}
      {...props}
    />
  );
}
