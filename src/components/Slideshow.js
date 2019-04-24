import * as React from "react";
import { useState, useEffect } from "react";

const imageStyle = { maxWidth: "100vw", maxHeight: "100vh" };

function SlideShow(props) {
  const { photos } = props;
  const [current, setCurrent] = useState(0);

  const n = photos.length;
  const next = () => setCurrent(c => c + 1);
  const prev = () => setCurrent(c => c - 1);

  const leftKey = e => e.key === "ArrowLeft";
  const rightKey = e => e.key === "ArrowRight";

  useEffect(() => {
    const handler = e => {
      leftKey(e) && prev();
      rightKey(e) && next();
    };

    document.addEventListener("keydown", handler);

    return () => document.removeEventListener("keydown", handler);
  });

  return (
    <div style={{ textAlign: "center" }}>
      <img
        alt=""
        onClick={next}
        style={imageStyle}
        src={photos[((current % n) + n) % n]}
      />
    </div>
  );
}

export default SlideShow;