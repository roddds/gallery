import * as React from "react";
import { Link } from "gatsby";

const AlbumList = props => {
  const ctx = props.pageContext;

  return (
    <>
      {ctx.albums.map(album => (
        <p>
          <Link to={album}>{album.replace("album/", "")}</Link>
        </p>
      ))}
    </>
  );
};

export default AlbumList;
