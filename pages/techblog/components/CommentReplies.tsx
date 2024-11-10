import { useState } from 'react';

import Image from 'next/image';

import useIsMobile from '@hooks/useIsMobile';

import downArrow from '@public/image/down-arrow-green.svg';
import upArrow from '@public/image/up-arrow-green.svg';

import { RepliesProps } from '../types/techCommentsType';
import Comment from './Comment';

export default function CommentReplies({
  replies,
  articleId,
  originParentTechCommentId,
  isBestComment,
}: {
  replies: RepliesProps[];
  articleId: number;
  originParentTechCommentId: number;
  isBestComment: boolean;
}) {
  const isMobile = useIsMobile();
  const repliesLen = replies?.length;

  // 댓글 접기
  const [isCommentOpen, setIsCommentOpen] = useState(isBestComment ? false : true);
  const handleOpenComments = () => {
    setIsCommentOpen(!isCommentOpen);
    if (isCommentOpen) {
      setMoreComments(false);
    }
  };

  // 댓글 더보기
  const [moreComments, setMoreComments] = useState(false);
  const handleMoreComments = () => {
    setMoreComments(!moreComments);
  };

  const renderComments = (comments: RepliesProps[]) =>
    comments.map((subComment) => (
      <Comment
        key={subComment.techCommentId}
        articleId={articleId}
        techCommentId={subComment.techCommentId}
        isRecommended={subComment.isRecommended}
        recommendTotalCount={subComment.recommendTotalCount}
        isSubComment={true}
        createdAt={subComment.createdAt}
        author={subComment.author}
        maskedEmail={subComment.maskedEmail}
        comment={subComment.contents}
        isCommentAuthor={subComment.isCommentAuthor}
        isDeleted={subComment.isDeleted}
        isModified={subComment.isModified}
        techParentCommentId={subComment.techParentCommentId}
        techParentCommentMemberId={subComment.techParentCommentMemberId}
        techParentCommentAuthor={subComment.techParentCommentAuthor}
        techOriginParentCommentId={subComment.techOriginParentCommentId}
      />
    ));

  return (
    <>
      {/* 댓글 접기&열기 버튼 */}
      {repliesLen > 0 && (
        <button
          className={`w-full flex items-center gap-3 p2 font-bold text-point1 h-[5.6rem] ${isMobile ? 'ml-[1.6rem]' : 'ml-[3.2rem]'}  `}
          onClick={handleOpenComments}
        >
          {`댓글 ${repliesLen}개`}
          <Image
            src={isCommentOpen ? downArrow : upArrow}
            alt={isCommentOpen ? '아래화살표아이콘' : '위화살표아이콘'}
          />
        </button>
      )}

      {isCommentOpen && (
        <>
          {/* 기본 5개 보여주는 댓글 */}
          {renderComments(replies.slice(0, 5))}

          {/* 더보기 버튼 */}
          {!moreComments && repliesLen > 5 && (
            <button onClick={handleMoreComments} className='p2 font-bold text-[#00D649] p-[3.2rem]'>
              댓글 전체 보기 +
            </button>
          )}

          {/* 나머지 댓글 */}
          {moreComments && renderComments(replies.slice(5))}
        </>
      )}
    </>
  );
}
