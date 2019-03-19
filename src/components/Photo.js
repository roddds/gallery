import * as React from "react";
import posed from "react-pose";
import "./gallery.css";

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const Box = posed.div({
  normal: {
    x: () => randomInt(-15, 15),
    y: () => randomInt(-15, 15),
    rotate: () => `${randomInt(-15, 15)}deg`,
  },
  hovered: {
    x: ({ distance, angle }) => distance * Math.cos(angle),
    y: ({ distance, angle }) => distance * Math.sin(angle),
    rotate: () => `${randomInt(-15, 15)}deg`,
  },
});

const Photo = props => {
  const angle = randomInt(0, 360);
  const distance = randomInt(50, 100);

  return (
    <Box
      angle={angle}
      distance={distance}
      className="photo--wrapper"
      key={props.index}
      pose={props.hover ? "hovered" : "normal"}
    >
      <div className="photo--wrapper__frame">
        <img src={props.src} />
      </div>
    </Box>
  );
};

export default Photo;
