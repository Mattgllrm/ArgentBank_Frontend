import React from "react";

export default function Feature({ icon, title, children }) {
  return (
    <div className="feature-item">
      <img src={icon} alt={title} className="feature-icon" loading="lazy" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{children}</p>
    </div>
  );
}
