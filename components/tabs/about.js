import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { COLORS, FONTS, SIZES } from "../../constants";

export default function About({ info }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About this job:</Text>

      <View style={styles.contentBox}>
        <Text style={styles.contentText}>{info}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.large,
    backgroundColor: "rgb(18, 18, 18)",
    borderRadius: SIZES.medium,
    paddingHorizontal: SIZES.medium,
  },
  title: {
    fontSize: SIZES.large,
    color: COLORS.lightWhite,
    fontFamily: FONTS.bold,
  },
  contentBox: {
    marginTop: SIZES.medium,
  },
  contentText: {
    fontSize: SIZES.small,
    color: COLORS.lightWhite,
    fontFamily: FONTS.regular,
  },
});
