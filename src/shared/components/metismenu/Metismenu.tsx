import { css } from '@emotion/react';
import metismenujs from 'metismenujs';
import { useEffect, useMemo, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { chakra } from '@chakra-ui/react';
import { deepSearch, formatUrl } from '@shared/utils/util';
import { cx } from '@chakra-ui/utils';
import { useAuth } from '@admin/services/useAuth';

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
    color: #ecc94b;
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
      marginEnd={'5px'}
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
const MetismenuElem = ({ menu, deep, activePath }: { menu: any; deep: number; activePath: string }) => {
  if (menu.url) {
    const menuUrl = '/' + formatUrl(menu.url);

    return (
      <chakra.a
        style={{ paddingInlineStart: deep * 20 + 'px' }}
        as={Link}
        className={cx('mm-item', menuUrl == activePath && 'mm-active')}
        to={menuUrl}
      >
        {menu.icon && <MetismenuIcon icon={menu.icon} />}
        {menu.label}
      </chakra.a>
    );
  }

  return (
    <chakra.span
      style={{ paddingInlineStart: deep * 20 + 'px' }}
      className={cx('mm-item', menu.children && 'has-arrow')}
    >
      {menu.icon && <MetismenuIcon icon={menu.icon} />}
      {menu.label}
    </chakra.span>
  );
};

const MetismenuItem = ({
  menu,
  deep,
  activePath,
  keyPrefix,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  menu: any;
  deep: number;
  activePath: string;
  keyPrefix: string;
}) => {
  return (
    <li>
      <MetismenuElem deep={deep} activePath={activePath} menu={menu} />

      {menu.children && (
        <ul>
          {menu.children.map(
            (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              subMenu: any,
              subIdx: string
            ) => (
              <MetismenuItem
                deep={deep + 1}
                activePath={activePath}
                key={keyPrefix + '-' + subIdx}
                keyPrefix={keyPrefix + '-' + subIdx}
                menu={subMenu}
              />
            )
          )}
        </ul>
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

  const location = useLocation();
  const { groupMenus } = useAuth();

  const activePath = useMemo<string>(() => {
    const path = location.pathname;

    const paths = path.split('/').filter((split) => split.length > 0);

    const pathTable = [];

    for (let i = paths.length - 1; i >= 0; i--) {
      pathTable.push(paths.slice(0, i + 1));
    }

    for (let i = 0; i < pathTable.length; i++) {
      const url = pathTable[i].join('/');
      const groupMenuUrls = deepSearch('url', groupMenus);
      const find = groupMenuUrls.map((menu) => formatUrl(menu)).includes(url);

      if (find) {
        return '/' + url;
      }
    }

    return path;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, groupMenus]);

  return (
    <chakra.ul className={'metismenu'} css={metismenu} ref={elemRef}>
      {menus.map((menu, idx) => (
        <MetismenuItem deep={1} activePath={activePath} key={'mm-' + idx} keyPrefix={'mm-' + idx} menu={menu} />
      ))}
    </chakra.ul>
  );
};

export { Metismenu };
