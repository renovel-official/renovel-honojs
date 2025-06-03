import { DrizzleD1Database } from "drizzle-orm/d1";
import { D1Database } from "@cloudflare/workers-types";
import Session from "@/interfaces/session";

type Env = {
    Bindings: {
        DB: D1Database; // ここ！
    };
    Variables: {
        db: DrizzleD1Database;
        session?: Session | null;
        title?: string;
    }
};

export default Env;