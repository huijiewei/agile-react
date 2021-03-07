import { cloneElement, FC, forwardRef, HTMLAttributes, isValidElement, ReactElement } from 'react';
import { __DEV__ } from '@shared/utils/assertion';
import { useButtonGroup } from '../button/ButtonGroup';
import clsx from 'clsx';
import { dataAttr } from '@shared/utils/dom';
import Spinner from '@shared/components/spinner/Spinner';
import { ButtonTheme, defaultButtonTheme } from '@shared/components/button/ButtonTheme';
import { StringOrNumber } from '@shared/utils/types';

const ButtonIcon: FC<HTMLAttributes<HTMLSpanElement>> = (props) => {
  const { children, ...rest } = props;

  const _children = isValidElement(children)
    ? cloneElement(children, {
        'aria-hidden': true,
        focusable: false,
      })
    : children;

  return <span {...rest}>{_children}</span>;
};

if (__DEV__) {
  ButtonIcon.displayName = 'ButtonIcon';
}

interface ButtonSpinnerProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  spacing?: number;
}

const ButtonSpinner: FC<ButtonSpinnerProps> = (props) => {
  const { label, spacing = 2, children = <Spinner color="current" />, className, ...rest } = props;

  const _className = clsx(
    className,
    'align-middle flex',
    label ? 'relative' : 'absolute',
    'mr-' + (label ? spacing : 0)
  );

  return (
    <span className={_className} {...rest}>
      {children}
    </span>
  );
};

if (__DEV__) {
  ButtonSpinner.displayName = 'ButtonSpinner';
}

const BUTTON_SIZES = {
  sm: 'py-1.5 px-3',
  base: 'py-2.5 px-5',
  lg: 'py-4 px-5',
  xl: 'py-5 px-6',
};

interface ButtonOptions {
  /**
   * 是否加载状态.
   */
  isLoading?: boolean;
  /**
   * 是否激活状态
   */
  isActive?: boolean;
  /**
   * 是否禁用状态
   */
  isDisabled?: boolean;
  /**
   * 如果 `isLoading` 为 true, 需要显示的文本, 如果没有设置只显示 spinner
   */
  loadingText?: string;
  /**
   * 是否全宽度
   */
  isFullWidth?: boolean;
  /**
   * 按钮系统类型
   */
  type?: 'button' | 'reset' | 'submit';
  /**
   * 左侧图片
   * @type React.ReactElement
   */
  leftIcon?: ReactElement;
  /**
   * 右侧图标
   * @type React.ReactElement
   */
  rightIcon?: ReactElement;
  /**
   * 图标和文本标签间距
   * @type StringOrNumber
   */
  iconSpacing?: StringOrNumber;
  /**
   * Spinner 组件替换
   * @type React.ReactElement
   */
  spinner?: ReactElement;

  /**
   * 是否纯图标按钮
   */
  isIconButton?: boolean;
}

interface ButtonProps extends HTMLAttributes<HTMLButtonElement>, ButtonTheme, ButtonOptions {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const group = useButtonGroup();

  const {
    size = group?.size || defaultButtonTheme.size,
    variant = group?.variant || defaultButtonTheme.variant,
    colorScheme = group?.colorScheme || defaultButtonTheme.colorScheme,
    isDisabled = group?.isDisabled || false,
    isLoading = false,
    isActive = false,
    isFullWidth = false,
    leftIcon,
    rightIcon,
    loadingText,
    iconSpacing = 2,
    type = 'button',
    spinner,
    className,
    children,
    ...rest
  } = props;

  const isAttached = group?.isAttached || false;

  const DEFAULTS = `inline-flex leading-none focus:outline-none items-center justify-center border align-middle select-none appearance-none relative whitespace-nowrap outline-none transition-colors duration-200 text-${size}`;

  const STYLES = {
    solid: `focus:ring focus:ring-${colorScheme}-200 bg-${colorScheme}-500 text-white hover:bg-${colorScheme}-400 active:bg-${colorScheme}-600 border-transparent`,
    outline: clsx(
      `focus:ring focus:ring-${colorScheme}-200 bg-transparent text-${colorScheme}-600 hover:bg-${colorScheme}-50`,
      isAttached
        ? `first:border-l-${colorScheme}-600 last:border-r-${colorScheme}-600 border-l-transparent border-r-transparent border-t-${colorScheme}-600 border-b-${colorScheme}-600`
        : `border-${colorScheme}-600`
    ),
    ghost: `focus:ring focus:ring-${colorScheme}-200 hover:bg-${colorScheme}-50 text-${colorScheme}-600 border-transparent`,
    link: `hover:underline text-${colorScheme}-500 border-transparent`,
    disabled: 'opacity-50 cursor-not-allowed',
  };

  const _classNames = clsx(
    className,
    DEFAULTS,
    isAttached ? 'first:rounded-l last:rounded-r focus:z-1' : 'rounded',
    isFullWidth ? 'w-full' : 'w-auto',
    {
      [STYLES.disabled]: isDisabled || isLoading,
      [STYLES[variant]]: variant,
      [BUTTON_SIZES[size]]: size && variant !== 'link',
    }
  );

  return (
    <button
      type={type}
      data-active={dataAttr(isActive)}
      data-loading={dataAttr(isLoading)}
      disabled={isDisabled || isLoading}
      className={_classNames}
      ref={ref}
      {...rest}
    >
      {leftIcon && !isLoading && <ButtonIcon className={`mr-${iconSpacing}`}>{leftIcon}</ButtonIcon>}
      {isLoading && <ButtonSpinner label={loadingText}>{spinner}</ButtonSpinner>}
      {isLoading ? loadingText || <span className={'opacity-0'}>{children}</span> : children}
      {rightIcon && !isLoading && <ButtonIcon className={`ml-${iconSpacing}`}>{rightIcon}</ButtonIcon>}
    </button>
  );
});

if (__DEV__) {
  Button.displayName = 'Button';
}

export default Button;
