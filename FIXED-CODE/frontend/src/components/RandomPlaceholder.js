import React, { useMemo } from "react";

const PLACEHOLDERS = [
  "/assets/images/smile.png",
  "/assets/images/wink.png",
  "/assets/images/smiley.png",
  "/assets/images/happy.png",
];

function hashString(str = "") {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rng(seed) {
  let x = seed || 123456789;
  return () => {
    x ^= x << 13; x ^= x >>> 17; x ^= x << 5;
    return (x >>> 0) / 0xffffffff;
  };
}

const RandomPlaceholderImage = ({
  userKey,                
  size = 150,
  alt = "profile",
  className = "",
  style = {},
  radius = "50%",          
}) => {
  const { src, filter } = useMemo(() => {
    const seed = hashString(String(userKey || ""));
    const rnd = rng(seed);

    const idx = Math.floor(rnd() * PLACEHOLDERS.length);
    const hue = Math.floor(rnd() * 360);            
    const sat = 0.85 + rnd() * 0.5;                 
    const bright = 0.9 + rnd() * 0.25;              
    const contrast = 0.95 + rnd() * 0.2;            

    return {
      src: PLACEHOLDERS[idx],
      filter: `hue-rotate(${hue}deg) saturate(${sat}) brightness(${bright}) contrast(${contrast})`,
    };
  }, [userKey]);

  return (
    <img
      alt={alt}
      src={src}
      width={size}
      height={size}
      style={{ borderRadius: radius, objectFit: "cover", filter, ...style }}
      className={className}
    />
  );
}

export default RandomPlaceholderImage;