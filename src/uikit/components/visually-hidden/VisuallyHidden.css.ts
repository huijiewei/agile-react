import { style } from '@vanilla-extract/css';

const VisuallyHiddenClassName = style({
  position: 'absolute',
  border: 0,
  width: 1,
  height: 1,
  padding: 1,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
});

export { VisuallyHiddenClassName };
