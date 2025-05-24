import { randomBytes } from 'crypto';

function bin2hex(bytes: number = 16): string {
  return randomBytes(bytes).toString('hex');
}

export { bin2hex };