import React, { memo } from 'react';
import { CardPayment } from '@mercadopago/sdk-react';

const MPCardPayment = memo(({ initialization, onSubmit, onReady, onError }) => {
  return (
    <CardPayment
      initialization={initialization}
      onSubmit={onSubmit}
      onReady={onReady}
      onError={onError}
    />
  );
});

export default MPCardPayment;