import * as React from "react";
import Case from "case";
import { useState } from "react";
import posed from "react-pose";
import Photo from "./Photo";
import "./gallery.css";

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
          {Case.title(props.album.replace("album/", ""))}
        </Box>
      </div>
      <div className="album--link">
        {props.photos.map(photo => (
          <Photo src={photo.source} key={photo.index} hover={hover} />
        ))}
      </div>
    </div>
  );
};

export default AlbumLink;
