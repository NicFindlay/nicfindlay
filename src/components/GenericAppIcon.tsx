export default function GenericAppIcon({ size = 48, icon }: { size?: number; icon?: string }) {
  if (!icon) {
    return (
      <div
        className="app-icon shrink-0 rounded-[22%] border border-white/8 bg-white/[0.04]"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <img
      src={icon}
      alt=""
      width={size}
      height={size}
      className="app-icon shrink-0 rounded-[22%] border border-white/8 object-cover"
      style={{ width: size, height: size }}
    />
  );
}
