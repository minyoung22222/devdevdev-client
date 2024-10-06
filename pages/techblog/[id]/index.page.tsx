import React, { useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useQueryClient } from '@tanstack/react-query';

import DevLoadingComponent from '@pages/loading/index.page';

import { useToastVisibleStore } from '@stores/toastVisibleStore';

import useIsMobile from '@hooks/useIsMobile';

import { MainButton } from '@components/common/buttons/mainButtons';
import WritableComment from '@components/common/comment/WritableComment';
import MobileToListButton from '@components/common/mobile/mobileToListButton';

import HandRight from '@public/image/hand-right.svg';

import { ROUTES } from '@/constants/routes';

import { useGetDetailTechBlog } from '../api/useGetTechBlogDetail';
import { usePostBookmarkStatus } from '../api/usePostBookmarkStatus';
import { usePostMainComment } from '../api/usePostComment';
import CommentTechSection from '../components/CommentTechSection';
import TechDetailCard from '../components/techDetailCard';
import { TechCardProps } from '../types/techBlogType';

const CompanyTitle = ({
  title,
  content1,
  content2,
}: {
  title: string;
  content1: string;
  content2: string;
}) => {
  const isMobile = useIsMobile();
  return (
    <div className={`${isMobile ? 'st2 flex flex-col items-center' : 'st1'}`}>
      <p>
        <span className='text-point1 font-bold'>{title}</span>
        {content1}
      </p>
      <p>{content2}</p>
    </div>
  );
};

export default function Page() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const techArticleId = router.query.id as string | undefined;
  const { setToastInvisible } = useToastVisibleStore();

  const isMobile = useIsMobile();

  useEffect(() => {
    setToastInvisible();
  }, []);

  const { data, status } = useGetDetailTechBlog(techArticleId);
  const { mutate: commentMutation } = usePostMainComment();

  const handleSubmitClick = (contents: string) => {
    commentMutation(
      {
        techArticleId: Number(techArticleId),
        contents: contents,
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: ['techBlogComments'] });
        },
      },
    );
  };

  const getStatusComponent = (
    CurDetailTechBlogData: TechCardProps | undefined,
    status: 'success' | 'error' | 'pending',
  ) => {
    if (!techArticleId) {
      return <></>;
    }

    switch (status) {
      case 'pending':
        return <DevLoadingComponent />;

      case 'success':
        if (!CurDetailTechBlogData) return;
        const { company } = CurDetailTechBlogData;
        const TechCareerBaseStyle = 'flex py-[3.1rem] border border-gray2 rounded-[1.6rem]';
        const TechCareerMobileStyle = `flex-col gap-9 px-[2.4rem] mb-[2.7rem] items-center`;
        const TechCareerDesktopStyle = `flex-row items-center justify-between px-[3.2rem]`;
        return (
          <article className={isMobile ? 'px-[1.6rem] pb-[6.4rem]' : 'px-[20.4rem] py-[6.4rem]'}>
            <TechDetailCard techDetailProps={CurDetailTechBlogData} techArticleId={techArticleId} />
            <section
              className={`${TechCareerBaseStyle} ${isMobile ? TechCareerMobileStyle : TechCareerDesktopStyle}`}
            >
              <CompanyTitle
                title={company.name}
                content1=' 절찬리 채용중! '
                content2='확인하러
                가볼까요?'
              />
              <Link href={company.careerUrl} target='_blank'>
                <MainButton
                  text='채용정보 보러가기'
                  variant='primary'
                  icon={<Image src={HandRight} alt='오른쪽 손가락 아이콘' />}
                />
              </Link>
            </section>
            {isMobile && <MobileToListButton route={ROUTES.TECH_BLOG} />}

            {/* 댓글 */}

            <p className='p1 mt-[12.8rem]'>
              <span className='text-point3'>델리나</span>님 의견을 남겨주세요!
            </p>

            {/* 댓글작성 */}
            <div className='mt-[1.6rem] mb-[10rem]'>
              <WritableComment
                type='techblog'
                mode='register'
                handleSubmitClick={(contents: string) => handleSubmitClick(contents)}
              />
            </div>
            {/* 댓글들 */}
            <CommentTechSection articleId={techArticleId} />
          </article>
        );
      default:
        return <></>;
    }
  };

  return <>{getStatusComponent(data, status)}</>;
}
