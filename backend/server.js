//module imports
import express from "express"
import mongoose from "mongoose"
import morgan from "morgan"
import 'dotenv/config'
import cors from "cors"
import swaggerUi from 'swagger-ui-express'
import userSwaggerDocument from './userSwagger.json' assert {type: 'json'};
import movieSwaggerDocument from './movieSwagger.json' assert {type: 'json'};

//router imports 
import userRouter from "./routes/userRoutes.js"
import movieRouter from "./routes/movieRoutes.js"

const app = express()
const port = 5000

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log("Connected to database")
})

userRouter.use('/api-docs', swaggerUi.serveFiles(userSwaggerDocument));
userRouter.get('/api-docs', swaggerUi.setup(userSwaggerDocument));

movieRouter.use('/api-docs', swaggerUi.serveFiles(movieSwaggerDocument));
movieRouter.get('/api-docs', swaggerUi.setup(movieSwaggerDocument));

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use("/user", userRouter)
app.use("/movies", movieRouter)

app.listen(port, () => {
  console.log("Server is listening at port " + port)
})
