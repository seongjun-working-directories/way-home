import express from 'express';
import type { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';
import bcrypt from 'bcrypt';
import { findUser } from '../mongodb/modules/read';
// import { findAllUsers } from '../mongodb/modules/read';
import { createUser } from '../mongodb/modules/create';
import type { User } from '../mongodb/types';

const router = express.Router();

// 회원가입
router.post(
  '/signup',
  [
    check('email', 'Check out your email...').isEmail(),
    check('password', 'Password should be at least 6 characters...').isLength({
      min: 6,
    }),
  ],

  async (req: Request, res: Response) => {
    const {
      email, password, name, mobile, privacyPolicy, advertisePolicy
    } = req.body;

    // [TEST] console.log(req.body);
    // [TEST] console.log(password.length);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(409).json({
        errors: errors.array(),
      });
    }

    // 이미 존재하는 아이디인지 확인
    const user = await findUser(email);

    if (user) {
      return res.status(409).json({
        errors: [
          {
            msg: `You already have account...`,
          },
        ],
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const data = await createUser({
      user_email: email,
      user_password: hash,
      user_name: name,
      user_mobile: mobile,
      user_privacyPolicy: privacyPolicy,
      user_advertisePolicy: advertisePolicy,
    } as User);

    // const token = await jwt.sign(
    //   { email },
    //   'nfb32iur32ibfqfvi3vf932bg932g932',
    //   { expiresIn: 360000 }
    // );

    return res.status(200).json({
      data,
    });
  }
);

// 로그인
router.post('/signin', async (req: Request, res: Response) => {
  const { email, password, loginState } = req.body;
  console.log(email, password, loginState);

  const user = await findUser(email);

  if (!user) {
    return res.status(409).json({
      errors: [
        {
          msg: `Please check your email again`,
        },
      ],
    });
  }

  const isMatch = await bcrypt.compare(password, user.user_password);

  if (!isMatch) {
    return res.status(408).json({
      errors: [
        {
          msgs: `Please check your password again`,
        },
      ],
    });
  }

  const token = await jwt.sign({ email }, 'nfb32iur32ibfqfvi3vf932bg932g932', {
    expiresIn: 360000,
  });

  return res.status(200).json({
    token,
  });
});

// 토큰 인증
router.post('/checktoken', async (req: Request, res: Response) => {
  const { token } = req.body;
  // [TEST] console.log(token);

  if (!token) {
    return res.status(410).json({
      errors: [
        {
          msg: `Unauthorized access...`
        }
      ]
    });
  }

  try {
    const decodedToken: any = await jwt_decode(token);
    // [TEST] console.log(decodedToken);

    const userEmail: string = decodedToken.email;

    const userInfo: any = await findUser(userEmail);

    const email = userInfo.user_email;
    const name = userInfo.user_name;

    const result = { email, name };

    return res.status(200).json({
      result,
    });
  }
  catch (err) {
    return res.status(410).json({
      errors: [
        {
          msg: `Unauthorized access...`
        }
      ]
    });
  }
});

/* [TEST]
router.get('/allUsers', async (req: Request, res: Response) => {
  console.log(1);

  const result = await findAllUsers();

  return res.status(201).json({
    result,
  });
});
*/

export { router };
