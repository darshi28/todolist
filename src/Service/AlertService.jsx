import * as React from 'react';
import Alert from '@mui/material/Alert';

export default function ColorAlerts(props) {
  return (
    <Alert severity="success" color="info" onClose={() => {}} {...props}>
      Record Update Successfully !
    </Alert>
  );
}