import * as React from "react";
import Case from "case";
import { useState } from "react";
import posed from "react-pose";
import PhotoMiniature from "./PhotoMiniature";

const Box = posed.div({
  enter: { opacity: 1 },
  exit: { opacity: 0 },
});

const AlbumLink = props => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="album--link__wrapper"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="album--name__wrapper">
        <Box pose={hover ? "enter" : "exit"} className="album--name">
          {Case.title(props.album.replace("photos/", ""))}
        </Box>
      </div>
      <div className="album--link">
        {props.photos.map(photo => (
          <PhotoMiniature key={photo} src={photo} hover={hover} />
        ))}
      </div>
    </div>
  );
};

export default AlbumLink;
