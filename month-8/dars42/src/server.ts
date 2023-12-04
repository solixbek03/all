import express, {Application, Request, Response} from 'express'

const app: Application = express()

app.use(express.json());



app.listen(5000, () => console.log('*5000'));
