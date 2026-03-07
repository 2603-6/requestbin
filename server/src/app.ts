import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
const app = express();
app.use(express.json());
dotenv.config();
console.log(process.env.DB_USER)

app.get('/', (req: Request, res: Response) => {
    res.send("Hello World!")
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
const greeting: string = 'Hello';
const numbers: number[] = [1, 2, 3]
