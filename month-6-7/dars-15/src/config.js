import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 5000

const accessLogStream = fs.createWriteStream(
  path.join(process.cwd(), 'access.log'),
  { flags: 'a' }
);

process.env.EXP = '7h'

process.DEFAULT = {}
process.DEFAULT.pagination = {}
process.DEFAULT.pagination.page = 1
process.DEFAULT.pagination.limit = 5


export {
  PORT,
  accessLogStream
}