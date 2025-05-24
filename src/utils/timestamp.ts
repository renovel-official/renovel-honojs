function getUnixTimestamp(): number {
    return Math.floor(Date.now() / 1000);
}

function unixToJSTDate(unixSeconds: number): Date {
    return new Date(unixSeconds * 1000); // Date は UTC を内部的に扱うが、日本時間も使える
}

function formatJST(unixSeconds: number): string {
    const date = new Date(unixSeconds * 1000);

    // UTC +9（日本時間）に変換
    const jst = new Date(date.getTime() + 9 * 60 * 60 * 1000);

    const yyyy = jst.getUTCFullYear();
    const mm = String(jst.getUTCMonth() + 1).padStart(2, '0');
    const dd = String(jst.getUTCDate()).padStart(2, '0');
    const hh = String(jst.getUTCHours()).padStart(2, '0');
    const mi = String(jst.getUTCMinutes()).padStart(2, '0');
    const ss = String(jst.getUTCSeconds()).padStart(2, '0');

    return `${yyyy}/${mm}/${dd} ${hh}:${mi}:${ss}`;
}

export { getUnixTimestamp, unixToJSTDate, formatJST };