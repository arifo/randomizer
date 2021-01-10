export const AnimationSequence = (animations, onStepStart) => {
  let current = 0;
  return {
    start: callback => {
      const onComplete = result => {
        if (!result.finished) {
          callback && callback(result);
          return;
        }

        current += 1;

        if (current === animations.length) {
          callback && callback(result);
          return;
        }

        onStepStart && onStepStart({ current });
        animations[current].start(onComplete);
      };

      if (animations.length === 0) {
        callback && callback({ finished: true });
      } else {
        onStepStart && onStepStart({ current });
        animations[current].start(onComplete);
      }
    },

    stop: () => {
      if (current < animations.length) {
        animations[current].stop();
      }
    },

    reset: () => {
      animations.forEach((animation, idx) => {
        if (idx <= current) {
          animation.reset();
        }
      });
      current = 0;
    },

    _startNativeLoop: () => {
      throw new Error(
        'Loops run using the native driver cannot contain Animated.sequence animations',
      );
    },

    _isUsingNativeDriver: () => false,
  };
};
