import React from 'react';

export default function If({
  children,
  condition,
  strictTrue,
  strictFalse,
  debug
}) {
  const [truthy, setTruthy] = React.useState(false);

  React.useEffect(() => {
    if (debug) {
      console.log('%cDebug mode enabled', 'color:purple');
      console.log(
        `%cStrict mode ${strictTrue || strictFalse ? 'enabled' : 'disabled'}`,
        'color:gold'
      );
      console.log(
        `%ctypeof condition: ${Object.prototype.toString
          .call(condition)
          .slice(8, -1)}`,
        'color:limegreen'
      );
    }
  }, [debug, strictTrue, strictFalse, condition]);

  React.useEffect(() => {
    async function evaluateCondition() {
      let conditionResult = false;
      try {
        if (typeof condition === 'function') {
          conditionResult = await condition();
        } else {
          conditionResult = await condition;
        }
        if (strictTrue && conditionResult === true) {
          setTruthy(conditionResult);
        } else if (!strictTrue) {
          setTruthy(conditionResult);
        }
      } catch (e) {
        if (debug) {
          console.warn('An error occured in the If component:', e);
        }
        if (strictFalse) {
          setTruthy(e);
        }
      }
    }

    evaluateCondition();
  }, [condition, setTruthy, strictFalse, strictTrue, debug]);

  let nestedContent = children;

  if (typeof children === 'function') {
    nestedContent = children(truthy);
  }

  if (strictTrue) {
    return truthy === true ? nestedContent : null;
  }

  if (strictFalse) {
    return truthy === false ? null : nestedContent;
  }

  return truthy ? nestedContent : null;
}
