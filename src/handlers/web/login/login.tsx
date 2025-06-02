import { Context } from "hono";
import Login from "@/app/login";
import Env from "@/interfaces/utils/env";

export default async function RootHandler(c: Context<Env>) {
    const error = c.req.query('error');

    return c.render(<Login error={error} />);
}