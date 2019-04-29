import { useEffect } from "react";

function usePreload(src) {
  useEffect(() => {
    const img = new Image();
    img.src = src;
  }, [src]);
}

export default usePreload;
