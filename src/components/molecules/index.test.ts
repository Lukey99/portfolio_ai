import { describe, it, expect } from 'vitest';
import {
  SectionTitle,
  TimelineCard,
  BentoCell,
  ShowcaseCard,
  CredentialCard,
  ContactItem,
} from './index';

describe('molecules/index barrel', () => {
  it('re-exporte SectionTitle', () => {
    expect(SectionTitle).toBeDefined();
  });
  it('re-exporte TimelineCard', () => {
    expect(TimelineCard).toBeDefined();
  });
  it('re-exporte BentoCell', () => {
    expect(BentoCell).toBeDefined();
  });
  it('re-exporte ShowcaseCard', () => {
    expect(ShowcaseCard).toBeDefined();
  });
  it('re-exporte CredentialCard', () => {
    expect(CredentialCard).toBeDefined();
  });
  it('re-exporte ContactItem', () => {
    expect(ContactItem).toBeDefined();
  });
});
