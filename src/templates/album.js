import * as React from "react";
import Case from "case";
import { Helmet } from "react-helmet";
import Slideshow from "../components/Slideshow";

const AlbumTemplate = props => {
  const ctx = props.pageContext;

  return (
    <>
      <Helmet>
        <title>{Case.title(ctx.name)}</title>
      </Helmet>
      <Slideshow {...ctx} />
    </>
  );
};

export default AlbumTemplate;
