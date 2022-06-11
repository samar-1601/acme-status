import * as React from 'react';
import {Checkbox} from 'baseui/checkbox';

export const Uptime =  function () {
  const [checked, setChecked] = React.useState(false);
  return (
    <Checkbox
      checked={checked}
      onChange={() => setChecked(!checked)}
    >
      Display the historical data of this componennt on my status page
    </Checkbox>
  );
}
