import { useEffect, useRef, useState } from 'react';
import { BoxProps, chakra } from '@chakra-ui/react';
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import { css } from '@emotion/react';

const eventMap: Record<string, string> = {
  onScrollY: 'ps-scroll-y',
  onScrollX: 'ps-scroll-x',
  onScrollUp: 'ps-scroll-up',
  onScrollDown: 'ps-scroll-down',
  onScrollLeft: 'ps-scroll-left',
  onScrollRight: 'ps-scroll-right',
  onYReachStart: 'ps-y-reach-start',
  onYReachEnd: 'ps-y-reach-end',
  onXReachStart: 'ps-x-reach-start',
  onXReachEnd: 'ps-x-reach-end',
};

type ScrollbarProps = {
  options?: PerfectScrollbar.Options;
  onUpdate?: (ps: PerfectScrollbar) => void;
  events?: {
    onScrollY?: (event: Event) => void;
    onScrollX?: (event: Event) => void;
    onScrollUp?: (event: Event) => void;
    onScrollDown?: (event: Event) => void;
    onScrollLeft?: (event: Event) => void;
    onScrollRight?: (event: Event) => void;
    onYReachStart?: (event: Event) => void;
    onYReachEnd?: (event: Event) => void;
    onXReachStart?: (event: Event) => void;
    onXReachEnd?: (event: Event) => void;
  };
} & BoxProps;

const scrollbar = css`
  .ps__rail-x {
    height: 6px;
  }

  .ps__rail-y {
    width: 6px;
  }

  .ps__thumb-x {
    background-color: #ddd;
    border-radius: 2px;
  }

  .ps__thumb-y {
    background: #ddd;
    border-radius: 2px;
    right: 0;
  }

  .ps__rail-x:hover,
  .ps__rail-y:hover,
  .ps__rail-x:focus,
  .ps__rail-y:focus,
  .ps__rail-x.ps--clicking,
  .ps__rail-y.ps--clicking {
    background-color: transparent;
  }

  .ps__rail-x:hover > .ps__thumb-x,
  .ps__rail-x:focus > .ps__thumb-x,
  .ps__rail-x.ps--clicking .ps__thumb-x {
    background-color: #ddd;
    height: 6px;
  }

  .ps__rail-y:hover > .ps__thumb-y,
  .ps__rail-y:focus > .ps__thumb-y,
  .ps__rail-y.ps--clicking .ps__thumb-y {
    background-color: #ddd;
    width: 6px;
  }
`;

const Scrollbar = (props: ScrollbarProps): JSX.Element => {
  const { children, options, events, onUpdate = (ps) => ps.update(), ...restProps } = props;

  const elemRef = useRef<HTMLDivElement>(null);
  const [ps, setPs] = useState<PerfectScrollbar>();

  useEffect(() => {
    if (elemRef.current) {
      setPs(new PerfectScrollbar(elemRef.current, { ...options, wheelPropagation: false }));
    }

    return () => {
      ps && ps.destroy();
    };
  }, [options]);

  useEffect(() => {
    if (elemRef.current && events) {
      Object.entries(events).forEach(([event, callback]) => {
        elemRef.current && elemRef.current.addEventListener(eventMap[event], callback);
      });
    }

    return () => {
      if (elemRef.current && events) {
        Object.entries(events).forEach(([event, callback]) => {
          elemRef.current && elemRef.current.removeEventListener(eventMap[event], callback);
        });
      }
    };
  }, [events]);

  useEffect(() => {
    if (elemRef.current && ps) {
      onUpdate(ps);
    }
  });

  return (
    <chakra.div css={scrollbar} overflowY={'hidden'} position={'relative'} ref={elemRef} {...restProps}>
      {children}
    </chakra.div>
  );
};

export { Scrollbar };
