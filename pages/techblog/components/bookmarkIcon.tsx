import { useEffect, useState } from 'react';

import Image from 'next/image';

import { useQueryClient } from '@tanstack/react-query';

import { useToastVisibleStore } from '@stores/toastVisibleStore';

import bookmarkActive from '@public/image/techblog/bookmarkActive.svg';
import bookmarkNonActive from '@public/image/techblog/bookmarkNonActive.svg';

import { usePostBookmarkStatus } from '../api/usePostBookmarkStatus';
import useClickCounter from '../hooks/useClickCounter';

const BookmarkIcon = ({
  id,
  tooltipMessage,
  isBookmarkActive,
  setBookmarkActive,
  setTooltipMessage,
  type,
}: {
  id: number;
  tooltipMessage: string;
  isBookmarkActive: boolean;
  setBookmarkActive: React.Dispatch<React.SetStateAction<boolean>>;
  setTooltipMessage: React.Dispatch<React.SetStateAction<string>>;
  type: 'main' | 'techblog' | 'myinfo';
}) => {
  const queryClient = useQueryClient();
  const { setToastVisible } = useToastVisibleStore();

  const CLICK_IGNORE_TIME = 3 * 1000;
  const BOOKMARK_CLICK_MAX_CNT = 10;
  const { mutate: bookmarkMutation } = usePostBookmarkStatus();
  const [clickCount, setClickCount] = useClickCounter({
    maxCount: BOOKMARK_CLICK_MAX_CNT,
    threshold: 1000,
  });

  const [isIgnoreClick, setIsIgnoreClick] = useState(false);

  useEffect(() => {
    setBookmarkActive(isBookmarkActive);
  }, [isBookmarkActive]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const hideTooltipAfterDelay = () => {
      timeoutId = setTimeout(() => {
        setTooltipMessage('');
      }, 2 * 1000);
    };
    if (tooltipMessage !== '') {
      hideTooltipAfterDelay();
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isBookmarkActive, tooltipMessage]);

  useEffect(() => {
    let ignoreTimer: NodeJS.Timeout;

    const ignoreCilckEvent = () => {
      ignoreTimer = setTimeout(() => {
        setIsIgnoreClick(false);
      }, CLICK_IGNORE_TIME);

      return () => {
        clearTimeout(ignoreTimer);
      };
    };

    if (clickCount >= BOOKMARK_CLICK_MAX_CNT) {
      setIsIgnoreClick(true);
      ignoreCilckEvent();
    }
  }, [clickCount]);

  /** type에 따라 북마크 상태값을 업데이트 해주는 함수 */
  const handleBookmarkClick = async ({
    id,
    isBookmarkActive,
    type,
  }: {
    id: number;
    isBookmarkActive: boolean;
    type: 'myinfo' | 'techblog' | 'main';
  }) => {
    if (isIgnoreClick) {
      return;
    }
    setClickCount((prev) => prev + 1);

    bookmarkMutation(
      {
        techArticleId: id,
        status: !isBookmarkActive,
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: ['techBlogData'] });
          await queryClient.invalidateQueries({ queryKey: ['techDetail', String(id)] });
          await queryClient.invalidateQueries({ queryKey: ['techBlogBookmark'] });

          if (type === 'techblog') {
            setBookmarkActive((prev) => !prev);
            setTooltipMessage(isBookmarkActive ? '북마크에서 삭제했어요' : '북마크로 저장했어요');
          } else if (type === 'myinfo') {
            setToastVisible('북마크에서 삭제했어요');
          }
        },
      },
    );
  };
  return (
    <Image
      width={15}
      height={16}
      src={isBookmarkActive ? bookmarkActive : bookmarkNonActive}
      className='cursor-pointer'
      onClick={async () => {
        await handleBookmarkClick({
          type: type,
          id: id,
          isBookmarkActive: isBookmarkActive,
        });
      }}
      alt={isBookmarkActive ? '북마크아이콘' : '북마크취소아이콘'}
    />
  );
};

export default BookmarkIcon;
