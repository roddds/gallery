import { useState } from "react";
import { isMobile } from "react-device-detect";

function useDesktopHover() {
  const [hover, setHover] = useState(false);

  if (isMobile) {
    return [hover, {}];
  }

  const handlers = {
    onMouseEnter: () => setHover(true),
    onTouchStart: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onTouchEnd: () => setHover(false),
  };

  return [hover, handlers];
}

export default useDesktopHover;
