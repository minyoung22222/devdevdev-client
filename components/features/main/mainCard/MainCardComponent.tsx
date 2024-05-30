import React, { useEffect, useState } from 'react';

import Tooltip from '@components/common/tooltips/tooltip';

import { MAINCARD_CONSTANT, TOOLTIP_DATA } from '@/constants/MainCardConstants';

import { MainCardLink, MainCardText } from './CardSemiComponent';

export default function MainCardComponent({ path }: { path: '/pickpickpick' | '/techblog' }) {
  const type = path === '/pickpickpick' ? 'pick' : 'tech';

  const paragraph = type === 'pick' ? MAINCARD_CONSTANT.PICK : MAINCARD_CONSTANT.TECH;
  const TootipColor = type === 'pick' ? 'purpleTt' : 'greenTt';
  const tooltipData = type === 'pick' ? TOOLTIP_DATA.PICK : TOOLTIP_DATA.TECH;

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className='w-full h-[51.8rem] px-[4rem] py-[8.8rem] rounded-3xl text-white'
      style={{ backgroundColor: 'rgba(41,42,46, 0.5)' }}
    >
      <div className='mb-[5rem] c1'>
        {tooltipData.map((tooltip) => (
          <div key={tooltip.key} className='relative' style={{ top: `${tooltip.top}px` }}>
            <Tooltip
              variant={TootipColor}
              direction='left'
              isVisible={isVisible}
              style={{ left: 0 }}
            >
              {tooltip.text}
            </Tooltip>
          </div>
        ))}
      </div>

      <div className='st1 px-4 relative top-48'>
        <MainCardText paragraph1={paragraph[0]} paragraph2={paragraph[1]} />
        <MainCardLink path={path} />
      </div>
    </div>
  );
}
