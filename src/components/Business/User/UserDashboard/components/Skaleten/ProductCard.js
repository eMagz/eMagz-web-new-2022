import React from 'react';
import "./index.css"
import Skeleton from '@material-ui/lab/Skeleton';

const cardArray = [1,2,,3,4]
export default function ProductCard() {
  return (
    <div className="card_skaleten-container">
     {cardArray.map((i)=>(
          <div key={i}>
          <Skeleton variant="rect" width={230} height={218} />
          <Skeleton variant="text" width={200}  />
          <Skeleton variant="text" width={200}  />
          </div>
     ))}
    </div>
  );
}