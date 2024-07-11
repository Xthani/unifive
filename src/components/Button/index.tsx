import React, { FC } from 'react';
import cn from 'classnames';

// @ts-ignore
import ArrowRight from '@assets/news/arrow-right.svg';
// @ts-ignore
import ArrowTop from '@assets/news/arrow-top.svg';

import './styles.scss';

interface Props {
  hover?: boolean;
}

const Button: FC<Props> = ({ hover = false }) => {
  return (
    <button
      className={cn('custom-button', {
        'custom-button__black': hover,
      })}
    >
      {hover ? (
        <img src={ArrowTop} alt="→" />
      ) : (
        <img src={ArrowRight} alt="→" />
      )}
    </button>
  );
};

export default Button;
