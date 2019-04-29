import { useEffect } from "react";

function useEsc(handler) {
  useEffect(() => {
    const esc = e => e.key === "Escape" && handler();

    document.addEventListener("keydown", esc);

    return () => document.removeEventListener("keydown", esc);
  });
}

export default useEsc;
