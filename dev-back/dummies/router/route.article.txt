import express from 'express';
import type { Request, Response } from 'express';
import { userAuthentication } from '../middleware/userAuthentication';
import { findArticleByArticleId, findArticleByUser, findAllArticles, findHiwaySvarInfoOnlySvar } from '../mongodb/modules/read';

const router = express.Router();

// 게시글 전부 가져오기
router.get('/articles', async (req: Request, res: Response) => {
  const result = await findAllArticles();

  if (!result) {
    return res.status(407).json({
      errors: [
        { msg: `No Such Article...` }
      ],
    });
  }

  return res.status(200).json({
    result
  });
});

// 게시글 작성자별로 가져오기
router.get('/article/:author', async (req: Request, res: Response) => {
  const article_author = req.body.author;

  const result = await findArticleByUser(article_author);

  if (!result) {
    return res.status(407).json({
      errors: [
        { msg: `No Such Article...` }
      ],
    });
  }

  return res.status(200).json({
    result
  });
});

// 게시글 일련번호로 가져오기
router.get('/article/:id', async (req: Request, res: Response) => {
  const article_id = req.body.id;

  const result = await findArticleByArticleId(article_id);

  if (!result) {
    return res.status(407).json({
      errors: [
        { msg: `No Such Article...` }
      ],
    });
  }

  // [TEST] console.log(req.user);

  return res.status(200).json({
    result
  });
});

// 내가 작성한 게시글 가져오기
router.get('/myarticles', userAuthentication, async (req: Request, res: Response) => {
  // [TEST]
  console.log(req.body.email);

  const result = await findArticleByUser(req.body.email);

  return res.status(200).json({
    result
  });
});

// 휴게소 가져오기
router.get('/svarInfos', async (req: Request, res: Response) => {
  console.log('svarInfos called!!');
  
  const result = await findHiwaySvarInfoOnlySvar();

  return res.status(200).json({
    result
  });
});

export { router };