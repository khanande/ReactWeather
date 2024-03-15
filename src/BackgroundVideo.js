import React from 'react';
import videoFile from './images/bg.mp4';

const BackgroundVideo = () => {
  return (
    <div className="background-video">
      <video autoPlay muted loop id="bgVideo">
        <source src={videoFile} type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
    </div>
  );
};

export default BackgroundVideo;
