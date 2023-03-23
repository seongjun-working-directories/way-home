import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS } from '../api/status';

const tokenAuthentication = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const token = request.header('x-auth-token');
  if (!token) {
    // 토큰이 없을 경우
    return response.status(HTTP_STATUS['401'].CODE).json({
      error_messages:
        HTTP_STATUS['401'].comment + '. ' + HTTP_STATUS['401'].help,
    });
  } else {
    try {
      const user_email = await jwt.verify(
        token,
        'nfb32iur32ibfqfvi3vf932bg932g932'
      );
      // ERROR CODE : payload가 불러와지는지 확인해야 함
      request.body.email = user_email;
      next();
    } catch (err) {
      // 페이로드가 불러와지지 않는 경우
      return response.status(HTTP_STATUS['400'].CODE).json({
        error_messages:
          HTTP_STATUS['400'].comment + '. ' + HTTP_STATUS['400'].help,
      });
    }
  }
};

export { tokenAuthentication };
