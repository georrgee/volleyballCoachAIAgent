import { type TextProps } from "react-native";

/**
 * @author George Garcia
 * @param { string } lightColor ***(OPTIONAL)***
 * @param { string } darkColor ***(OPTIONAL)****
 * @param { } type ***(OPTIONAL)****
 * @description Props for the ThemeText Component - Atom
 */

type ThemeTextType = 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?:  string;
  type?:       ThemeTextType;
};
