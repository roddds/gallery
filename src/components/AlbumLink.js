import * as React from "react";
import Case from "case";
import posed from "react-pose";
import useDesktopHover from "../hooks/useDesktopHover";
import PhotoMiniature from "./PhotoMiniature";

const Box = posed.div({
  enter: { opacity: 1 },
  exit: { opacity: 0 },
});

const AlbumLink = props => {
  const { active } = props;
  const [hover, handlers] = useDesktopHover();

  return (
    <div
      className="album--link--wrapper"
      {...handlers}
      onClick={() => props.onClick()}
    >
      <div className="album--name__wrapper">
        <Box pose={hover || active ? "enter" : "exit"} className="album--name">
          {Case.title(props.album)}
        </Box>
      </div>
      <div className="album--link">
        {props.photos.map(photo => (
          <PhotoMiniature key={photo} src={photo} hover={hover || active} />
        ))}
      </div>
    </div>
  );
};

export default AlbumLink;
