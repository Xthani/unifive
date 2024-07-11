import React, { useState, ReactNode, useEffect, useRef } from 'react';
// @ts-ignore
import MinusOutlined from '@assets/activity/minus.svg';
// @ts-ignore
import PlusOutlined from '@assets/activity/plus.svg';

import './styles.scss';

interface CustomCollapseProps {
  title: string;
  children: ReactNode;
  isOpen: boolean;
  onClick: () => void;
}

const CustomCollapse: React.FC<CustomCollapseProps> = ({
  title,
  children,
  isOpen,
  onClick,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<string | number>('0px');

  useEffect(() => {
    setHeight(isOpen ? `${contentRef.current?.scrollHeight}px` : '0px');
  }, [isOpen]);

  return (
    <div className="custom-collapse">
      <div className="custom-collapse__header" onClick={onClick}>
        <h2>{title}</h2>
        {isOpen ? (
          <img src={MinusOutlined} alt="-" />
        ) : (
          <img src={PlusOutlined} alt="+" />
        )}
      </div>
      <div
        className="custom-collapse__content-wrapper"
        style={{ maxHeight: height, transition: 'max-height 0.5s ease' }}
      >
        <div ref={contentRef} className="custom-collapse__content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CustomCollapse;
