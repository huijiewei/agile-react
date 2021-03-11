import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { manager, useModalManager } from '@shared/components/modal/ModalManager';
import { hideOthers, Undo } from 'aria-hidden';
import { useIds } from '@shared/hooks/useId';
import { callAllHandlers } from '@shared/utils/function';
import { PropGetter } from '@shared/utils/types';
import { mergeRefs } from '@shared/utils/react';

export interface UseModalProps {
  isOpen: boolean;
  id?: string;
  onClose(): void;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  onOverlayClick?(): void;
  onEsc?(): void;
  useInert?: boolean;
}

export const useModal = (props: UseModalProps): UseModalReturn => {
  const {
    isOpen,
    onClose,
    id,
    closeOnOverlayClick = true,
    closeOnEsc = true,
    useInert = true,
    onOverlayClick: onOverlayClickProp,
    onEsc,
  } = props;

  const dialogRef = useRef<HTMLElement | null>(null);
  const overlayRef = useRef<HTMLElement | null>(null);

  const [dialogId, headerId, bodyId] = useIds(id, `ag-modal`, `ag-modal--header`, `ag-modal--body`);

  useAriaHidden(dialogRef, isOpen && useInert);

  useModalManager(dialogRef, isOpen);

  const mouseDownTarget = useRef<EventTarget | null>(null);

  const onMouseDown = useCallback((event: MouseEvent) => {
    mouseDownTarget.current = event.target;
  }, []);

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();

        if (closeOnEsc) {
          onClose?.();
        }

        onEsc?.();
      }
    },
    [closeOnEsc, onClose, onEsc]
  );

  const [headerMounted, setHeaderMounted] = useState(false);
  const [bodyMounted, setBodyMounted] = useState(false);

  const getDialogProps: PropGetter = useCallback(
    (props: { onClick?: () => void } = {}, ref = null) => ({
      role: 'dialog',
      ...props,
      ref: mergeRefs(ref, dialogRef),
      id: dialogId,
      tabIndex: -1,
      'aria-modal': true,
      'aria-labelledby': headerMounted ? headerId : undefined,
      'aria-describedby': bodyMounted ? bodyId : undefined,
      onClick: callAllHandlers(props.onClick, (event: MouseEvent) => event.stopPropagation()),
    }),
    [bodyId, bodyMounted, dialogId, headerId, headerMounted]
  );

  const onOverlayClick = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation();

      if (mouseDownTarget.current !== event.target) {
        return;
      }

      if (!manager.isTopModal(dialogRef)) {
        return;
      }

      if (closeOnOverlayClick) {
        onClose?.();
      }

      onOverlayClickProp?.();
    },
    [onClose, closeOnOverlayClick, onOverlayClickProp]
  );

  const getDialogContainerProps: PropGetter = useCallback(
    (props: { onClick?: () => void; onKeyDown?: () => void; onMouseDown?: () => void } = {}, ref = null) => ({
      ...props,
      ref: mergeRefs(ref, overlayRef),
      onClick: callAllHandlers(props.onClick, onOverlayClick),
      onKeyDown: callAllHandlers(props.onKeyDown, onKeyDown),
      onMouseDown: callAllHandlers(props.onMouseDown, onMouseDown),
    }),
    [onKeyDown, onMouseDown, onOverlayClick]
  );

  return {
    isOpen,
    onClose,
    headerId,
    bodyId,
    setBodyMounted,
    setHeaderMounted,
    dialogRef,
    overlayRef,
    getDialogProps,
    getDialogContainerProps,
  };
};

export type UseModalReturn = ReturnType<typeof useModal>;

const useAriaHidden = (ref: RefObject<HTMLElement>, shouldHide: boolean): void => {
  useEffect(() => {
    if (!ref.current) {
      return undefined;
    }

    let undo: Undo | null = null;

    if (shouldHide && ref.current) {
      undo = hideOthers(ref.current);
    }

    return () => {
      if (shouldHide) {
        undo?.();
      }
    };
  }, [shouldHide, ref]);
};
