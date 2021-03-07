import { FC, ReactNode, RefObject, useCallback } from 'react';
import { getAllFocusable, focus, FocusableElement } from '@shared/utils/dom';
import ReactFocusLock from 'react-focus-lock';
import { __DEV__ } from '@shared/utils/assertion';

export interface FocusLockProps {
  initialFocusRef?: RefObject<FocusableElement>;
  finalFocusRef?: RefObject<FocusableElement>;
  contentRef?: RefObject<HTMLElement>;
  restoreFocus?: boolean;
  children: ReactNode;
  isDisabled?: boolean;
  autoFocus?: boolean;
  persistentFocus?: boolean;
  lockFocusAcrossFrames?: boolean;
}

const FocusLock: FC<FocusLockProps> = (props) => {
  const {
    initialFocusRef,
    finalFocusRef,
    contentRef,
    restoreFocus,
    children,
    isDisabled,
    autoFocus,
    persistentFocus,
    lockFocusAcrossFrames,
  } = props;

  const onActivation = useCallback(() => {
    if (initialFocusRef?.current) {
      initialFocusRef.current.focus();
    } else if (contentRef?.current) {
      const focusables = getAllFocusable(contentRef.current);

      if (focusables.length === 0) {
        focus(contentRef.current);
      }
    }
  }, [initialFocusRef, contentRef]);

  const onDeactivation = useCallback(() => {
    finalFocusRef?.current?.focus();
  }, [finalFocusRef]);

  const returnFocus = restoreFocus && !finalFocusRef;

  return (
    <ReactFocusLock
      crossFrame={lockFocusAcrossFrames}
      persistentFocus={persistentFocus}
      autoFocus={autoFocus}
      disabled={isDisabled}
      onActivation={onActivation}
      onDeactivation={onDeactivation}
      returnFocus={returnFocus}
    >
      {children}
    </ReactFocusLock>
  );
};

if (__DEV__) {
  FocusLock.displayName = 'FocusLock';
}

export default FocusLock;
