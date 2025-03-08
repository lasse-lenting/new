import React from "react";

interface MainContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function MainContainer({
  children,
  className = "",
}: MainContainerProps) {
  return (
    <div className={`container mx-auto max-w-[1200px] px-4 ${className}`}>
      {children}
    </div>
  );
}
