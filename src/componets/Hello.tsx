// Hello.tsx
import React from 'react';

type HelloProps = {
  name: string;  // Type the 'name' prop as a string
};

const Hello: React.FC<HelloProps> = ({ name }) => {
  return <h1>Hello, {name}!</h1>;
};

export default Hello;
