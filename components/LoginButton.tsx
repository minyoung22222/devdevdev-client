import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import { getCookie, checkLogin } from '@utils/getCookie';

import { useLoginStatusStore } from '@stores/loginStore';
import { useLoginModalStore } from '@stores/modalStore';

import KakaoLogo from '@public/image/kakao_icon.svg';

import { loginConfig, baseUrlConfig } from '@/config';

export default function LoginButton() {
  const router = useRouter();
  const { closeModal } = useLoginModalStore();
  const { setLoginStatus } = useLoginStatusStore();

  const URL = baseUrlConfig.serviceUrl || '';
  const END_PONIT = loginConfig.endPoint;
  const REDIRECT_URL = URL + END_PONIT;

  const handleOpenModal = () => {
    const newWindow = window.open(REDIRECT_URL, '_blank', 'width=400,height=550');

    if (newWindow) {
      // 새탭의 위치를 중앙으로 조정
      const screenWidth = window.screen.width;
      const screenHeight = window.screen.height;
      const left = (screenWidth - 400) / 2;
      const top = (screenHeight - 550) / 2;
      newWindow.moveTo(left, top);

      const intervalId = setInterval(() => {
        const loginStatus = checkLogin();

        if (loginStatus) {
          clearInterval(intervalId); // 폴링 중지
          newWindow.close(); // 새 창 닫기

          if (loginStatus === 'active') {
            console.log('로그인 성공');
            const accessToken = getCookie('DEVDEVDEV_ACCESS_TOKEN') as string;

            localStorage.setItem('accessToken', accessToken);
            setLoginStatus();

            router.reload();
          } else {
            console.log('로그인 실패');
            alert('다시 시도해주세요.');
          }
          closeModal();
        }
      }, 2 * 1000);
    }
  };

  return (
    <button
      onClick={handleOpenModal}
      className='bg-kakaoYellow text-black p2 p-[1.05rem] rounded-[0.8rem] flex items-center justify-center gap-[1rem] min-w-48 w-full'
      data-testid='kakaoButton'
    >
      <Image src={KakaoLogo} alt='카카오 로고' width={18} height={17} />
      카카오 로그인
    </button>
  );
}
