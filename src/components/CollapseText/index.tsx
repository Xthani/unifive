import React, { useState, ReactNode } from 'react';
import './styles.scss';
import cn from 'classnames';

interface CustomCollapseProps {
  title: string;
  children: ReactNode;
}

const CustomCollapseText: React.FC<CustomCollapseProps> = ({
  title,
  children,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div
      className="custom-collapse-text"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="custom-collapse-text__header">
        <h2>{title}</h2>
      </div>
      <div
        className={cn('custom-collapse-text__content', {
          open,
        })}
      >
        {children}
      </div>
    </div>
  );
};

export default CustomCollapseText;
