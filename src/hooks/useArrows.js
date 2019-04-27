import { useEffect } from "react";

const leftKey = e => e.key === "ArrowLeft";
const rightKey = e => e.key === "ArrowRight";
const upKey = e => e.key === "ArrowUp";
const downKey = e => e.key === "ArrowDown";

const useArrows = arrows => {
  const handlers = {
    up: () => null,
    down: () => null,
    left: () => null,
    right: () => null,
    ...arrows,
  };

  return useEffect(() => {
    const handler = e => {
      leftKey(e) && handlers.left();
      rightKey(e) && handlers.right();
      upKey(e) && handlers.up();
      downKey(e) && handlers.down();
    };

    document.addEventListener("keydown", handler);

    return () => document.removeEventListener("keydown", handler);
  });
};

export default useArrows;
