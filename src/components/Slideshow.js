import * as React from "react";
import { useState } from "react";
import { navigate } from "gatsby";
import posed from "react-pose";
import Button from "./Button";
import useArrows from "../hooks/useArrows";
import useEsc from "../hooks/useEsc";

const Img = posed.img({});

function SlideShow(props) {
  const { photos } = props;
  const [current, setCurrent] = useState(0);

  const n = photos.length;
  const next = () => setCurrent(c => c + 1);
  const prev = () => setCurrent(c => c - 1);
  const back = () => navigate("/");

  useArrows({
    left: prev,
    right: next,
    up: back,
  });

  useEsc(back);

  return (
    <div className="slideshow--wrapper">
      <Img
        alt=""
        className="slideshow--image"
        onClick={next}
        src={photos[((current % n) + n) % n]}
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
