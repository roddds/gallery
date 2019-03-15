import * as React from "react";

const Album = props => {
  const ctx = props.pageContext;

  return (
    <>
      {ctx.name}
      {ctx.photos.map(photo => (
        <img src={photo.source} />
      ))}
    </>
  );
};

export default Album;
