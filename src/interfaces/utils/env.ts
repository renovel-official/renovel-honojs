import { DrizzleD1Database } from "drizzle-orm/d1";
import { D1Database } from "@cloudflare/workers-types";

type Env = {
    Bindings: {
        DB: D1Database; // ここ！
        db?: DrizzleD1Database;
    };
    Variables: {
        db: DrizzleD1Database;
    }
};

export default Env;