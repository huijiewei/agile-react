import { css } from '@emotion/react';
import metismenujs from 'metismenujs';
import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { chakra } from '@chakra-ui/react';
import { formatUrl } from '@shared/utils/util';
import { cx } from '@chakra-ui/utils';

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
    position: relative;
  }

  .has-arrow::after {
    position: absolute;
    width: 0.35em;
    height: 0.35em;
    border-width: 1px 0 0 1px;
    border-style: solid;
    border-color: inherit;
    top: 50%;
    transform: rotate(-45deg) translate(0, -50%);
    transform-origin: top;
    transition: all 0.3s ease-out;
    right: 1em;
    content: '';
  }

  .has-arrow[aria-expanded='true']::after {
    transform: rotate(-135deg) translate(0, -50%);
  }

  .mm-item:hover {
    background-color: gray;
  }

  .mm-item.mm-active {
    color: yellow;
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

const MetismenuIcon = ({ icon }: { icon: string }) => {
  return (
    <chakra.svg
      marginTop={'-2px'}
      marginEnd={1}
      lineHeight={1}
      display={'inline-block'}
      width={'1em'}
      height={'1em'}
      fill={'currentColor'}
      viewBox={'0 0 1024 1024'}
      dangerouslySetInnerHTML={{ __html: icon }}
    />
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MetismenuElem = ({ menu }: { menu: any }) => {
  return menu.url ? (
    <NavLink end className={({ isActive }) => `mm-item ${isActive ? 'mm-active' : ''}`} to={'/' + formatUrl(menu.url)}>
      {menu.icon && <MetismenuIcon icon={menu.icon} />}
      {menu.label}
    </NavLink>
  ) : (
    <chakra.span className={cx('mm-item', menu.children && 'has-arrow')}>
      {menu.icon && <MetismenuIcon icon={menu.icon} />}
      {menu.label}
    </chakra.span>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MetismenuItem = ({ menu, keyPrefix }: { menu: any; keyPrefix: string }) => {
  return (
    <li>
      <MetismenuElem menu={menu} />

      {menu.children && (
        <chakra.ul>
          {menu.children.map(
            (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              subMenu: any,
              subIdx: string
            ) => (
              <MetismenuItem key={keyPrefix + '-' + subIdx} keyPrefix={keyPrefix + '-' + subIdx} menu={subMenu} />
            )
          )}
        </chakra.ul>
      )}
    </li>
  );
};

const Metismenu = (props: MetismenuProps): JSX.Element => {
  const { toggle, menus } = props;

  const elemRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const mm =
      elemRef.current && menus.length > 0
        ? new metismenujs(elemRef.current, { toggle: toggle, subMenu: 'ul', triggerElement: 'span' })
        : null;

    return () => {
      mm && mm.dispose();
    };
  }, [toggle, menus]);

  return (
    <chakra.ul className={'metismenu'} css={metismenu} ref={elemRef}>
      {menus.map((menu, idx) => (
        <MetismenuItem key={'mm-' + idx} keyPrefix={'mm-' + idx} menu={menu} />
      ))}
    </chakra.ul>
  );
};

export { Metismenu };
