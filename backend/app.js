import express from "express"
import routes from "./lib/routes.js"
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(routes)

app.listen(3001, function(){
  console.log("Connected");
})

export default app;
