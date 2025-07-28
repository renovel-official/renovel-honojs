import { DrizzleD1Database } from "drizzle-orm/d1";
import { NovelController } from "@/libs/novel";
import { D1Database } from "@cloudflare/workers-types";
import User from "../user";


type Env = {
    Bindings: {
        DB: D1Database
    };
    Variables: {
        db: DrizzleD1Database;
        user?: User | null;
        ablyToken: string;
        meta: {
            title?: string;
            description?: string;
            image?: string;
        },
        novel?: NovelController;
    }
};

export default Env;