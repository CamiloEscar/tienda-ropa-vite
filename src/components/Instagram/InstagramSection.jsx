import React from 'react';
import InstagramFeed from 'react-instagram-feed';

const InstagramSection = () => {
  return (
    <InstagramFeed
      username="tu_usuario"
      limit={6}
    />
  );
};

export default InstagramSection;
