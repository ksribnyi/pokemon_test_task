import React from 'react';

interface BadgeProps {
  value: string;
  markCircle?: boolean;
  markX?: boolean;
  color:
    | 'gray'
    | 'red'
    | 'green'
    | 'blue'
    | 'yellow'
    | 'purple'
    | 'pink'
    | 'orange'
    | 'violet'
    | 'black';
  handleClick?: (item: string) => void;
  rounded?: 'rounded-full' | 'rounded-md';
}

const colorClasses: Record<string, { bg: string; text: string }> = {
  gray: { bg: 'gray-200', text: 'gray-800' },
  red: { bg: 'red-100', text: 'red-800' },
  green: { bg: 'green-100', text: 'green-800' },
  blue: { bg: 'blue-100', text: 'blue-800' },
  yellow: { bg: 'yellow-100', text: 'yellow-800' },
  purple: { bg: 'purple-100', text: 'purple-800' },
  pink: { bg: 'pink-100', text: 'pink-800' },
  orange: { bg: 'orange-100', text: 'orange-800' },
  violet: { bg: 'violet-100', text: 'violet-800' },
  black: { bg: 'gray-600', text: 'white' },
};

const Badge: React.FC<BadgeProps> = ({
  value,
  markCircle,
  markX,
  color,
  handleClick,
  rounded = 'rounded-full',
}) => {
  return (
    <div
      className={`flex items-center justify-center gap-1 width-fit height-fit px-2.5 py-0.5 ${rounded} text-xs bg-${colorClasses[color].bg} text-${colorClasses[color].text}`}
    >
      {markCircle && (
        <div
          className={`h-1.75 w-1.75 bg-${colorClasses[color].text} rounded-full leading-4`}
        />
      )}
      <span>{value}</span>
      {markX && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4 cursor-pointer"
          onClick={() => handleClick?.(value)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      )}
    </div>
  );
};

export default Badge;
