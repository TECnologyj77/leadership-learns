import React, { useId } from 'react';
import { logoGradient } from '../../theme/tokens';

interface LogoMarkProps {
  width: number;
  height: number;
}

// The gold mark without its tile, for navy backgrounds. The gradient id is
// unique per instance, since the header and footer both draw the mark.
const LogoMark: React.FC<LogoMarkProps> = ({ width, height }) => {
  const gradientId = useId();
  const [start, middle, end] = logoGradient;

  return (
    <svg viewBox="0 0 62 88" width={width} height={height} aria-hidden="true" focusable="false" style={{ display: 'block', flexShrink: 0 }}>
      <defs>
        <linearGradient id={gradientId} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="62" y2="18">
          <stop offset="0" stopColor={start} />
          <stop offset=".55" stopColor={middle} />
          <stop offset="1" stopColor={end} />
        </linearGradient>
      </defs>
      <g fill={`url(#${gradientId})`}>
        <path d="M0 0h23.5L0 70z" />
        <path d="M57.5 0H62v64H35z" />
        <path d="M0 82h62v6H0z" />
      </g>
    </svg>
  );
};

export default LogoMark;
