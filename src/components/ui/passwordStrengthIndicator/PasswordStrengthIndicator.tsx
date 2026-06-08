import { useMemo } from 'react';

type PasswordStrengthIndicatorProps = {
  passwordValue: string;
};

export const PasswordStrengthIndicator = ({
  passwordValue,
}: PasswordStrengthIndicatorProps) => {
  const { strengthMetrics, textStatus, statusColor } = useMemo(() => {
    const chars = passwordValue.split('');

    const hasNumber = chars.some((c) => c >= '0' && c <= '9');
    const hasUpper = chars.some((c) => c >= 'A' && c <= 'Z');
    const hasLower = chars.some((c) => c >= 'a' && c <= 'z');
    const hasSpecial = chars.some(
      (c) =>
        !(c >= '0' && c <= '9') &&
        !(c >= 'A' && c <= 'Z') &&
        !(c >= 'a' && c <= 'z')
    );

    const passedRulesCount = [hasNumber, hasUpper, hasLower, hasSpecial].filter(
      Boolean
    ).length;

    let textStatus = 'Empty';
    let statusColor = '#6c757d';

    if (passwordValue.length > 0) {
      if (passedRulesCount <= 2) {
        textStatus = 'Weak';
        statusColor = '#dc3545';
      } else if (passedRulesCount === 3) {
        textStatus = 'Average';
        statusColor = '#ffc107';
      } else if (passedRulesCount === 4) {
        textStatus = 'Strong';
        statusColor = '#198754';
      }
    }

    return {
      strengthMetrics: { hasNumber, hasUpper, hasLower, hasSpecial },
      textStatus,
      statusColor,
    };
  }, [passwordValue]);

  return (
    <div
      className="password-strength-wrapper"
      style={{ marginTop: '8px', fontSize: '14px' }}
    >
      <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
        Password Strength:{' '}
        <span style={{ color: statusColor }}>{textStatus}</span>
      </div>

      <div style={{ fontSize: '12px', opacity: 0.85 }}>
        <span
          style={{
            color: strengthMetrics.hasNumber ? '#198754' : '#dc3545',
            marginRight: '8px',
          }}
        >
          {strengthMetrics.hasNumber ? '✓' : '✗'} 1 number
        </span>
        <span
          style={{
            color: strengthMetrics.hasUpper ? '#198754' : '#dc3545',
            marginRight: '8px',
          }}
        >
          {strengthMetrics.hasUpper ? '✓' : '✗'} 1 uppercase
        </span>
        <span
          style={{
            color: strengthMetrics.hasLower ? '#198754' : '#dc3545',
            marginRight: '8px',
          }}
        >
          {strengthMetrics.hasLower ? '✓' : '✗'} 1 lowercase
        </span>
        <span
          style={{ color: strengthMetrics.hasSpecial ? '#198754' : '#dc3545' }}
        >
          {strengthMetrics.hasSpecial ? '✓' : '✗'} 1 special
        </span>
      </div>
    </div>
  );
};
