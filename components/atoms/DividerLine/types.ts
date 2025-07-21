import { type ViewProps } from "react-native";
/**
 * @author George Garcia
 * @param { string } lightColor ***(OPTIONAL)***
 * @param { string } darkColor ***(OPTIONAL)***
 * @param { DividerType } type ***(OPTIONAL)***
 * @param { DividerThickness } thickness ***(OPTIONAL)***
 * @description Props for the DividerLine Component - Atom
 */

type DividerType = 'horizontal' | 'vertical';
type DividerThickness = 'thin' | 'medium' | 'thick';

export type DividerLineProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  type?: DividerType;
  thickness?: DividerThickness;
};