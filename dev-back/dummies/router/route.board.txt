import express from 'express';
import type { Request, Response } from 'express';
import jwt_decode from 'jwt-decode';
import type { Board } from '../mongodb/types';
import { createBoard } from '../mongodb/modules/create';

const router = express.Router();

router.post('/createBoard', async (req: Request, res: Response) => {
  const {
    title, author, content, date, routeNm, svarNm,
  } = req.body;

  const decodedAuthor: any = await jwt_decode(author);
  const authorEmail: string = decodedAuthor.email;

  const board: Board = {
    board_id: 0,
    board_title: title,
    board_author: authorEmail,
    board_content: content,
    board_date: date,
    board_routeNm: routeNm,
    board_svarNm: svarNm
  };

  const result = await createBoard(board);

  // [TEST]
  console.log(result);

  return res.status(200).json({
    result,
  });
});

export { router };