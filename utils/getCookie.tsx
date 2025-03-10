import { MAX_RETRIES, RETRY_INTERVAL } from '@/constants/getCookieConstants';

/** 쿠키의 key값을 입력하면 value값을 리턴해주는 함수 */
export function getCookie(key: string) {
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    const [cookieName, cookieValue] = cookie.split('=');

    if (cookieName === key) {
      return decodeURIComponent(cookieValue);
    }
  }

  return null;
}

/** 로그인 성공 관련 쿠키값을 체크하고, 상태값을 리턴해주는 함수
 *
 * 로그인 성공 시 'active'를 반환
 * 로그인 체크 중일 때는 'checking'을 반환
 */
export const checkLogin = (): 'checking' | 'active' => {
  const loginSuccess = getCookie('DEVDEVDEV_LOGIN_STATUS');
  if (loginSuccess === 'active') {
    return loginSuccess;
  }
  return 'checking';
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** GA 쿠키를 가져오는 비동기 함수*/
export const getGA = async (): Promise<string | undefined> => {
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    const GA = getCookie('_ga');

    if (GA) {
      return GA;
    }

    await wait(RETRY_INTERVAL); // 시간지연을 위함
  }

  console.error('Failed to get GA cookie after maximum retries');
  return undefined; // 적절한 실패 처리
};
