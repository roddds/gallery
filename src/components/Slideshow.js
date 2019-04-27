import * as React from "react";
import { useState, useEffect } from "react";
import { navigate } from "gatsby";
import posed from "react-pose";
import Button from "./Button";
import useArrows from "../hooks/useArrows";

const Img = posed.img({});

function SlideShow(props) {
  const { photos } = props;
  const [current, setCurrent] = useState(0);
  const [titleVisible, setTitleVisible] = useState(true);

  const n = photos.length;
  const next = () => setCurrent(c => c + 1);
  const prev = () => setCurrent(c => c - 1);

  useArrows({
    left: prev,
    right: next,
    up: () => navigate("/"),
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTitleVisible(false);
    }, 1000);

    return () => clearTimeout(timeout);
  });

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
