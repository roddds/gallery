import * as React from "react";
import { useState } from "react";
import { navigate } from "gatsby";
import posed from "react-pose";
import Button from "./Button";
import useArrows from "../hooks/useArrows";
import useEsc from "../hooks/useEsc";
import usePreload from "../hooks/usePreload";

const Img = posed.img({});

function SlideShow(props) {
  const { photos } = props;
  const [current, setCurrent] = useState(0);

  const n = photos.length;
  const currentPhotoIndex = ((current % n) + n) % n;

  const next = () => setCurrent(c => c + 1);
  const prev = () => setCurrent(c => c - 1);
  const back = () => navigate("/");

  useArrows({
    left: prev,
    right: next,
    up: back,
  });

  useEsc(back);

  const nextImage = photos[currentPhotoIndex + 1];
  const nextNextImage = photos[currentPhotoIndex + 2];

  usePreload(nextImage);
  usePreload(nextNextImage);

  return (
    <div className="slideshow--wrapper">
      <Img
        alt=""
        className="slideshow--image"
        onClick={next}
        src={photos[currentPhotoIndex]}
      />
      <Button
        onClick={prev}
        direction="left"
        className="slideshow--nav slideshow--nav__left"
      />
      <Button
        onClick={next}
        direction="right"
        className="slideshow--nav slideshow--nav__right"
      />
    </div>
  );
}

export default SlideShow;
