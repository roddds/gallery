import * as React from "react";
import { Helmet } from "react-helmet";
import AlbumCollection from "../components/AlbumCollection";

const ListTemplate = props => {
  const { albums, allPhotos } = props.pageContext;

  return (
    <>
      <Helmet>
        <title>Gallery</title>
      </Helmet>
      <AlbumCollection albums={albums} photos={allPhotos} />
    </>
  );
};

export default ListTemplate;
