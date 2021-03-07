import { Ref, useEffect } from 'react';

class ModalManager {
  modals: unknown[];
  constructor() {
    this.modals = [];
  }

  add(modal: unknown) {
    this.modals.push(modal);
  }

  remove(modal: unknown) {
    this.modals = this.modals.filter((_modal) => _modal !== modal);
  }

  isTopModal(modal: unknown) {
    const topmostModal = this.modals[this.modals.length - 1];
    return topmostModal === modal;
  }
}

export const manager = new ModalManager();

export const useModalManager = (ref: Ref<unknown>, isOpen?: boolean): void => {
  useEffect(() => {
    if (isOpen) {
      manager.add(ref);
    }
    return () => {
      manager.remove(ref);
    };
  }, [isOpen, ref]);
};
