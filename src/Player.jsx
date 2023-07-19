import React from 'react';
import ReactPlayer from 'react-player';

function Player() {
  return (
    <>
      <div>
        <ReactPlayer url="https://www.youtube.com/watch?v=IGQbgkNFMhk" controls={true} width="480px" height="360px" />
      </div>
    </>
  );
}

export default Player;
