import { RemoveScroll } from 'react-remove-scroll';
import { FC, forwardRef, HTMLAttributes, MouseEvent, ReactElement, ReactNode, RefObject, useEffect } from 'react';
import { __DEV__ } from '@shared/utils/assertion';
import { useModal, UseModalProps, UseModalReturn } from '@shared/components/modal/useModal';
import FocusLock, { FocusLockProps } from '@shared/components/focus-lock/FocusLock';
import { FocusableElement } from '@shared/utils/dom';
import Portal, { PortalProps } from '@shared/components/portal/Portal';
import clsx from 'clsx';
import CloseButton, { CloseButtonProps } from '@shared/components/close-button/CloseButton';
import { callAllHandlers } from '@shared/utils/function';
import { createContext } from '@shared/utils/react';

type ScrollBehavior = 'inside' | 'outside';

interface ModalOptions extends Pick<FocusLockProps, 'lockFocusAcrossFrames'> {
  trapFocus?: boolean;
  autoFocus?: boolean;
  initialFocusRef?: RefObject<FocusableElement>;
  finalFocusRef?: RefObject<FocusableElement>;
  returnFocusOnClose?: boolean;
  blockScrollOnMount?: boolean;
  allowPinchZoom?: boolean;
  preserveScrollBarGap?: boolean;
  isCentered?: boolean;
  scrollBehavior?: ScrollBehavior;
}

export interface ModalProps extends UseModalProps, ModalOptions {
  children: ReactNode;
  portalProps?: Pick<PortalProps, 'appendToParentPortal' | 'containerRef'>;
}

interface ModalContext extends Pick<ModalOptions, 'isCentered' | 'scrollBehavior'>, UseModalReturn {}

const [ModalContextProvider, useModalContext] = createContext<ModalContext>({
  strict: true,
  name: 'ModalContext',
  errorMessage: 'useModalContext: `context` is undefined. Seems you forgot to wrap modal components in `<Modal />`',
});

export const Modal: FC<ModalProps> = (props) => {
  const {
    children,
    portalProps,
    initialFocusRef,
    finalFocusRef,
    autoFocus = true,
    trapFocus = true,
    returnFocusOnClose = true,
    blockScrollOnMount = true,
    allowPinchZoom = false,
    preserveScrollBarGap,
    lockFocusAcrossFrames = true,
    isCentered = false,
    scrollBehavior = 'outside',
  } = props;

  const modal = useModal(props);

  const context = {
    ...modal,
    autoFocus,
    trapFocus,
    initialFocusRef,
    finalFocusRef,
    returnFocusOnClose,
    blockScrollOnMount,
    allowPinchZoom,
    preserveScrollBarGap,
    lockFocusAcrossFrames,
    isCentered,
    scrollBehavior,
  };

  return (
    <ModalContextProvider value={context}>
      {context.isOpen && <Portal {...portalProps}>{children}</Portal>}
    </ModalContextProvider>
  );
};

if (__DEV__) {
  Modal.displayName = 'Modal';
}

export interface ModalContentProps extends HTMLAttributes<HTMLDivElement> {
  containerProps?: HTMLAttributes<HTMLDivElement>;
}

export const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>((props, ref) => {
  const { className, children, containerProps: rootProps, ...rest } = props;

  const { getDialogProps, getDialogContainerProps, isCentered, scrollBehavior } = useModalContext();

  const dialogProps = getDialogProps(rest, ref) as unknown;
  const containerProps = getDialogContainerProps(rootProps);

  const _containerClassNames = clsx(
    'fixed flex h-screen w-screen top-0 left-0 justify-center z-30',
    isCentered ? 'items-center' : 'items-start',
    scrollBehavior === 'inside' ? 'overflow-hidden' : 'overflow-auto'
  );

  const DEFAULTS = 'flex relative w-full flex-col rounded bg-white outline-none max-w-md mt-20 mb-20 z-30';

  const _dialogClassNames = clsx(DEFAULTS, className);

  return (
    <ModalFocusScope>
      <div className={_containerClassNames} {...containerProps}>
        <section className={_dialogClassNames} {...dialogProps}>
          {children}
        </section>
      </div>
    </ModalFocusScope>
  );
});

if (__DEV__) {
  ModalContent.displayName = 'ModalContent';
}

interface ModalFocusScopeProps {
  children: ReactElement;
}

export const ModalFocusScope: FC = (props: ModalFocusScopeProps) => {
  const {
    autoFocus,
    trapFocus,
    dialogRef,
    initialFocusRef,
    blockScrollOnMount,
    allowPinchZoom,
    finalFocusRef,
    returnFocusOnClose,
    preserveScrollBarGap,
    lockFocusAcrossFrames,
  } = useModalContext();

  return (
    <FocusLock
      autoFocus={autoFocus}
      isDisabled={!trapFocus}
      initialFocusRef={initialFocusRef}
      finalFocusRef={finalFocusRef}
      restoreFocus={returnFocusOnClose}
      contentRef={dialogRef}
      lockFocusAcrossFrames={lockFocusAcrossFrames}
    >
      <RemoveScroll
        removeScrollBar={!preserveScrollBarGap}
        allowPinchZoom={allowPinchZoom}
        enabled={blockScrollOnMount}
        forwardProps
      >
        {props.children}
      </RemoveScroll>
    </FocusLock>
  );
};

export interface ModalOverlayProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color' | 'transition'> {
  children?: ReactNode;
}

export const ModalOverlay = forwardRef<HTMLDivElement, ModalOverlayProps>((props, ref) => {
  const { className, ...rest } = props;

  const DEFAULTS = 'fixed w-screen h-screen top-0 left-0 bg-black bg-opacity-50 z-30';

  const _className = clsx(DEFAULTS, className);

  return <div ref={ref} className={_className} {...rest} />;
});

if (__DEV__) {
  ModalOverlay.displayName = 'ModalOverlay';
}

export const ModalHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((props, ref) => {
  const { className, ...rest } = props;

  const { headerId, setHeaderMounted } = useModalContext();

  useEffect(() => {
    setHeaderMounted(true);
    return () => setHeaderMounted(false);
  }, [setHeaderMounted]);

  const _className = clsx('flex-grow-0 flex-shrink px-6 py-5', className);

  return <header ref={ref} className={_className} id={headerId} {...rest} />;
});

if (__DEV__) {
  ModalHeader.displayName = 'ModalHeader';
}

export const ModalBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((props, ref) => {
  const { className, ...rest } = props;
  const { bodyId, setBodyMounted } = useModalContext();

  useEffect(() => {
    setBodyMounted(true);
    return () => setBodyMounted(false);
  }, [setBodyMounted]);

  const _className = clsx('flex-1 px-6 py-2', className);

  return <div ref={ref} className={_className} id={bodyId} {...rest} />;
});

if (__DEV__) {
  ModalBody.displayName = 'ModalBody';
}

export const ModalFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((props, ref) => {
  const { className, ...rest } = props;
  const _className = clsx('flex px-6 py-5 justify-end', className);

  return <footer ref={ref} className={_className} {...rest} />;
});

if (__DEV__) {
  ModalFooter.displayName = 'ModalFooter';
}

export const ModalCloseButton = forwardRef<HTMLButtonElement, CloseButtonProps>((props, ref) => {
  const { onClick, className, ...rest } = props;
  const { onClose } = useModalContext();

  const _className = clsx(className, 'absolute top-3 right-3');

  return (
    <CloseButton
      ref={ref}
      className={_className}
      onClick={callAllHandlers(onClick, (event: MouseEvent) => {
        event.stopPropagation();
        onClose();
      })}
      {...rest}
    />
  );
});

if (__DEV__) {
  ModalCloseButton.displayName = 'ModalCloseButton';
}
