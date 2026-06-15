const BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function encodeBase62(num: number): string {
  if (!Number.isFinite(num) || num < 0) return '';
  if (num === 0) return '0';

  let result = '';

  while (num > 0) {
    result = BASE62[num % 62] + result;
    num = Math.floor(num / 62);
  }

  return result;
}
