export type User = {
  user_name: string;
  user_email: string;
  user_password: string;
  user_mobile: string;
  user_privacyPolicy: boolean;
  user_advertisePolicy: boolean;
  user_date: Date;
};

export type Article = {
  article_id: number;
  article_title: string;
  article_author: string; // user_email
  article_content: string;
  article_date: Date;
};

export type Board = {
  board_id: number;
  board_title: string;
  board_author: string;
  board_content: string;
  board_date: string;
  board_routeNm: string;
  board_svarNm: string;
};
