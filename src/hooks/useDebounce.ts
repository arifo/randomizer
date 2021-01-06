import React from 'react';

const useLatest = <T extends any>(current: T) => {
  const storedValue = React.useRef(current);
  React.useEffect(() => {
    storedValue.current = current;
  });
  return storedValue;
};

export const useDebounceCallback = <CallbackArgs extends any[]>(
  callback: (...args: CallbackArgs) => void,
  wait = 100,
  leading = false,
): ((...args: CallbackArgs) => void) => {
  const storedCallback = useLatest(callback);
  const timeout = React.useRef<ReturnType<typeof setTimeout>>();
  const deps = [wait, leading, storedCallback];
  // Cleans up pending timeouts when the deps change
  React.useEffect(
    () => () => {
      timeout.current && clearTimeout(timeout.current);
      timeout.current = void 0;
    },
    deps,
  );

  return React.useCallback(function() {
    // eslint-disable-next-line prefer-rest-params
    const args = arguments;
    const { current } = timeout;
    // Calls on leading edge
    if (current === void 0 && leading) {
      timeout.current = setTimeout(() => {
        timeout.current = void 0;
      }, wait);
      // eslint-disable-next-line prefer-spread
      return storedCallback.current.apply(null, args as any);
    }
    // Clear the timeout every call and start waiting again
    current && clearTimeout(current);
    // Waits for `wait` before invoking the callback
    timeout.current = setTimeout(() => {
      timeout.current = void 0;
      storedCallback.current.apply(null, args as any);
    }, wait);
  }, deps);
};
