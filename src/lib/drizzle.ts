import { sql } from "@vercel/postgres";
import { InferModel } from "drizzle-orm";
import { drizzle } from "drizzle-orm/vercel-postgres";
import {
  pgTable,
  varchar,
  serial,
  timestamp,
  text,
  boolean,
} from "drizzle-orm/pg-core";
export const Todotable = pgTable("todos", {
  id: serial("id").primaryKey(),
  task: varchar("task", { length: 255 }).notNull(),
});

export type Todo = InferModel<typeof Todotable>;
export type NewTodo = InferModel<typeof Todotable, "insert">;

export const db = drizzle(sql);
