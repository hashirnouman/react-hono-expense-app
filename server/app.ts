import { Hono } from "hono";
import { logger } from "hono/logger";
import { expensesRoutes } from "./routes/expense";
import { serveStatic } from 'hono/bun'
const app = new Hono()
app.use("*", logger())
app.get("/test", c=>{
    return c.json({message:"hello world"});
})
const apiRoutes =app.basePath('/api').route("/expenses", expensesRoutes)

app.get('*', serveStatic({ root: './client/dist' }))
app.get('*', serveStatic({ path: './client/dist/index.html' }))
export type ApiRoutes = typeof apiRoutes
export default app