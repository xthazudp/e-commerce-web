import React from 'react';

const Layout = ({
  title = 'Title',
  description = 'Description',
  children,
  className,
}) => {
  return (
    <div>
      <div class='bg-success p-3 rounded text-white'>
        <h3>{title}</h3>
        <p className='lead'>{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
  );
};

export default Layout;
