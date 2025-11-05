// ui/carti.jsx
import { PALETTE } from "./palette";

export function Cardti({ children, hue = "rose", className = "", ...props }) {
  const palette = PALETTE[hue] ?? PALETTE.rose;
  return (
    <div
      className={`${palette.card} p-6 rounded-xl w-full h-full shadow-md ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
export default Cardti;
