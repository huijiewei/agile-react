import { List } from '@chakra-ui/layout';
import metismenujs from 'metismenujs';
import { PropsWithChildren, useEffect, useRef } from 'react';

type MetismenuProps = {
  className?: string;
  toggle: boolean;
};

const Metismenu = (props: PropsWithChildren<MetismenuProps>) => {
  const { children, className, toggle } = props;

  const elemRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const mm =
      elemRef.current &&
      new metismenujs(elemRef.current, { toggle: toggle, subMenu: 'List', triggerElement: 'span.mm-item' });

    return () => {
      mm && mm.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <List className={`metismenu ${className}`} ref={elemRef}>
      {children}
    </List>
  );
};

export { Metismenu };
