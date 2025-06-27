/**
 * HTML特殊文字をエスケープする関数
 */
function htmlSpecialChars(str: string): string {
  return str
    .replace(/&/g, '&amp;')  // 最初に & を変換（他の変換に影響を与えないため）
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}


export { htmlSpecialChars };