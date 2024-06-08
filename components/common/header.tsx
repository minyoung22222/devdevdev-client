import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import getUserInfoFromLocalStorage from '@utils/getUserInfo';

import { useLoginStatusStore } from '@stores/loginStore';
import { useLoginModalStore } from '@stores/modalStore';
import { useCompanyIdStore, useSearchKeywordStore } from '@stores/techBlogStore';

import DevLogo from '@public/image/devdevdevLogo.svg';

export default function Header() {
  const router = useRouter();

  const { openModal } = useLoginModalStore();
  const { loginStatus, setLoginStatus, setLogoutStatus } = useLoginStatusStore();
  const { setSearchKeyword } = useSearchKeywordStore();
  const { setCompanyId } = useCompanyIdStore();

  const [userNickname, setUserNickName] = useState('');

  useEffect(() => {
    const userInfo = getUserInfoFromLocalStorage();

    if (userInfo) {
      const JWT_TOKEN = userInfo.accessToken;
      const USER_NICKNAME = userInfo.nickname;

      setUserNickName(USER_NICKNAME ?? '');
      JWT_TOKEN ? setLoginStatus() : setLogoutStatus();
    }
  }, [setLoginStatus, setLogoutStatus]);

  const handleClickMyinfo = (tabName: string): void => {
    if (loginStatus === 'login') {
      router.push(`/${tabName}`);
    } else {
      openModal();
    }
  };

  const refreshTechArticleParams = () => {
    setSearchKeyword('');
    setCompanyId(undefined);
  };

  return (
    <>
      <header
        className='bg-gray1 w-full flex flex-row justify-between items-center px-[9.8rem] text-p1'
        style={{
          borderBottom: '1px solid #DEE5ED',
        }}
      >
        <Image
          src={DevLogo}
          priority
          alt='devdevdev로고'
          className='cursor-pointer'
          onClick={() => router.push('/')}
        />
        <ul className='text-white flex flex-row items-center gap-[4.8rem] font-bold'>
          <li>
            <Link href='/pickpickpick'>픽픽픽 💖</Link>
          </li>
          <li>
            <Link href='/techblog' onClick={refreshTechArticleParams}>
              기술블로그 🧪
            </Link>
          </li>
          <li>
            <button onClick={() => handleClickMyinfo('myinfo')}>내정보 🧀</button>
          </li>
          {loginStatus === 'login' && (
            <li className='leading-[4.8rem]'>
              <span className='text-center text-point1 '>{userNickname}</span>님
            </li>
          )}
          <li>
            <button
              className='bg-primary1 text-center px-[2rem] py-[1.2rem] rounded-full'
              onClick={openModal}
            >
              {loginStatus === 'login' ? '로그아웃' : '로그인'}
            </button>
          </li>
        </ul>
      </header>
    </>
  );
}
