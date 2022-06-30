import React from 'react';
import "./index.css"
import Skeleton from '@material-ui/lab/Skeleton';

export default function CircleCard() {
  return (
    <div>
      <Skeleton variant="circle" width={120} height={120} style={{marginTop: '15px'}} />
      <Skeleton variant="text" width={130}  />
    </div>
  );
}