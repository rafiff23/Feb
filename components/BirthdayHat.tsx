import React from 'react';

interface BirthdayHatProps {
  className?: string;
  style?: React.CSSProperties;
}

const BirthdayHat: React.FC<BirthdayHatProps> = ({ className, style }) => {
  return (
    <div className={className} style={style}>
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        {/* Cone */}
        <path
          d="M50 15L85 85H15L50 15Z"
          fill="#FF6B6B"
          stroke="#FFFFFF"
          strokeWidth="2"
        />
        {/* Stripes on cone */}
        <path
          d="M40 35L60 35"
          stroke="#FFD93D"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M30 55L70 55"
          stroke="#6BCB77"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M20 75L80 75"
          stroke="#4D96FF"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Pom pom */}
        <circle cx="50" cy="15" r="10" fill="#FFD93D" stroke="#FFFFFF" strokeWidth="2" />
        {/* Base ruffle */}
        <path
          d="M15 85C15 85 20 92 26 85C32 78 38 92 44 85C50 78 56 92 62 85C68 78 74 92 80 85C86 78 85 85 85 85"
          stroke="#FFD93D"
          strokeWidth="3"
          fill="none"
        />
      </svg>
    </div>
  );
};

export default BirthdayHat;
