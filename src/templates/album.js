import * as React from "react";
import Album from "../components/Album";

const AlbumTemplate = props => {
  const ctx = props.pageContext;
  console.log({ ctx });

  return (
    <>
      {ctx.photos.map(photo => (
        <img src={photo.source} />
      ))}
    </>
  );
};

export default AlbumTemplate;
