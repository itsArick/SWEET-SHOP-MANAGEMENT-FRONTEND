import React from 'react';
import Container from './Container';

const Section = ({ 
  children, 
  className = '',
  containerSize = 'default',
  padding = 'default',
  background = 'transparent',
  ...props 
}) => {
  const paddings = {
    none: '',
    sm: 'py-8',
    default: 'py-12',
    lg: 'py-16',
    xl: 'py-20',
  };

  const backgrounds = {
    transparent: '',
    white: 'bg-white',
    gray: 'bg-gray-50',
    primary: 'bg-primary-50',
    dark: 'bg-gray-900 text-white',
  };

  const classes = `${paddings[padding]} ${backgrounds[background]} ${className}`;

  return (
    <section className={classes} {...props}>
      <Container size={containerSize}>
        {children}
      </Container>
    </section>
  );
};

export default Section;