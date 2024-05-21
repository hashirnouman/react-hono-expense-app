import { Hono } from "hono";
import {z} from 'zod';
import { zValidator } from '@hono/zod-validator'

const expenseSchema = z.object({
    id:z.number().int().positive().min(1),
    title:z.string().min(3).max(50),
    amount:z.number().int().positive()
})
type Expense = z.infer<typeof expenseSchema>
const creatPostSchema = expenseSchema.omit({id:true})
const fakeExpenses:Expense[] =[{
    id:1,
    title:'helllo',
    amount:12
},{
    id:2,
    title:'custom',
    amount:212
},{
    id:3,
    title:'test',
    amount:545
}] 

export const expensesRoutes = new Hono()
    .get('/', c=>{
    return c.json({expenses:fakeExpenses})
})
    .post('/', zValidator('json', creatPostSchema), async (c)=>{
        const expense = await c.req.valid('json')
        fakeExpenses.push({...expense, id:fakeExpenses.length+1})
        return c.json(expense)
    })

    .get('/:id{[0-9]+}', c=>{
       const id = Number.parseInt( c.req.param('id'))
       const expense = fakeExpenses.find((expense)=>expense.id===id)
       if(!expense) {
        return c.notFound()
       }
       return c.json(expense)
    })
    .delete('/:id{[0-9]+}', c=>{
        const id = Number.parseInt( c.req.param('id'))
        const expense = fakeExpenses.find((expense)=>expense.id===id)
        if(!expense) {
         return c.notFound()
        }
    // Splice fakeExpenses array to remove the expense with the id
        const deleteExpense = fakeExpenses.splice(fakeExpenses.indexOf(expense),1)[0]

        return c.json({expense:deleteExpense})
     })