import React, { useState } from "react";
import AlbumLink from "../components/AlbumLink";
import { isBrowser } from "react-device-detect";
import { navigate } from "gatsby";

function AlbumCollection(props) {
  const { albums, photos } = props;
  const [active, setActive] = useState(null);

  const albumLinks = albums.map(album => {
    const isActive = active === album;
    return (
      <AlbumLink
        album={album}
        key={album}
        photos={photos[album]}
        active={isActive}
        onClick={() => {
          if (isActive || isBrowser) {
            navigate(album);
          } else {
            setActive(album);
          }
        }}
      />
    );
  });

  return <div className="album--container">{albumLinks}</div>;
}

export default AlbumCollection;
