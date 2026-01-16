import express from "express";
import cors from "cors"
import morgan from "morgan";
import AiRouter from "./routes/aiRouter.js"

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cors(
))
// app.use('/',(req, res) =>{ 
//     res.send('Backend is running successfully!');
// })
app.use('/ai-res',AiRouter)

export default app

