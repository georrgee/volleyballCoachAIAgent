import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { Text } from "react-native";
import { styles } from "./styles";
import { ThemedTextProps } from "./types";

const ThemedText: React.FC<ThemedTextProps> = (props) => {

  const { lightColor, darkColor, type = "default", style, ...rest } = props;

  const colorValue = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const color = Array.isArray(colorValue) ? colorValue[0] : colorValue;

  return (
    <Text
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        style,
      ]} 
      {...rest} />
  );
};

export default ThemedText;