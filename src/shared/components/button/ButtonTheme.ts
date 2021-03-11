export interface ButtonTheme {
  size?: 'sm' | 'base' | 'lg';
  variant?: 'solid' | 'ghost' | 'outline' | 'link';
  colorScheme?: string;
}

export const defaultButtonTheme = {
  variant: 'solid',
  size: 'base',
  colorScheme: 'blue',
};
