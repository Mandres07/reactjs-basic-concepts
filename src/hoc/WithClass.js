import React from 'react';

const WithClass = ({ classes, children }) => {
   return (
      <div className={classes}>{children}</div>
   );
}

export default WithClass;