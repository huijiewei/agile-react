export const getFirstItem = <T>(array: T[] | null): T | undefined => {
  return array != null && array.length ? array[0] : undefined;
};

export const getLastItem = <T>(array: T[] | null): T | undefined => {
  return array != null && array.length ? array[array.length - 1] : undefined;
};

export const removeIndex = <T>(array: T[], index: number): T[] => {
  return array.filter((_, idx) => idx !== index);
};

export const addItem = <T>(array: T[], item: T): T[] => {
  return [...array, item];
};

export const removeItem = <T>(array: T[], item: T): T[] => {
  return array.filter((eachItem) => eachItem !== item);
};

/**
 * 根据当前索引和步进获取下一个索引
 *
 * @param currentIndex 当前索引
 * @param length 数组长度
 * @param step 步进
 * @param loop 是否循环到开头
 */
export const getNextIndex = (currentIndex: number, length: number, step = 1, loop = true): number => {
  const lastIndex = length - 1;

  if (currentIndex === -1) {
    return step > 0 ? 0 : lastIndex;
  }

  const nextIndex = currentIndex + step;

  if (nextIndex < 0) {
    return loop ? lastIndex : 0;
  }

  if (nextIndex >= length) {
    if (loop) {
      return 0;
    }

    return currentIndex > length ? length : currentIndex;
  }

  return nextIndex;
};

export const getPrevIndex = (currentIndex: number, count: number, loop = true): number => {
  return getNextIndex(currentIndex, count, -1, loop);
};
