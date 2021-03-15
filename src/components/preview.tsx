import './preview.css';
import React, { useRef, useEffect } from 'react';

interface PrevieProps {
  code: string;
}

const html = `
   <html>
      <head>
      <style>
        html { background-color: #fff }
      </style>
      </head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener('message', (event) => {
            try {
              eval(event.data)
            } catch(err) {
              const root  = document.querySelector('#root');
              root.innerHTML = '<div style="color:red"><h4>Runtime Error:</h4>' + err + '</div>';
              console.error(err);
            }
          }, false);
        </script>
      </body>
    </html>
  `;

const Preview: React.FC<PrevieProps> = ({ code }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, '*');
    }, 50);
  }, [code]);
  return (
    <div className='preview-wrapper'>
      <iframe
        ref={iframe}
        srcDoc={html}
        title='preview'
        sandbox='allow-scripts'
      />
    </div>
  );
};

export default Preview;
