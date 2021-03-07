export interface ButtonTheme {
  size?: 'sm' | 'base' | 'lg' | 'xl';
  variant?: 'solid' | 'ghost' | 'outline' | 'link';
  colorScheme?: string;
}

export const defaultButtonTheme = {
  variant: 'solid',
  size: 'base',
  colorScheme: 'blue',
};
