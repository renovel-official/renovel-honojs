import { createHash } from 'crypto';

type HashAlgorithm = "md5" | "sha256" | "sha516";

const hash = (type: HashAlgorithm, text: string): string => 
  createHash(type).update(text).digest('hex');

function md5(text: string): string {
  return hash('md5', text);
}

function sha256(text: string): string {
  return hash('sha256', text);
}

function sha516(text: string): string {
  return hash('sha516', text);
}

export { md5, sha256, sha516 };