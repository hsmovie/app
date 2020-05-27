import jwt from 'jsonwebtoken';

const { JWT_SECRET: secret } = process.env;

export const generate = (payload, options) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      secret,
      {
        issuer: 'etf.com',
        expiresIn: '7d',
        ...options,
      },
      (e, token) => {
        if (e) {
          reject(e);
        }
        resolve(token);
      }
    );
  });
};

export const decode = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (e, decode) => {
      if (e) reject(e);
      resolve(decode);
    });
  });
};
