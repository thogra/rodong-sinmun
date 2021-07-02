import { expect } from '@jest/globals';
import calculateFontsize from './font-size-calculator';

describe('font-size-calulator.js', () => {
  describe('large teasers', () => {

    it('example 1', () => {
      const example = ['Dansk', 'bookmaker lukker'];
      const result = calculateFontsize(example, 'large');
      expect(result[0].emSize).toBeCloseTo(17.9, 2);
      expect(result[1].emSize).toBeCloseTo(6.06, 2);
    });

    it('example 2', () => {
      const example = ['Brødre sigtet:', 'Planlagde', 'grotesk tortur'];
      const result = calculateFontsize(example, 'large');
      expect(result[0].emSize).toBeCloseTo(8.125, 1);
      expect(result[1].emSize).toBeCloseTo(11.25, 1);
      expect(result[2].emSize).toBeCloseTo(8.125, 1); // 7.875
    });
  });
});
