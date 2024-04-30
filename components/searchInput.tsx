import React, { ChangeEvent, useEffect, useState } from 'react';

import { useSearchKeywordStore } from '@stores/techBlogStore';

import Search from '@public/image/techblog/search.svg';

const PointedText = ({ keyword, text }: { keyword: string; text: string }) => {
  return (
    <p className='text-p2 py-[1rem] w-full'>
      <span className='text-point1'>{keyword}</span> <span className='text-gray4'>{text}</span>
    </p>
  );
};

const NoMatchingKeywords = () => {
  return <p className='text-p2 py-[1rem] w-full text-gray4'>일치하는 키워드가 없어요</p>;
};

export default function SearchInput() {
  const { searchKeyword, setSearchKeyword } = useSearchKeywordStore();
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    if (searchKeyword === '') {
      setKeyword('');
    }
  }, [searchKeyword]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearchKeyword(keyword);
    }
  };

  const handleSearchBtn = () => {
    setSearchKeyword(keyword);
  };

  const handleKeywordChage = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    // TODO: 검색어 자동완성 기능
  };

  return (
    <div className='bg-gray2 rounded-[0.8rem] w-[28rem] px-[1.6rem]'>
      <div className='flex flex-row justify-between '>
        <input
          placeholder='키워드 검색을 해보세요'
          className='w-[21rem] py-[0.8rem] bg-gray2 text-white p2 focus:outline-none'
          value={keyword}
          onChange={handleKeywordChage}
          onKeyDown={handleKeyDown}
        />
        <button className='cursor-pointer' onClick={handleSearchBtn}>
          <Search alt='검색아이콘' />
        </button>
      </div>

      {/* <PointedText keyword='토스' text='프라임' />
      <PointedText keyword='토스' text='인슈런스' />
      <NoMatchingKeywords /> */}
    </div>
  );
}
