import { Context } from "hono";
import Home from "@/app/index";
import Env from "@/interfaces/utils/env";

export default async function rootHandler(c: Context<Env>) {
    return c.render(<Home bestNovels={[]} newNovels={[]} />);
}