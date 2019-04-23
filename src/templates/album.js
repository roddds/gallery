import * as React from "react";
import Slideshow from "../components/Slideshow";

const AlbumTemplate = props => {
  const ctx = props.pageContext;

  return <Slideshow {...ctx} />;
};

export default AlbumTemplate;
