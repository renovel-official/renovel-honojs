import Author from "@/app/author";
import Env from "@/interfaces/utils/env";
import { Context } from "hono";

export default async function authorHandler(c: Context<Env>) {
    
    return c.render(<Author author={c.get('user')}/>);
}