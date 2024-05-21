import { Hono } from "hono";
import { logger } from "hono/logger";
import { expensesRoutes } from "./routes/expense";
const app = new Hono()
app.use("*", logger())
app.get("/test", c=>{
    return c.json({message:"hello world"});
})
app.route("/api/expenses", expensesRoutes)
export default app