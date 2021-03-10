import { useId } from '@shared/hooks/useId';
import { useControllableProp } from '@shared/hooks/useControllable';
import { useCallback, useState } from 'react';
import { callAllHandlers } from '@shared/utils/function';

export interface UseDisclosureProps {
  isOpen?: boolean;
  defaultIsOpen?: boolean;

  onClose?(): void;

  onOpen?(): void;

  id?: string;
}

export const useDisclosure = (props: UseDisclosureProps = {}): UseDisclosureReturn => {
  const { onClose: onCloseProp, onOpen: onOpenProp, isOpen: isOpenProp, id: idProp } = props;

  const [isOpenState, setIsOpen] = useState(props.defaultIsOpen || false);
  const [isControlled, isOpen] = useControllableProp(isOpenProp, isOpenState);

  const id = useId(idProp, 'disclosure');

  const onClose = useCallback(() => {
    if (!isControlled) {
      setIsOpen(false);
    }
    onCloseProp?.();
  }, [isControlled, onCloseProp]);

  const onOpen = useCallback(() => {
    if (!isControlled) {
      setIsOpen(true);
    }
    onOpenProp?.();
  }, [isControlled, onOpenProp]);

  const onToggle = useCallback(() => {
    const action = isOpen ? onClose : onOpen;
    action();
  }, [isOpen, onOpen, onClose]);

  return {
    isOpen: isOpen,
    onOpen,
    onClose,
    onToggle,
    isControlled,
    getButtonProps: (props: unknown = {}) => ({
      ...props,
      'aria-expanded': 'true',
      'aria-controls': id,
      onClick: callAllHandlers(props.onClick, onToggle),
    }),
    getDisclosureProps: (props: unknown = {}) => ({
      ...props,
      hidden: !isOpen,
      id,
    }),
  };
};

export type UseDisclosureReturn = ReturnType<typeof useDisclosure>;
