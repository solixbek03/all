"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: 'fire',
    password: 'asd',
    host: 'localhost',
    database: 'homework41',
    port: 5432
});
function fetchAll(SQL, porams = []) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield pool.connect();
        try {
            const { rows } = yield client.query(SQL, porams);
            return rows;
        }
        catch (error) {
            if (error instanceof Error) {
                console.log('db error', error.message);
                throw error;
            }
        }
        finally {
            client.release();
        }
    });
}
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield fetchAll('SELECT * FROM users;');
    res.send(users);
}));
app.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, gander, age } = req.body;
    const users = yield fetchAll(`insert into users(username, password, gander, age) values($1, $2, $3, $4) returning *;`, [username, password, gander, age]);
    res.send(users);
}));
app.put('/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.body;
    const { id } = req.params;
    const users = yield fetchAll(` update users
        Set username = $2
        where id = $1
        `, [id, username]);
    res.send(users);
}));
app.delete('/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const users = yield fetchAll(` delete from users
        where id = $1
        `, [id]);
    res.send(users);
}));
app.listen(5000, () => console.log('*5000'));
