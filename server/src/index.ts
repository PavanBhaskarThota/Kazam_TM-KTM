import express, { Request, Response } from "express";
import "dotenv/config"
import { connectDB } from "./Database";
import userRouter from "./Routes/userRoutes";
import cors from "cors";
import taskRouter from "./Routes/taskRoutes";
import projectRouter from "./Routes/projectRoutes";

const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())
app.use("/user",userRouter)
app.use("/task",taskRouter)
app.use("/project",projectRouter)

app.get('/', (req:Request,res:Response)=>{
    try {
        res.status(200).send('hello world')
    } catch (error) {
        res.status(400).send(error)
    }
})

app.listen(port, async()=>{
try {
    await connectDB
    console.log(`listening on port ${port}`)
} catch (error) {
    console.log(error)
}
})