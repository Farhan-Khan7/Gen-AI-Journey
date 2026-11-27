import { inngest } from "./inngest-client.js";
import { auditlog } from "../store.js";
import { step } from "inngest";

export const onTodoCreated = inngest.createFunction(
    {
        id: "on-todo-created",
        triggers: [{ event: "todo/created" }]
    },
    async ({ event, step }) => {
        await step.run("audit", async () => {
            auditlog.push({
                action: "created",
                todoId: event.data.todo.id,
                title: event.data.todo.title,
                timestamp: new Date().toISOString()
            });
            return { success: true }
        })
    }
)


export const onTodoDeleted = inngest.createFunction(
    {
        id: "on-todo-delete",
        retries: 2,
        triggers: [{ event: "todo/deleted" }]
    },
    async ({ event, step, attempt }) => {

        const id = event.data.todo.id

        await step.run("cleanup", async () => {
            if (attempt === 0) {
                throw new Error(`Failed to cleanup after deleting todo ${id}`)
            }
            return "cleaned up successfully"
        })
    },

    async ({ event, step }) => {
        await step.run("audit", async () => {
            auditlog.push({
                action: "delete",
                todoId: event.data.todo.id
            })
            return { success: true }
        })
    }
)


