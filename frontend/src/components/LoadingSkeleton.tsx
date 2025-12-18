import { cn } from '../lib/utils';

interface SkeletonProps {
  className?: string;
  count?: number;
  height?: string;
  width?: string;
  circle?: boolean;
}

export function LoadingSkeleton({
  className,
  count = 1,
  height = 'h-12',
  width = 'w-full',
  circle = false
}: SkeletonProps) {
  return (
    <>
      {Array(count).fill(0).map((_, i) => (
        <div
          key={i}
          className={cn(
            'animate-pulse rounded-2xl bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200',
            circle ? 'rounded-full' : 'rounded-xl',
            height,
            width,
            className
          )}
        />
      ))}
    </>
  );
}
