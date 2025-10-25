import { describe, it, expect } from 'vitest';
import { calculateReadTime, formatDate, truncateText, generateSlug } from '@/utils/blogHelpers';

describe('Blog Helper Functions', () => {
  describe('calculateReadTime', () => {
    it('should calculate read time correctly', () => {
      const text = 'word '.repeat(200); // 200 words
      expect(calculateReadTime(text)).toBe(1);
    });

    it('should round up read time', () => {
      const text = 'word '.repeat(250); // 250 words
      expect(calculateReadTime(text)).toBe(2);
    });

    it('should handle empty text', () => {
      expect(calculateReadTime('')).toBe(0);
    });
  });

  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = '2024-01-15T00:00:00.000Z';
      const formatted = formatDate(date);
      expect(formatted).toContain('January');
      expect(formatted).toContain('15');
      expect(formatted).toContain('2024');
    });
  });

  describe('truncateText', () => {
    it('should truncate long text', () => {
      const longText = 'a'.repeat(200);
      const truncated = truncateText(longText, 100);
      expect(truncated.length).toBeLessThanOrEqual(104); // 100 + '...'
      expect(truncated).toContain('...');
    });

    it('should not truncate short text', () => {
      const shortText = 'Short text';
      expect(truncateText(shortText, 100)).toBe(shortText);
    });
  });

  describe('generateSlug', () => {
    it('should generate valid slug', () => {
      expect(generateSlug('Hello World')).toBe('hello-world');
    });

    it('should handle special characters', () => {
      expect(generateSlug('Hello, World!')).toBe('hello-world');
    });

    it('should handle multiple spaces', () => {
      expect(generateSlug('Hello   World')).toBe('hello-world');
    });

    it('should remove leading/trailing dashes', () => {
      expect(generateSlug('  Hello World  ')).toBe('hello-world');
    });
  });
});
