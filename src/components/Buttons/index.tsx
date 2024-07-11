import React, { FC, RefObject, useState } from 'react';
import cn from 'classnames';

// eslint-disable-next-line
// @ts-ignore
import ArrowRight from '@assets/projects/arrow-right.svg';
// @ts-ignore
import Arrow from '@assets/projects/arrow.svg';

import './styles.scss';

interface Props {
  /**
   * Общее количество карточек в слайдере.
   */
  totalCards: number;
  /**
   * Ссылка на элемент слайдера.
   */
  sliderRef: RefObject<HTMLDivElement>;
  /**
   * Ширина одной карточки плюс отступ между карточками.
   */
  scrollWidth: number;
  variant?: 'slider' | 'comment';
  onScroll?: (index: number) => void;
}


const Buttons: FC<Props> = ({
  totalCards,
  sliderRef,
  scrollWidth,
  variant = 'slider',
  onScroll,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  /**
   * Прокрутка слайдера в указанном направлении.
   *
   * @param direction Направление прокрутки ('left' или 'right').
   */
  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const maxIndex = totalCards - Math.floor(clientWidth / scrollWidth);

      const newIndex =
        direction === 'left'
          ? Math.max(currentIndex - 1, 0)
          : Math.min(currentIndex + 1, maxIndex);

      // Прокручиваем на ширину одной карточки с учетом отступа
      const scrollTo = newIndex * scrollWidth;
      sliderRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });

      setCurrentIndex(newIndex);
      onScroll && onScroll(newIndex);
    }
  };

  return (
    <div className="projects-head__btn">
      <button
        className={cn('projects-head__btn-button', {
          active: currentIndex > 0 && variant === 'slider',
          'active-comment': currentIndex > 0 && variant === 'comment',
          'btn-comment': variant === 'comment',
        })}
        onClick={() => scroll('left')}
        disabled={currentIndex === 0}
      >
        {currentIndex > 0 ? (
          <img
            src={variant === 'slider' ? ArrowRight : Arrow}
            alt="←"
            className={variant === 'slider' ? 'arrow-right' : 'arrow-left'}
          />
        ) : (
          <img
            src={variant === 'slider' ? Arrow : ArrowRight}
            alt="←"
            className={variant === 'slider' ? 'arrow-left' : 'arrow-right'}
          />
        )}
      </button>
      <div
        className={cn('count', {
          'count-color': variant === 'comment',
        })}
      >
        <span>{String(currentIndex + 1).padStart(2, '0')}</span>
        <span
          className={cn({
            'count-second': variant === 'slider',
            'count-second-2': variant === 'comment',
          })}
        >
          /{String(totalCards).padStart(2, '0')}
        </span>
      </div>
      <button
        className={cn('projects-head__btn-button', {
          active: currentIndex < totalCards - 1 && variant === 'slider',
          'active-comment':
            currentIndex < totalCards - 1 && variant === 'comment',
          'btn-comment': variant === 'comment',
        })}
        onClick={() => scroll('right')}
        disabled={currentIndex === totalCards - 1}
      >
        {currentIndex < totalCards - 1 ? (
          <img
            src={variant === 'slider' ? ArrowRight : Arrow}
            alt="→"
            className={variant === 'slider' ? 'arrow-left' : 'arrow-right'}
          />
        ) : (
          <img
            src={variant === 'slider' ? Arrow : ArrowRight}
            alt="→"
            className={variant === 'slider' ? 'arrow-right' : 'arrow-left'}
          />
        )}
      </button>
    </div>
  );
};

export default Buttons;
