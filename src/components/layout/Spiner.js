import React from 'react';
import spinner from './spinner.gif';

export default function Spiner() {
  return (
    <div>
      <img
        src={spinner}
        alt="Loading..."
        style={{ width: '200px', margin: 'auto', display: 'block' }}
      />
    </div>
  );
}
