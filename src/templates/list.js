import * as React from "react";
import AlbumLink from "../components/AlbumLink";

const AlbumList = props => {
  const ctx = props.pageContext;

  return (
    <>
      {ctx.albums.map(album => (
        <a href={album}>
          <AlbumLink album={album} photos={ctx.allPhotos[album]} />
        </a>
      ))}
    </>
  );
};

export default AlbumList;
