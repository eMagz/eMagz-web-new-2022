import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';

export default function ProductDetailsSketelen() {

  return (
    <div>
        <Skeleton  /> 
        <Skeleton animation={false} />
        <Skeleton animation="wave" />
      </div>
  );
}