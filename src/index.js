import React from 'react';
import ReactDOM from 'react-dom';

function If({ children, condition, strict, debug }) {
  const [truthy, setTruthy] = React.useState(false);
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
        setTruthy(conditionResult);
      } catch (e) {
        if (debug) {
          console.warn('An error occured in the If component:', e);
        }
        if (strict) {
          setTruthy(e);
        }
      }
    }
    evaluateCondition();
  }, [condition, setTruthy, strict, debug]);

  let validChildren = children;

  if (typeof children === 'function') {
    validChildren = children(truthy);
  }

  if (strict) {
    return truthy === false ? null : validChildren;
  }

  return truthy ? validChildren : null;
}

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
