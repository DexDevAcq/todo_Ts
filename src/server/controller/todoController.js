const db = require('../db');


class TodoController {

    async getTodos(req, res) {
        try {
            const todos = await db.query(`SELECT * FROM "todo"`);
            return res.json(todos.rows);
        } catch (error) {
            res.json(error)
        }
    }

    async createTodo(req, res) {
        try {
            const {text} = req.body;
            const newTodo = await db.query(`INSERT INTO "todo" ("text", "completed") VALUES ($1, $2) RETURNING *`, [text, false])
            const todos = await db.query(`SELECT * FROM "todo"`);
            return res.json(todos.rows);
        } catch (error) {
            res.json(error)
        }
    }

    async deleteTodo(req, res) {
        try {

            const todoId = req.params.id;

            if(todoId !== "0"){
                const deletedTodo = await db.query(`DELETE FROM "todo" WHERE "id" = $1`, [todoId]);
                const todos = await db.query(`SELECT * FROM "todo"`);
                return res.json(todos.rows);
            } else {
                const deletedTodo = await db.query(`DELETE FROM "todo" WHERE "completed" = $1`, [true]);
                const todos = await db.query(`SELECT * FROM "todo"`);
                return res.json(todos.rows);
            }
        } catch (error) {
            res.json(error)
        }
    }

    async updateTodo(req, res) {

        try {

            const {text, completed} = req.body;
            const todoId = req.params.id
            const strStatus = JSON.stringify(completed);    
    
            if(text){
                const updatedTodo = await db.query(`UPDATE "todo"
                SET "text" = $1
                WHERE "id" = $2;`, [text, todoId]);
       
                const todos = await db.query(`SELECT * FROM "todo"`);
                return res.json(todos.rows);
            }
    
    
            if(strStatus){
                const updatedTodo = await db.query(`UPDATE "todo"
                SET "completed" = $1
                WHERE "id" = $2`, [completed, todoId]);
                const todos = await db.query(`SELECT * FROM "todo" ORDER BY "id"`);
                return res.json(todos.rows);
            }

        } catch (error) {
            res.json(error)
        }
    }

}


module.exports = new TodoController();