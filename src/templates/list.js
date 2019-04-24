import * as React from "react";
import { Helmet } from "react-helmet";
import AlbumLink from "../components/AlbumLink";

const ListTemplate = props => {
  const { albums, allPhotos } = props.pageContext;

  const albumLinks = albums.map(album => (
    <a href={album} key={album}>
      <AlbumLink album={album} photos={allPhotos[album]} />
    </a>
  ));

  return (
    <>
      <Helmet>
        <title>Gallery</title>
      </Helmet>
      {albumLinks}
    </>
  );
};

export default ListTemplate;
