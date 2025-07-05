interface IconProps {
  className?: string;
}

export const ChevronDownIcon: React.FC<IconProps> = ({ className }) => (
  <svg 
    className={className}
    width="24" 
    height="24" 
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* ... содержимое SVG */}
  </svg>
); 