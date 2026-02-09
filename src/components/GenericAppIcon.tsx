import React from 'react';

export default function GenericAppIcon({ size = 48, icon }: { size?: number; icon?: string }) {
  return (
    <div>
      {icon && <img className="rounded-md" src={icon} width={size} height={size} />}
      {!icon && (
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        className="rounded-xl bg-white/5"
        style={{ background: 'rgba(229, 231, 235, 0.10)' }}></svg>)}
    </div>
  );
}
