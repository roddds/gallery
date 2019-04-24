import * as React from "react";
import { Helmet } from "react-helmet";
import AlbumLink from "../components/AlbumLink";

const ListTemplate = props => {
  const ctx = props.pageContext;

  const albums = ctx.albums.map(album => (
    <a href={album} key={album}>
      <AlbumLink album={album} photos={ctx.allPhotos[album]} />
    </a>
  ));

  return (
    <>
      <Helmet>
        <title>Gallery</title>
      </Helmet>
      {albums}
    </>
  );
};

export default ListTemplate;
