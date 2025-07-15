import { randomBytes } from 'crypto';

function bin2hex(bytes: number = 16): string {
  return randomBytes(bytes).toString('hex');
}

function randomNumber(): BigInt {
  const timestamp = Date.now().toString(); // 13桁（ミリ秒）
  const random = crypto.getRandomValues(new Uint32Array(1))[0] % 1_000_000_000; // 最大9桁
  const randomStr = random.toString().padStart(7, '0'); // 7桁に調整

  return BigInt(timestamp + randomStr); // 合計20桁
}

export { bin2hex, randomNumber };