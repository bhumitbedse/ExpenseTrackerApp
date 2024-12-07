export type ThemeType = 'midnight' | 'galaxy' | 'ocean';

export interface Theme {
  name: ThemeType;
  background: string;
  cardBg: string;
  cardHover: string;
  text: string;
  textMuted: string;
  border: string;
  input: {
    background: string;
    border: string;
    focus: string;
  };
  button: {
    primary: string;
    primaryHover: string;
  };
}