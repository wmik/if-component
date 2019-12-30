import React from 'react';
import ReactDOM from 'react-dom';

function If({ children, condition, strict, debug }) {
  const [pass, setPass] = React.useState(false);
  React.useEffect(() => {
    if (debug) {
      console.log('%cDebug mode enabled', 'color:purple');
      console.log(
        `%cStrict mode ${strict ? 'enabled' : 'disabled'}`,
        'color:gold'
      );
      console.log(
        `%ctypeof condition: ${Object.prototype.toString
          .call(condition)
          .slice(8, -1)}`,
        'color:limegreen'
      );
    }
  }, [debug, strict, condition]);
  React.useEffect(() => {
    async function evaluateCondition() {
      let conditionResult = false;
      try {
        if (typeof condition === 'function') {
          conditionResult = await condition();
        } else {
          conditionResult = await condition;
        }
        setPass(conditionResult);
      } catch (e) {
        if (debug) {
          console.warn('An error occured in the If component:', e);
        }
        if (strict) {
          setPass(e);
        }
      }
    }
    evaluateCondition();
  }, [condition, setPass, strict, debug]);
  let validChildren = children;
  if (typeof children === 'function') {
    validChildren = children(pass);
  }
  if (strict) {
    return pass === false ? null : validChildren;
  }
  return pass ? validChildren : null;
}

function App() {
  // const [condition, setCondition] = React.useState(true);
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
