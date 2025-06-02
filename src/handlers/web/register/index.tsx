import { Context } from "hono";
import Register from "@/app/register";
import Env from "@/interfaces/utils/env";

export default async function RegisterHandler(c: Context<Env>) {
    const error = c.req.query('error');

    return c.render(<Register error={error} />);
}