import { isValidUrl } from './index.js';

describe('isValidUrl', () => {
  // Valid URL
  it('returns true for a valid https URL', () => {
    expect(isValidUrl('https://example.com')).toBe(true);
  });

  it('returns true for a valid http URL', () => {
    expect(isValidUrl('http://example.com')).toBe(true);
  });

  it('returns true for a URL with path, query, and hash', () => {
    expect(isValidUrl('https://example.com/path?key=value#hash')).toBe(true);
  });

  it('returns true for a URL with subdomain', () => {
    expect(isValidUrl('https://sub.example.com')).toBe(true);
  });

  it('returns true for localhost', () => {
    expect(isValidUrl('http://localhost:3000')).toBe(true);
  });

  // invalid protocal
  it('returns false for ftp protocol', () => {
    expect(isValidUrl('ftp://example.com')).toBe(false);
  });

  it('returns false for ws protocol', () => {
    expect(isValidUrl('ws://example.com')).toBe(false);
  });

  // invalid input
  it('returns false for an empty string', () => {
    expect(isValidUrl('')).toBe(false);
  });

  it('returns false for a string that is not a URL', () => {
    expect(isValidUrl('not-a-url')).toBe(false);
  });

  it('returns false for a missing protocol', () => {
    expect(isValidUrl('example.com')).toBe(false);
  });

  it('returns false for a relative path', () => {
    expect(isValidUrl('/relative/path')).toBe(false);
  });
});
