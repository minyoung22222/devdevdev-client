import React from 'react';

import { useSearchKeywordStore } from '@stores/techBlogStore';

import { MainButton } from '@components/buttons/mainButtons';

import ArrowLeft from '@public/image/techblog/angle-left-white.svg.svg';

export default function SearchNotFound() {
  const { searchKeyword, setSearchKeyword } = useSearchKeywordStore();
  const handleOnClick = () => {
    setSearchKeyword('');
  };
  return (
    <div className='flex flex-col justify-center items-center gap-[3.2rem] pt-[6rem]'>
      <span className='text-[6.4rem] inline-block'>😭</span>
      <p className='h1 font-bold'> 죄송해요. 찾을 수가 없어요.</p>
      <p className='p1 mb-[3.2rem]'>
        &apos;<span className='text-point1'>{searchKeyword}</span>&apos;에 대한 검색결과가 없어요.
      </p>

      <MainButton
        text=' 처음으로 돌아가기'
        icon={<ArrowLeft />}
        variant='primary'
        onClick={handleOnClick}
      />
    </div>
  );
}
