import React from 'react';

import './style.css';

function Loading({bgcolor}) {
  return (
      <div className='animationContainer'>
          <div style={{backgroundColor: bgcolor}} className='dot one'></div>
          <div style={{backgroundColor: bgcolor}} className='dot two'></div>
          <div style={{backgroundColor: bgcolor}} className='dot three'></div>
      </div>
  );
}

export default Loading;