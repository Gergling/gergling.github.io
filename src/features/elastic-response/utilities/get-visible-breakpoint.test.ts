import { describe, expect, it } from 'vitest';
import { getVisibleBreakpoint } from './get-visible-breakpoint';

describe('getVisibleBreakpoint', () => {
  // Assumes descending order as per the function's optimization note.
  const breakpoints = [1200, 900, 600];

  it('should return 0 if no breakpoints are provided', () => {
    expect(getVisibleBreakpoint(1024, [])).toBe(0);
  });

  describe('with a viewport smaller than the smallest breakpoint', () => {
    it('should return the smallest breakpoint', () => {
      expect(getVisibleBreakpoint(599, breakpoints)).toBe(breakpoints[breakpoints.length - 1]);
      expect(getVisibleBreakpoint(0, breakpoints)).toBe(breakpoints[breakpoints.length - 1]);
    });
  });

  describe('with a viewport larger than the largest breakpoint', () => {
    it('should return the largest breakpoint', () => {
      expect(getVisibleBreakpoint(1201, breakpoints)).toBe(1200);
      expect(getVisibleBreakpoint(2000, breakpoints)).toBe(1200);
    });
  });

  describe('with a viewport size that falls between two breakpoints', () => {
    it('should return the next lowest breakpoint (the floor)', () => {
      expect(getVisibleBreakpoint(601, breakpoints)).toBe(600);
      expect(getVisibleBreakpoint(899, breakpoints)).toBe(600);
      expect(getVisibleBreakpoint(901, breakpoints)).toBe(900);
      expect(getVisibleBreakpoint(1199, breakpoints)).toBe(900);
    });
  });

  describe('with a viewport size that exactly matches a breakpoint', () => {
    it('should return that exact breakpoint', () => {
      expect(getVisibleBreakpoint(600, breakpoints)).toBe(600);
      expect(getVisibleBreakpoint(900, breakpoints)).toBe(900);
      expect(getVisibleBreakpoint(1200, breakpoints)).toBe(1200);
    });
  });

  describe('with a different set of breakpoints', () => {
    const mobileBreakpoints = [480, 320];
    it('should work correctly', () => {
      expect(getVisibleBreakpoint(300, mobileBreakpoints)).toBe(320);
      expect(getVisibleBreakpoint(400, mobileBreakpoints)).toBe(320);
      expect(getVisibleBreakpoint(500, mobileBreakpoints)).toBe(480);
    });
  });
});