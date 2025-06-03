import { DrizzleD1Database } from "drizzle-orm/d1";
import { D1Database } from "@cloudflare/workers-types";
import User from "../user";

type Env = {
    Bindings: {
        DB: D1Database; // ここ！
    };
    Variables: {
        db: DrizzleD1Database;
        user?: User | null;
        title?: string;
    }
};

export default Env;