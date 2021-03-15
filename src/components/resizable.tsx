import './resizable.css';
import React, { useEffect, useState } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
}
const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  const [innerWidth, setWidth] = useState(window.innerWidth);
  const [innerHeight, setHeight] = useState(window.innerHeight);
  const [width, setInitialWidth] = useState(window.innerWidth * 0.75);

  useEffect(() => {
    let timer: any;

    const listener = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setHeight(window.innerHeight);
        setWidth(window.innerWidth);

        if (window.innerWidth * 0.75 < width) {
          setInitialWidth(window.innerWidth * 0.75);
        }
      }, 100);
    };

    window.addEventListener('resize', listener);
    return () => {
      window.removeEventListener('resize', listener);
    };
  }, [width]);

  let resizableProps: ResizableBoxProps;

  if (direction === 'horizontal') {
    resizableProps = {
      className: 'react-horizontal',
      height: Infinity,
      width,
      resizeHandles: ['e'],
      maxConstraints: [innerWidth * 0.75, Infinity],
      minConstraints: [innerWidth * 0.2, Infinity],
      onResizeStop: (event, data) => {
        setInitialWidth(data.size.width);
      },
    };
  } else {
    resizableProps = {
      height: 300,
      width: Infinity,
      resizeHandles: ['s'],
      maxConstraints: [Infinity, innerHeight * 0.9],
      minConstraints: [Infinity, 50],
    };
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
