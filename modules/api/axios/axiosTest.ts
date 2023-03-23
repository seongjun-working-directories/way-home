/*
import axios, { AxiosRequestConfig } from 'axios';
import type { User, Article } from '../../../dev-back/src/mongodb/types'

const axiosConfig: AxiosRequestConfig = {
  baseURL: 'BASE_URL'
};
const client = axios.create(axiosConfig);

// 회원가입
async function axiosSignUp(user: User) {
  return await client.post('/signup', user);
};

// 로그인
async function axiosSignIn() {
  return await client.post('/signin', {

  });
}

// (테스트)모든 유저 불러오기
async function axiosAllUsers() {
  return await client.get('/allUsers');
}

// 게시글 전부 가져오기
async function axiosArticles() {
  return await client.get('/articles');
}

// 게시글 작성자별로 가져오기
async function axiosArticleByAuthor(author: string) {
  return await client.get(`/article?${author}`);
}

// 게시글 일련번호로 가져오기
async function axiosArticleById(article_id: string) {
  return await client.get(`/article?${article_id}`);
}

// 내가 작성한 게시글 가져오기
// async function axiosMyArticle() {
//   return await client.get('/myarticles');
// }

export {
  axiosSignUp,
  axiosSignIn,
  axiosAllUsers,
  axiosArticles,
  axiosArticleByAuthor,
  axiosArticleById,
  // axiosMyArtcle
};
*/