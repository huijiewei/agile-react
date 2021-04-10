import { css } from '@emotion/react';
import metismenujs from 'metismenujs';
import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { chakra } from '@chakra-ui/react';
import { formatUrl } from '@shared/utils/util';

type MetismenuProps = {
  toggle: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  menus: any[];
};

const metismenu = css`
  .mm-item {
    display: block;
    height: 50px;
    line-height: 50px;
    padding: 0 20px;
    cursor: pointer;
  }

  .mm-item:hover {
    background-color: gray;
  }

  .mm-collapse:not(.mm-show) {
    display: none;
  }

  .mm-collapsing {
    position: relative;
    height: 0;
    overflow: hidden;
    transition-timing-function: ease;
    transition-duration: 0.35s;
    transition-property: height, visibility;
  }
`;

const MetismenuElem = ({ menu }) => {
  return menu.url ? (
    <chakra.a as={NavLink} className="mm-item" to={formatUrl(menu.url)}>
      {menu.label}
    </chakra.a>
  ) : (
    <chakra.span className="mm-item">{menu.label}</chakra.span>
  );
};

const MetismenuItem = ({ menu, keyPrefix }) => {
  return (
    <li>
      <MetismenuElem menu={menu} />

      {menu.children && (
        <chakra.ul>
          {menu.children.map((subMenu, subIdx) => (
            <MetismenuItem key={keyPrefix + '-' + subIdx} keyPrefix={keyPrefix + '-' + subIdx} menu={subMenu} />
          ))}
        </chakra.ul>
      )}
    </li>
  );
};

const Metismenu = (props: MetismenuProps) => {
  const { toggle, menus } = props;

  const elemRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const mm =
      elemRef.current && new metismenujs(elemRef.current, { toggle: toggle, subMenu: 'ul', triggerElement: 'span' });

    return () => {
      mm && mm.dispose();
    };
  }, [toggle, elemRef.current]);

  return (
    <chakra.ul css={metismenu} ref={elemRef}>
      {menus.map((menu, idx) => (
        <MetismenuItem key={'mm-' + idx} keyPrefix={'mm-' + idx} menu={menu} />
      ))}
    </chakra.ul>
  );
};

export { Metismenu };