// ui/ButtonTi.jsx
import { PALETTE } from "./palette";

export function ButtonTi({ hue = "rose", variant = "edit", className = "", children, ...props }) {
  const palette = PALETTE[hue] ?? PALETTE.rose;
  const base =
    variant === "delete" ? palette.btnDelete : palette.btnEdit;

  return (
    <button
      className={`${base} font-semibold px-4 py-2 rounded-md shadow-sm transition-colors duration-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
export default ButtonTi;
