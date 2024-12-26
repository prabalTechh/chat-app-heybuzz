"use client";

import Link from "next/link";
import clsx from "clsx";

interface MobileItemProps {
  icon:any; 
  href: string;
  onClick?: () => void;
  active?: boolean;
}

const MobileItems: React.FC<MobileItemProps> = ({
  icon: Icon,
  href,
  onClick,
  active, 
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(); 
    }
  };

  return (
    <Link
      href={href}
      onClick={handleClick} 
      className={clsx(
        `group flex gap-x-3 text-sm leading-6 w-full font-semibold justify-center p-4 text-gray-500 hover:text-black hover:bg-gray-100`,
        active && "bg-gray-100 text-black" 
      )}
    >
      <Icon className="h-6 w-6" /> 
    </Link>
  );
};

export default MobileItems;
