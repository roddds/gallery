import * as React from "react";

const PhotoTemplate = props => {
  const ctx = props.pageContext;

  return (
    <>
      <p>{ctx.album}</p>

      <p>
        <img alt={ctx.source} src={ctx.source} />
      </p>
    </>
  );
};

export default PhotoTemplate;
