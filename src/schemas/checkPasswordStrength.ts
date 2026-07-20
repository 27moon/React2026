export type PasswordStrength = {
  hasNumber: boolean;
  hasUpper: boolean;
  hasLower: boolean;
  hasSpecial: boolean;
  isValid: boolean;
};

export const checkPasswordStrength = (password: string): PasswordStrength => {
  const chars = password.split('');

  const hasNumber = chars.some((c) => c >= '0' && c <= '9');
  const hasUpper = chars.some((c) => c >= 'A' && c <= 'Z');
  const hasLower = chars.some((c) => c >= 'a' && c <= 'z');
  const hasSpecial = chars.some(
    (c) =>
      !(c >= '0' && c <= '9') &&
      !(c >= 'A' && c <= 'Z') &&
      !(c >= 'a' && c <= 'z')
  );

  return {
    hasNumber,
    hasUpper,
    hasLower,
    hasSpecial,
    isValid: hasNumber && hasUpper && hasLower && hasSpecial,
  };
};
