import * as React from "react";
import { useState, useEffect } from "react";
import posed from "react-pose";

const Img = posed.img({});
const Header = posed.p({
  enter: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
    transition: { duration: 5000 },
  },
});

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

function SlideShow(props) {
  const { photos } = props;
  const [current, setCurrent] = useState(0);
  const [titleVisible, setTitleVisible] = useState(true);

  const n = photos.length;
  const next = () => setCurrent(c => c + 1);
  const prev = () => setCurrent(c => c - 1);

  useArrows({
    left: prev,
    right: next,
    up: () => window.history.back(),
  });

  useEffect(() => {
    setTimeout(() => {
      setTitleVisible(false);
    }, 1000);
  });

  return (
    <div className="slideshow--wrapper">
      <Header
        pose={titleVisible ? "enter" : "exit"}
        key="header"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          color: "#ddd",
        }}
      >
        use your arrow keys
      </Header>
      <Img
        alt=""
        className="slideshow--image"
        onClick={next}
        src={photos[((current % n) + n) % n]}
      />
    </div>
  );
}

export default SlideShow;
