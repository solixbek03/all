import express, { Request, Response, Application } from "express";
import { Pool, PoolClient, QueryResultRow } from "pg";

const pool: Pool = new Pool ({
  user: 'fire',
  password: 'asd',
  host: 'localhost',
  database: 'homework41',
  port: 5432
})


async function fetchAll<T extends QueryResultRow> (SQL: string, porams: any[] = []): Promise<T[] | undefined> {
  const client: PoolClient = await pool.connect()
  try {
    const {rows} = await client.query<T>(SQL, porams) 
    return rows
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log('db error', error.message);
      throw error
    }
  }finally {
    client.release()
  }
}


const app: Application = express()

app.use(express.json());


interface User {
  username: string
  password: string
  gander:string
  age: number
}

app.get('/users', async (req: Request, res: Response) => {
  const users = await fetchAll<User>('SELECT * FROM users;')
  res.send(users)
})

app.post('/register', async (req: Request, res: Response) => {
  const {username, password, gander, age} = req.body
  const users = await fetchAll<User>(
    `insert into users(username, password, gander, age) values($1, $2, $3, $4) returning *;`
  , [username, password, gander, age])
  res.send(users)
})

app.put('/users/:id', async (req: Request, res: Response) => {
  const {username} = req.body
  const {id} = req.params
  const users = await fetchAll<User>(
    ` update users
        Set username = $2
        where id = $1
        `
  , [id,username])
  res.send(users)
})

app.delete('/users/:id', async (req: Request, res: Response) => {
  const {id} = req.params
  const users = await fetchAll<User>(
    ` delete from users
        where id = $1
        `
  , [id])
  res.send(users)
})


app.listen(5000, () => console.log('*5000'));





