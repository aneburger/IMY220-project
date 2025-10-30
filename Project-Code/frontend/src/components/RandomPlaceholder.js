/* Ane' Burger 24565068, 33 */

import React from "react";

const PLACEHOLDERS = [
  "/assets/images/smile.png",
  "/assets/images/wink.png",
  "/assets/images/smiley.png",
  "/assets/images/happy.png"
];

// func converts a string key val to an idx
function getIdxFromKey(key, length) {
  if (!key) return Math.floor(Math.random() * length); // ret random idx if key is false
  let h = 0;
  for (let i = 0; i < key.length; i++) {
    h = (h * 31 + key.charCodeAt(i)) | 0; // computes hash val
  }
  return Math.abs(h) % length;
}

// userKey is the user's ._id or user.username
const RandomPlaceholderImage = ({ userKey, size = 150, alt = "profile", className = "", style = {}, radius = "50%" }) => {
  const idx = getIdxFromKey(String(userKey || ""), PLACEHOLDERS.length);
  const src = PLACEHOLDERS[idx];

  return (
    <img alt={alt} src={src} width={size} height={size} className={className} style={{ borderRadius: radius, objectFit: "cover", ...style }} />
  );
}

export default RandomPlaceholderImage;