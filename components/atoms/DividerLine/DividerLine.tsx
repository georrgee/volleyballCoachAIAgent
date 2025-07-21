import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { View } from "react-native";
import { styles } from "./styles";
import { DividerLineProps } from "./types";

const DividerLine: React.FC<DividerLineProps> = (props) => {
  
  const {
    lightColor,
    darkColor,
    type = "horizontal",
    thickness = "thin",
    style,
    ...rest
  } = props;

  const colorValue = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const color = Array.isArray(colorValue) ? colorValue[0] : colorValue;

  return (
    <View
      style={[
        { backgroundColor: color },
        type === "horizontal" ? styles.horizontal : styles.vertical,
        thickness === "thin" ? styles.thin : undefined,
        thickness === "medium" ? styles.medium : undefined,
        thickness === "thick" ? styles.thick : undefined,
        style,
      ]}
      {...rest}
    />
  );
};

export default DividerLine;