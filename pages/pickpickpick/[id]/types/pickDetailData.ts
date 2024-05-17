export interface PickDetailData {
  userId: string; //"댑댑이",
  nickname: string; // "댑댑이_User",
  pickCreatedAt: string; //"2024-04-15 18:25:01",
  pickTitle: string; //"불닭보끔면 짱 마싯음 ㅇㅈ?",
  isMemberPick: boolean; //true,
  pickOptions: {
    firstPickOption: pickOptionData;
    secondPickOption: pickOptionData;
  };
}

export interface pickOptionData {
  id: number; //216,
  title: string; //"ㅇㅈ",
  isPicked: boolean; //false,
  percent: number; //0,
  content: string; //"무조건 마싯지 몬소리",
  voteTotalCount: number; //0,
  pickDetailOptionImages: [
    {
      id: number; //131,
      imageUrl: string; //"https://devdevdev-storage.s3.ap-northeast-2.amazonaws.com/test/pickpickpick/47f0e20f-48f4-4ff5-826a-94a4229c58cb-Ex-kIt8UUAAWy3n.jpg"
    },
    {
      id: number; //132,
      imageUrl: string; //"https://devdevdev-storage.s3.ap-northeast-2.amazonaws.com/test/pickpickpick/f4578e7f-e792-4d9f-bd6c-b8da75504f53-IMG_0274.jpeg"
    },
  ];
}
