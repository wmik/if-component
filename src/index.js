import React from 'react';
import ReactDOM from 'react-dom';

import If from './If';

function App() {
  return (
    <div>
      <If debug strict condition={0}>
        {text => text}
      </If>
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
