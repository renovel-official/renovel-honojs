import { Context } from "hono";
import CreateWork from "@/app/author/works/new";
import Home from "@/app/index";
import Env from "@/interfaces/utils/env";

export default async function createWorkHandler(c: Context<Env>) {
    return c.render(<CreateWork />);
}