import { SetStateAction } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { EllipsisGradientText } from '@components/common/EllipsisGradientText';
import Tooltip from '@components/common/tooltips/tooltip';

import RightArrow from '@public/image/techblog/angle-right-point1.svg';

import BookmarkIcon from './bookmarkIcon';

export const TechDetailInfo = ({
  company,
  author,
  date,
  isMobile,
}: {
  company: string;
  author: string;
  date: string;
  isMobile: boolean;
}) => {
  return (
    <div className='p1 flex border-white gap-[1.6rem] select-none'>
      <div>{company}</div>
      <span className='text-gray4'>|</span>
      <div>by. {author || company}</div>
      <span className='text-gray4'>|</span>
      <time dateTime={date}>{date}</time>
    </div>
  );
};

export const TechMainContent = ({ content, isMobile }: { content: string; isMobile: boolean }) => {
  return (
    <EllipsisGradientText
      startPercent='60%'
      endPercent='100%'
      className={`${isMobile ? 'p2 py-[5.6rem]' : 'p1 py-[1.7rem]'} `}
    >
      {content}
    </EllipsisGradientText>
  );
};

export const ArticleViewBtn = ({
  isMobile,
  techArticleUrl,
  fontSize = 'st1',
  textIconGap = 'mr-[1.6rem]',
  paddingY = 'pt-[6.4rem]',
  iconSize,
}: {
  isMobile: boolean;
  techArticleUrl: string;
  fontSize?: string;
  textIconGap?: string;
  paddingY?: string;
  iconSize?: string;
}) => {
  return (
    <button
      className={`w-full flex justify-center items-center ${fontSize} text-point1 ${paddingY} mb-[4.8rem] font-bold`}
    >
      <Link href={techArticleUrl} target='_blank'>
        <p className={`${textIconGap}`}>아티클 전체 보기</p>
      </Link>
      <Image src={RightArrow} alt='오른쪽화살표' className={`text-point1 ${iconSize}`} />
    </button>
  );
};

export const TechBookMarkAndToolTip = ({
  tooltipMessage,
  techArticleId,
  isBookmarkActive,
  setBookmarkActive,
  setTooltipMessage,
}: {
  tooltipMessage: string;
  techArticleId: string;
  isBookmarkActive: boolean;
  setBookmarkActive: React.Dispatch<SetStateAction<boolean>>;
  setTooltipMessage: React.Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className='grid grid-flow-row items-center gap-6 relative'>
      <Tooltip variant='greenTt' direction='right' isVisible={tooltipMessage !== ''}>
        {tooltipMessage}
      </Tooltip>
      <div className='p-[1rem]'>
        <BookmarkIcon
          id={Number(techArticleId)}
          tooltipMessage={tooltipMessage}
          isBookmarkActive={isBookmarkActive}
          setBookmarkActive={setBookmarkActive}
          setTooltipMessage={setTooltipMessage}
        />
      </div>
    </div>
  );
};
