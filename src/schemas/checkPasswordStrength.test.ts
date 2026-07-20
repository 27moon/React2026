import { describe, it, expect } from 'vitest';
import { checkPasswordStrength } from './checkPasswordStrength';

describe('checkPasswordStrength', () => {
  it('should return correct metrics for an empty password', () => {
    const result = checkPasswordStrength('');
    expect(result).toEqual({
      hasNumber: false,
      hasUpper: false,
      hasLower: false,
      hasSpecial: false,
      isValid: false,
      passedRulesCount: 0,
    });
  });

  it('should calculate weak strength (only numbers and lowercase)', () => {
    const result = checkPasswordStrength('pass123');
    expect(result.passedRulesCount).toBe(2);
    expect(result.isValid).toBe(false);
  });

  it('should calculate strong strength when all rules are met', () => {
    const result = checkPasswordStrength('StrongPass123!');
    expect(result).toEqual({
      hasNumber: true,
      hasUpper: true,
      hasLower: true,
      hasSpecial: true,
      isValid: true,
      passedRulesCount: 4,
    });
  });
});
