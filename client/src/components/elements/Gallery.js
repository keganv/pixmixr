import React, { useState, useRef, useEffect } from 'react';

const Gallery = props => {
  const numResults = useRef(props.results.length);
  const [index, setIndex] = useState(0);
  const [backgroundImage, setBackgroundImage] = useState(props.results[index].urls.full);

  useEffect(() => {
    if (props.interval) {
      const t = setInterval(() => {
        setBackgroundImage(props.results[index].urls.full);
        numResults.current > 1 && setIndex(index + 1);
      }, props.interval * 1000);

      if (index === (numResults.current - 1)) {
        clearInterval(t);
      }

      return () => {
        clearInterval(t);
      };
    }
  });

  return (
    <>
      <div id="gallery" style={{backgroundImage: `url(${backgroundImage})`}}></div>
    </>
  );
};

export default Gallery;
