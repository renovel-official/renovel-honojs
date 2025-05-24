import { Context } from "hono";
import Env from "@/interfaces/utils/env";

export default async function placeholderHandler(c: Context<Env>) {
    const { workId } = c.req.param();
    const { width, height } = c.req.query();

    const db = c.get('db');
}