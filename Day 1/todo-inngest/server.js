import express from "express";
import "dotenv/config";
import { addTodo, auditlog, deleteTodo, todos } from "./store.js";
import { serve } from "inngest/express";
import { inngest } from "./inngest/inngest-client.js";
import { onTodoCreated, onTodoDeleted } from "./inngest/function.js";

const app = express();

app.use(express.json());

app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions: [onTodoCreated , onTodoDeleted],
  })
);

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.post("/todos", async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const todo = addTodo(title);

  await inngest.send({
    name: "todo/created",
    data: { todo },
  });

  res.status(201).json(todo);
});


app.get("/delete/:id" , async (req , res) => {
  const id = Number(req.params.id)
  if(!id){
    return res.send(400).json({
      success : false,
      message : "Id does not exist"
    })
  }
  
  const deleted = deleteTodo(id)

  if (!deleted) {
    return res.status(404).json({
      success: false,
      message: "Todo not found",
    });
  }

  await inngest.send({
    name : "todo/deleted",
    data : { deleteTodo }
  })

  res.status(200).json({
    success : true,
    message : "todo delete successfully!",
    data : {
      deleted
    }
  })
})

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});