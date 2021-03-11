import Icon, { IconProps } from '@shared/components/icon/Icon';
import { forwardRef, ReactElement } from 'react';
import { __DEV__ } from '@shared/utils/assertion';

interface CreateIconOptions {
  viewBox?: string;
  path?: ReactElement | ReactElement[];
  d?: string;
  displayName?: string;
  defaultProps?: IconProps;
}

export const createIcon = (options: CreateIconOptions): createIconReturnType => {
  const { viewBox = '0 0 24 24', d: pathDefinition, path, displayName, defaultProps = {} } = options;

  const IconComponent = forwardRef<SVGElement, IconProps>((props, ref) => (
    <Icon ref={ref} viewBox={viewBox} {...defaultProps} {...props}>
      {path ?? <path fill="currentColor" d={pathDefinition} />}
    </Icon>
  ));

  if (__DEV__) {
    IconComponent.displayName = displayName;
  }

  return IconComponent;
};

type createIconReturnType = ReturnType<typeof createIcon>;
