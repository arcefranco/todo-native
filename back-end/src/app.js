import express from 'express'
import tasksRoutes from './routes/tasks'
const app = express();

app.use(express.json())
app.use(tasksRoutes)






export default app