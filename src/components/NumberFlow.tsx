import React from 'react';

interface NumberFlowProps {
  value: number;
  className?: string;
  padZeroes?: number;
}

export const NumberFlow: React.FC<NumberFlowProps> = ({ value, className = '', padZeroes = 2 }) => {
  const formatted = String(value).padStart(padZeroes, '0');
  const digits = formatted.split('');

  return (
    <span className={'inline-flex items-center overflow-hidden leading-none tabular-nums ' + className}>
      {digits.map((digit, i) => (
        <span key={i} className="relative inline-block h-[1.1em] overflow-hidden w-[0.62em] text-center">
          <span
            className="absolute left-0 top-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col items-center w-full"
            style={{
              transform: 'translateY(-' + (Number(digit) * 10) + '%)'
            }}
          >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
              <span key={n} className="h-[1.1em] flex items-center justify-center">
                {n}
              </span>
            ))}
          </span>
        </span>
      ))}
    </span>
  );
};
