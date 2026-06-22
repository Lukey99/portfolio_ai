import { describe, it, expect } from 'vitest';
import { Badge, Button, GradientText, Tag, AnimatedText } from './index';

describe('atoms/index barrel', () => {
  it('re-exporte Badge', () => { expect(Badge).toBeDefined(); });
  it('re-exporte Button', () => { expect(Button).toBeDefined(); });
  it('re-exporte GradientText', () => { expect(GradientText).toBeDefined(); });
  it('re-exporte Tag', () => { expect(Tag).toBeDefined(); });
  it('re-exporte AnimatedText', () => { expect(AnimatedText).toBeDefined(); });
});
