import type { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
  bgColor?: string;
  width?: string;
  bodyClassName?: string;
}

export const PageLayout = ({
  children,
  bgColor = '#F0F8FF',
  width = 'w-5/6',
  bodyClassName = '',
}: IProps) => {
  return (
    <div style={{ backgroundColor: bgColor }} className="flex justify-center py-6">
      <div className={`flex flex-col gap-4 ${width} ${bodyClassName}`}>{children}</div>
    </div>
  );
};
