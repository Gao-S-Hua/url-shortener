import { encodeBase62 } from './utils';

describe('encodeBase62', () => {
  it('encodes 0 as "0"', () => {
    expect(encodeBase62(0)).toBe('0');
  });

  it('encodes single-digit numbers (0-9)', () => {
    expect(encodeBase62(0)).toBe('0');
    expect(encodeBase62(1)).toBe('1');
    expect(encodeBase62(9)).toBe('9');
  });

  it('encodes numbers within a-z range (10-35)', () => {
    expect(encodeBase62(10)).toBe('a');
    expect(encodeBase62(35)).toBe('z');
  });

  it('encodes numbers within A-Z range (36-61)', () => {
    expect(encodeBase62(36)).toBe('A');
    expect(encodeBase62(61)).toBe('Z');
  });

  it('encodes 62 as two characters ("10")', () => {
    expect(encodeBase62(62)).toBe('10');
  });

  it('encodes for case sensitive', () => {
    expect(encodeBase62(346)).toBe('5A');
    expect(encodeBase62(320)).toBe('5a');
  });

  it('encodes known values correctly', () => {
    expect(encodeBase62(100)).toBe('1C');
    expect(encodeBase62(1000)).toBe('g8');
    expect(encodeBase62(3844)).toBe('100');
  });

  it('is deterministic — same input always gives same output', () => {
    for (let i = 0; i < 1000; i++) {
      expect(encodeBase62(i)).toBe(encodeBase62(i));
    }
  });

  it('produces unique outputs for sequential inputs', () => {
    const seen = new Set<string>();
    for (let i = 0; i < 10_000; i++) {
      const code = encodeBase62(i);
      expect(seen.has(code)).toBe(false);
      seen.add(code);
    }
  });

  it('handles large numbers', () => {
    const code = encodeBase62(1_000_000);
    expect(typeof code).toBe('string');
    expect(code.length).toBeGreaterThan(0);
    // 1_000_000 in base62 is well-defined and consistent
    expect(encodeBase62(1_000_000)).toBe(code);
  });

  it('handles Number.MAX_SAFE_INTEGER without throwing', () => {
    expect(() => encodeBase62(Number.MAX_SAFE_INTEGER)).not.toThrow();
  });

  it('returns empty string for non-finite or negative inputs', () => {
    expect(encodeBase62(NaN)).toBe('');
    expect(encodeBase62(Infinity)).toBe('');
    expect(encodeBase62(-Infinity)).toBe('');
    expect(encodeBase62(-1)).toBe('');
  });

  it('produces increasing lengths as numbers grow', () => {
    const single = encodeBase62(61); // max 1-char value
    const double = encodeBase62(62); // min 2-char value
    const triple = encodeBase62(3844); // min 3-char value

    expect(single.length).toBe(1);
    expect(double.length).toBe(2);
    expect(triple.length).toBe(3);
  });
});
