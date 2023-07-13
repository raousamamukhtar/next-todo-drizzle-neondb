import { sql } from "@vercel/postgres";
import { NextResponse, NextRequest } from "next/server";
import { Todotable, db } from "@/lib/drizzle";

// // simple get request to fetch data directly from data base without using drizzle ORMS
// export async function GET(request: NextRequest) {
//   try {
//     const client = await db.connect();
//     await client.sql`CREATE TABLE todos (id serial,task varchar(255))`;
//     return NextResponse.json({ message: "Table created" });
//   } catch (error) {
//     return NextResponse.json({ error: "Something went wrong" });
//   }
// }

//GET REQUEST BY USING DRIZZLE ORMS AND VERCEL NEON DATABASE
export async function GET(request: NextRequest) {
  try {
    await sql`CREATE TABLE IF NOT EXISTS todos (id serial,task varchar(255))`;
    const res = await db.select().from(Todotable);
    return NextResponse.json({ data: res });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" });
  }
}
export async function POST(request: NextRequest) {
  const req = await request.json();
  try {
    if (req.task) {
      await db.insert(Todotable).values({
        task: req.task,
      });
      return NextResponse.json({
        message: `${req.task} task added successfully in neon database`,
      });
    }
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" });
  }
}
