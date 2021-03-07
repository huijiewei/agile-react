import { canUseDOM } from '@shared/utils/dom';
import { useEffect, useLayoutEffect } from 'react';

export const useSafeLayoutEffect = canUseDOM() ? useLayoutEffect : useEffect;
