import { DrizzleD1Database } from "drizzle-orm/d1";
import { D1Database, DurableObjectNamespace } from "@cloudflare/workers-types";
import User from "../user";

type Env = {
    Bindings: {
        DB: D1Database;
        ChatRoom: DurableObjectNamespace;
    };
    Variables: {
        db: DrizzleD1Database;
        user?: User | null;
        ablyToken: string;
        meta: {
            title?: string;
            description?: string;
            image?: string;
        }
    }
};

export default Env;