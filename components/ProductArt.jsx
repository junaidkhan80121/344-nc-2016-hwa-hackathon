"use client";

import { useId } from "react";

function resolveColor(product, colorName) {
  if (product?.colors?.length) {
    return product.colors.find((entry) => entry.name === colorName) || product.colors[0];
  }
  return null;
}

function Wordmark({ x, y, fill = "#2b2a22", size = 10 }) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fontFamily="Manrope, Arial, sans-serif"
      fontSize={size}
      fontWeight="700"
      letterSpacing="2.4"
      fill={fill}
      opacity="0.78"
    >
      SCENTTRAIL
    </text>
  );
}

function Diffuser({ uid, colorway, label }) {
  return (
    <g>
      <ellipse cx="210" cy="338" rx="116" ry="20" fill="#1c1b16" opacity="0.16" />
      <path
        d="M112 183c0-37 41-60 98-60s98 23 98 60l6 132c1 32-36 49-104 49s-105-17-104-49z"
        fill={`url(#body-${uid})`}
      />
      <path
        d="M112 183c0-37 41-60 98-60s98 23 98 60v10c0-32-43-52-98-52s-98 20-98 52z"
        fill="#ffffff"
        opacity="0.18"
      />
      <path d="M118 285c44 12 139 12 184 0" stroke="#000" strokeWidth="2.5" opacity="0.16" fill="none" />
      <path d="M122 178c5-33 44-52 88-52s83 19 88 52" stroke="#fff" strokeWidth="2" opacity="0.22" fill="none" />
      <g>
        <ellipse cx="210" cy="126" rx="62" ry="20" fill={`url(#dial-${uid})`} />
        <rect x="154" y="112" width="112" height="14" rx="7" fill={colorway.hex} />
        <g opacity="0.32" stroke="#2f2c23" strokeWidth="2">
          <path d="M188 107v12M199 104v10M210 103v9M221 104v10M232 107v12" />
        </g>
      </g>
      <circle cx="210" cy="224" r="30" fill={colorway.hex} />
      <circle cx="210" cy="224" r="30" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.3" />
      <circle cx="210" cy="224" r="22" fill="#000" opacity="0.07" />
      <Wordmark x="210" y="305" fill={label} size="11" />
      <text
        x="210"
        y="320"
        textAnchor="middle"
        fontFamily="Manrope, Arial, sans-serif"
        fontSize="7.5"
        letterSpacing="1.6"
        fill={label}
        opacity="0.58"
      >
        PODS · TRAIL 01
      </text>
    </g>
  );
}

function Refill({ uid, colorway, label }) {
  return (
    <g>
      <ellipse cx="210" cy="345" rx="128" ry="18" fill="#1c1b16" opacity="0.14" />
      <g transform="rotate(-3 190 210)">
        <rect x="96" y="104" width="178" height="232" rx="14" fill={`url(#pack-${uid})`} />
        <rect x="96" y="104" width="178" height="32" rx="14" fill="#ffffff" opacity="0.14" />
        <path d="M96 124h178" stroke="#000" strokeWidth="1.5" opacity="0.12" />
        <rect x="122" y="170" width="126" height="104" rx="8" fill={label} />
        <text
          x="185"
          y="194"
          textAnchor="middle"
          fontFamily="Manrope, Arial, sans-serif"
          fontSize="8"
          letterSpacing="2"
          fill="#59564a"
        >
          SCENTTRAIL
        </text>
        <text
          x="185"
          y="218"
          textAnchor="middle"
          fontFamily="Fraunces, Georgia, serif"
          fontSize="18"
          fill="#2d2a22"
        >
          Refill
        </text>
        <text
          x="185"
          y="236"
          textAnchor="middle"
          fontFamily="Fraunces, Georgia, serif"
          fontSize="18"
          fill="#2d2a22"
        >
          Pack
        </text>
        <path d="M142 250h86" stroke="#2d2a22" strokeWidth="1.5" opacity="0.35" />
        <text
          x="185"
          y="265"
          textAnchor="middle"
          fontFamily="Manrope, Arial, sans-serif"
          fontSize="7"
          letterSpacing="1.8"
          fill="#59564a"
        >
          3 COMPOSTABLE PODS
        </text>
      </g>
      <g>
        <rect x="270" y="242" width="44" height="94" rx="6" fill="#fffaf0" stroke="#d6c8b0" />
        <rect x="277" y="274" width="30" height="34" rx="3" fill={colorway.hex} opacity="0.85" />
        <Wordmark x="292" y="264" size="4.5" fill="#4d493d" />
        <text x="292" y="288" textAnchor="middle" fontFamily="Manrope" fontSize="5" fill="#fff" letterSpacing="0.8">
          POD
        </text>
      </g>
      <g>
        <rect x="318" y="262" width="36" height="74" rx="5" fill="#fffaf0" stroke="#d6c8b0" />
        <rect x="324" y="286" width="24" height="26" rx="2.5" fill={colorway.hex} opacity="0.65" />
      </g>
    </g>
  );
}

function Bundle({ uid, colorway, label }) {
  return (
    <g>
      <ellipse cx="210" cy="348" rx="150" ry="20" fill="#1c1b16" opacity="0.14" />
      <g transform="translate(-52 32) scale(0.78)">
        <Diffuser uid={uid} colorway={colorway} label={label} />
      </g>
      <g transform="translate(106 50) scale(0.67)">
        <Refill uid={uid} colorway={colorway} label={label} />
      </g>
      <g>
        <rect x="280" y="214" width="74" height="122" rx="8" fill={`url(#box-${uid})`} />
        <rect x="288" y="248" width="58" height="54" rx="4" fill={label} />
        <Wordmark x="317" y="236" size="5" fill={label} />
        <text x="317" y="266" textAnchor="middle" fontFamily="Fraunces" fontSize="10" fill="#2d2a22">
          Starter
        </text>
        <text x="317" y="280" textAnchor="middle" fontFamily="Fraunces" fontSize="10" fill="#2d2a22">
          set
        </text>
      </g>
    </g>
  );
}

function Starter({ uid, colorway, label }) {
  return (
    <g>
      <ellipse cx="210" cy="342" rx="122" ry="18" fill="#1c1b16" opacity="0.13" />
      {[0, 1, 2].map((index) => (
        <g key={index} transform={`translate(${104 + index * 76} ${154 + index * 4})`}>
          <rect width="68" height="172" rx="6" fill={`url(#box-${uid})`} />
          <rect x="8" y="98" width="52" height="58" rx="3" fill={label} />
          <text
            x="34"
            y="22"
            textAnchor="middle"
            fontFamily="Manrope"
            fontSize="5.5"
            letterSpacing="1.6"
            fill={label}
            opacity="0.8"
          >
            SCENTTRAIL
          </text>
          <text x="34" y="46" textAnchor="middle" fontFamily="Fraunces" fontSize="9" fill={label}>
            Starter
          </text>
          <text x="34" y="58" textAnchor="middle" fontFamily="Fraunces" fontSize="9" fill={label}>
            cartridge
          </text>
          <rect x="18" y="110" width="32" height="34" rx="2" fill={colorway.hex} opacity={0.85 - index * 0.14} />
          <text x="34" y="142" textAnchor="middle" fontFamily="Manrope" fontSize="5" fill="#fff" letterSpacing="0.8">
            {index === 0 ? "FOREST" : index === 1 ? "BROTH" : "GOLD"}
          </text>
        </g>
      ))}
    </g>
  );
}

function Discovery({ uid, colorway, label }) {
  return (
    <g>
      <ellipse cx="210" cy="334" rx="128" ry="16" fill="#1c1b16" opacity="0.12" />
      {[0, 1, 2, 3, 4].map((index) => (
        <g key={index} transform={`translate(${92 + index * 54} ${176 + (index % 2) * 14})`}>
          <rect width="30" height="118" rx="8" fill="rgba(255,252,242,0.82)" stroke="#e2d5c0" />
          <rect x="6" y="10" width="18" height="58" rx="4" fill={colorway.hex} opacity={0.42 + index * 0.1} />
          <rect x="8" y="76" width="14" height="24" rx="2" fill={label} />
          <text x="15" y="90" textAnchor="middle" fontFamily="Manrope" fontSize="4" fill="#6b6251">
            2 ML
          </text>
          <rect x="3" y="0" width="24" height="12" rx="4" fill="#3c3a31" />
        </g>
      ))}
      <text
        x="210"
        y="132"
        textAnchor="middle"
        fontFamily="Fraunces"
        fontSize="24"
        fill={label}
        opacity="0.9"
      >
        five trails
      </text>
    </g>
  );
}

function TravelCase({ uid, colorway, label }) {
  return (
    <g>
      <ellipse cx="210" cy="338" rx="126" ry="18" fill="#1c1b16" opacity="0.13" />
      <rect x="92" y="152" width="236" height="172" rx="30" fill={`url(#case-${uid})`} />
      <rect x="110" y="170" width="200" height="136" rx="22" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.18" strokeDasharray="5 5" />
      <path d="M110 238h200" stroke="#2d2a22" strokeWidth="4" opacity="0.23" />
      <circle cx="310" cy="238" r="9" fill="#c7a864" />
      <path d="M210 138c-20 0-30 10-30 26v8h60v-8c0-16-10-26-30-26z" fill="none" stroke="#5a5648" strokeWidth="5" />
      <Wordmark x="210" y="300" fill={label} size="9" />
    </g>
  );
}

function Club({ uid, colorway, label }) {
  return (
    <g>
      <ellipse cx="210" cy="344" rx="126" ry="17" fill="#1c1b16" opacity="0.14" />
      <g transform="rotate(2 210 210)">
        <rect x="104" y="126" width="212" height="206" rx="18" fill={`url(#pack-${uid})`} />
        <rect x="104" y="126" width="212" height="34" rx="18" fill="#fff" opacity="0.12" />
        <circle cx="210" cy="224" r="66" fill={label} opacity="0.95" />
        <path
          d="M176 224a34 34 0 0 1 58-24M244 224a34 34 0 0 1-58 24"
          fill="none"
          stroke={colorway.hex}
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path d="M234 190l10 11-14 6z" fill={colorway.hex} />
        <path d="M186 258l-10-11 14-6z" fill={colorway.hex} />
        <Wordmark x="210" y="314" fill={label} size="10" />
        <text x="210" y="328" textAnchor="middle" fontFamily="Manrope" fontSize="6.5" letterSpacing="1.5" fill={label} opacity="0.65">
          REFILL CLUB · SAVE 15%
        </text>
      </g>
    </g>
  );
}

export default function ProductArt({ product, color, className = "" }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  if (!product) return null;
  const colorway = resolveColor(product, color) || {
    hex: product.art?.base || "#8b9878",
    soft: "#e8e0d0",
    name: "Signature",
  };
  const label = product.art?.label || "#f4eddc";
  const base = product.art?.base || colorway.hex;
  const accent = product.art?.accent || "#c49176";

  const kind = product.art?.kind || "diffuser";

  return (
    <div className={`product-art art-${product.art?.bg || "sand"} ${className}`}>
      <svg viewBox="0 0 420 420" role="img" aria-label={`${product.name} illustration`}>
        <defs>
          <linearGradient id={`body-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={colorway.soft || "#eee"} />
            <stop offset="45%" stopColor={colorway.hex} />
            <stop offset="100%" stopColor={colorway.hex} />
          </linearGradient>
          <linearGradient id={`dial-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.08" />
          </linearGradient>
          <linearGradient id={`pack-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={accent} />
            <stop offset="100%" stopColor={base} />
          </linearGradient>
          <linearGradient id={`box-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#efdfc6" />
            <stop offset="100%" stopColor="#d9c2a0" />
          </linearGradient>
          <linearGradient id={`case-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={accent} />
            <stop offset="100%" stopColor={base} />
          </linearGradient>
          <filter id={`grain-${uid}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.045" />
            </feComponentTransfer>
          </filter>
        </defs>
        <rect width="420" height="420" filter={`url(#grain-${uid})`} opacity="0.7" />
        <circle cx="210" cy="200" r="158" fill="#ffffff" opacity="0.12" />
        <circle cx="210" cy="200" r="158" fill="none" stroke="#ffffff" strokeOpacity="0.18" />
        {kind === "diffuser" && <Diffuser uid={uid} colorway={colorway} label={label} />}
        {kind === "refill" && <Refill uid={uid} colorway={colorway} label={label} />}
        {kind === "bundle" && <Bundle uid={uid} colorway={colorway} label={label} />}
        {kind === "starter" && <Starter uid={uid} colorway={colorway} label={label} />}
        {kind === "discovery" && <Discovery uid={uid} colorway={colorway} label={label} />}
        {kind === "case" && <TravelCase uid={uid} colorway={colorway} label={label} />}
        {kind === "club" && <Club uid={uid} colorway={colorway} label={label} />}
      </svg>
    </div>
  );
}
