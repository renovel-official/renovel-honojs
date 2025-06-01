import { DrizzleD1Database } from "drizzle-orm/d1";
import { getUnixTimestamp } from "@/utils/timestamp"; // 現在のUnixタイムスタンプを取得するユーティリティ関数
import { sessions } from "@/db/d1"; // セッションテーブルのスキーマ定義
import { bin2hex } from "@/utils/bin2hex"; // バイナリデータを16進文字列に変換する関数
import { eq, or } from "drizzle-orm"; // SQL条件を構築するための演算子
import Session from "@/interfaces/session"; // セッションオブジェクトの型定義

// セッションの有効期限：7日（秒数で定義）
const SESSION_EXPIRE_TIME: number = 60 * 60 * 24 * 7;

/**
 * 指定されたトークンまたはメールアドレスに該当するセッションを取得する。
 *
 * @param db - DrizzleD1Database インスタンス
 * @param token - セッションのトークン（null の場合は email を使用）
 * @param email - セッションに紐づくメールアドレス（省略可能）
 * @returns セッションオブジェクト（存在しない場合は null）
 */
async function getSession(db: DrizzleD1Database, token: string | null, email?: string | null): Promise<Session | null> {
    const getResult: Array<Session> = await db.select().from(sessions).where(
        or(
            eq(sessions.email, email ?? ""),
            eq(sessions.token, token ?? "")
        )
    ).execute() as unknown as Array<Session>;

    if (getResult.length === 0) return null;
    return getResult[0];
}

/**
 * 指定されたトークンに対応するセッションの最終ログイン時刻を更新する。
 *
 * @param db - DrizzleD1Database インスタンス
 * @param token - 更新対象のセッショントークン
 * @returns 成功時は true、失敗時は false
 */
async function updateSession(db: DrizzleD1Database, token: string): Promise<boolean> {
    const getResult = await getSession(db, token);
    if (!getResult) return false;

    const updateResult = await db.update(sessions).set({
        last_logined_at: getUnixTimestamp()
    }).where(eq(
        sessions.token,
        token,
    )).execute();

    return updateResult.success;
}

/**
 * 新規セッションの登録、または既存セッションの更新を行う。
 *
 * @param db - DrizzleD1Database インスタンス
 * @param email - 登録対象ユーザーのメールアドレス
 * @returns 成功時はセッショントークン、失敗時は null
 */
async function registSession(db: DrizzleD1Database, email: string): Promise<string | null> {
    const getResult = await getSession(db, null, email);

    // 既にセッションが存在する場合は、最終ログイン時刻を更新してトークンを返す
    if (getResult) {
        const token = getResult.token;
        if (await updateSession(db, token)) {
            return getResult.token;
        } else {
            return null;
        }
    }

    // 新しいセッションを作成
    const token = bin2hex(32); // 32バイトのランダムなトークンを生成（16進数）
    const result = await db.insert(sessions).values({
        token,
        email,
        last_logined_at: getUnixTimestamp()
    }).execute();

    if (result.success) return token;
    return null;
}

/**
 * 指定されたトークンに該当するセッションを削除する。
 *
 * @param db - DrizzleD1Database インスタンス
 * @param token - 削除対象のセッショントークン
 * @returns 成功時は true、失敗または該当セッションなしの場合は false
 */
async function deleteSession(db: DrizzleD1Database, token: string): Promise<boolean> {
    const getResult = await getSession(db, token);
    if (!getResult) return false;

    return (await db.delete(sessions).where(eq(
        sessions.token,
        token
    )).execute()).success;
}

/**
 * トークンが有効なセッションかどうか（期限切れでないか）を検証する。
 *
 * @param db - DrizzleD1Database インスタンス
 * @param token - 検証対象のセッショントークン
 * @returns 有効であれば true、無効または期限切れなら false
 */
async function authSession(db: DrizzleD1Database, token: string): Promise<boolean> {
    const getResult = await getSession(db, token);
    if (!getResult) return false;

    const lastLoginedAt: number = getResult.last_logined_at ?? 0;
    const nowTimestamp: number = getUnixTimestamp();
    const diffTimestamp: number = nowTimestamp - lastLoginedAt;

    return diffTimestamp <= SESSION_EXPIRE_TIME;
}

// ユーティリティ関数をエクスポート
export { getSession, updateSession, registSession, deleteSession, authSession };
