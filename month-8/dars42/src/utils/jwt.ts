import jwt from 'jsonwebtoken'

export default {
  sign: (payload:object) => jwt.sign(payload, 'olma'),
  verify: (token:string) => jwt.verify(token, 'olma'),
};
