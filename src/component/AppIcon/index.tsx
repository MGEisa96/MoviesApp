import { View, Text, TouchableOpacity, StyleSheet, Image, ViewStyle, ImageSourcePropType, ImageStyle } from "react-native";
import React from "react";

interface AppIconProps {
    onPress:()=>void;
    iconStyle?: ImageStyle;
    icon: ImageSourcePropType;
    iconWrapperStyle?: ViewStyle;
    disabled?: boolean;
}
export default function AppIcon({
    onPress,
    icon,
    iconWrapperStyle,
    iconStyle,
    disabled,
}:AppIconProps) {
  return (
    <TouchableOpacity 
    disabled={disabled}
    style={[styles.iconWrapperStyle, iconWrapperStyle]}
    onPress={onPress}
    >
    <Image source={icon} style={[styles.iconStyle, iconStyle]} resizeMode={"contain"}/>
    </TouchableOpacity>

  );
}
const styles = StyleSheet.create({
    iconWrapperStyle: {
        width: 30,
        height: 30,
    },
    iconStyle: {
        width: 30,
        height: 30,
    },
});