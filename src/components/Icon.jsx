export function FrozenDollarIcon({ size = 64, id = "ice" }) {
    return (
        <svg viewBox="0 0 64 64" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id={`${id}-grad`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#eaf6fb" />
                    <stop offset="55%" stopColor="#9cc7dd" />
                    <stop offset="100%" stopColor="#3f6f95" />
                </linearGradient>
                <filter id={`${id}-shadow`} x="-40%" y="-40%" width="180%" height="180%">
                    <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#04101d" floodOpacity="0.5" />
                </filter>
            </defs>
            <text
                x="32"
                y="47"
                fontFamily="'Space Grotesk',sans-serif"
                fontSize="50"
                fontWeight="800"
                textAnchor="middle"
                fill={`url(#${id}-grad)`}
                stroke="#eef7fb"
                strokeOpacity="0.35"
                strokeWidth="0.6"
                filter={`url(#${id}-shadow)`}
            >
                $
            </text>
            <path d="M18 16 L27 25" stroke="#eef7fb" strokeOpacity="0.55" strokeWidth="1.1" strokeLinecap="round" />
            <path d="M42 19 L35 29" stroke="#eef7fb" strokeOpacity="0.45" strokeWidth="1.1" strokeLinecap="round" />
            <path d="M44 10 L51 6 L53 15 Z" fill="#eef7fb" fillOpacity="0.75" />
        </svg>
    );
}

export function MeltedDollarIcon({ size = 64, id = "gold" }) {
    return (
        <svg viewBox="0 0 64 64" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id={`${id}-grad`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fff3da" />
                    <stop offset="55%" stopColor="#f6c169" />
                    <stop offset="100%" stopColor="#c47f1f" />
                </linearGradient>
                <filter id={`${id}-shadow`} x="-40%" y="-40%" width="180%" height="180%">
                    <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#3a2200" floodOpacity="0.45" />
                </filter>
            </defs>
            <text
                x="32"
                y="47"
                fontFamily="'Space Grotesk',sans-serif"
                fontSize="50"
                fontWeight="800"
                textAnchor="middle"
                fill={`url(#${id}-grad)`}
                stroke="#fff3da"
                strokeOpacity="0.35"
                strokeWidth="0.6"
                filter={`url(#${id}-shadow)`}
            >
                $
            </text>
            <path
                d="M40 12 L42.5 17 L48 17.5 L44 21 L45 26.5 L40 23.8 L35 26.5 L36 21 L32 17.5 L37.5 17 Z"
                fill="#fff3da"
                fillOpacity="0.85"
            />
            <ellipse cx="16" cy="48" rx="2.6" ry="3.6" fill="#fff3da" fillOpacity="0.7" />
        </svg>
    );
}