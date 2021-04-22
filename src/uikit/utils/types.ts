export type Merge<T, P> = P & Omit<T, keyof P>;
export type Booleanish = boolean | 'true' | 'false';
