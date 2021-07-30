import { expect } from '@jest/globals';
import { splitTitle } from './frontpage-data-transformer';

describe('fontpage-data-transformer.js', () => {
  describe('splitTitle', () => {
    it('a short title', () => {
      expect(splitTitle('hello')).toEqual(['hello']);
    });

    it('an overlong title with one word', () => {
      expect(splitTitle('hello', { maxLength: 3 })).toEqual(['hello']);
    });

    it('an overlong title', () => {
      expect(splitTitle('hello there', { maxLength: 4 })).toEqual([
        'hello',
        'there',
      ]);
    });

    it('an overlong title', () => {
      expect(splitTitle('hello there how are you', { maxLength: 5 })).toEqual([
        'hello there',
        'how are',
        'you',
      ]);
    });
  });
});
