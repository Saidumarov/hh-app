import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import React from "react";
import { COLORS, FONTS, SIZES } from "../../constants";

export default function Footer({ url }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.heartBtn}>
        <Image
          source={require("../../assets/icons/heart-outline.png")}
          resizeMode="contain"
          style={styles.heartBtnIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.applyBtn}
        onPress={() => Linking.openURL(url)}
      >
        <Text style={styles.applyBtnText}>Apply</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: SIZES.small,
    justifyContent: "space-between",
    alignContent: "center",
    flexDirection: "row",
    backgroundColor: "rgb(18, 18, 18)",
  },
  heartBtn: {
    width: 55,
    height: 55,
    borderWidth: 1,
    borderColor: "rgb(0, 196, 101)",
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  heartBtnIcon: {
    width: "40%",
    height: "40%",
    tintColor: "rgb(0, 196, 101)",
  },
  applyBtn: {
    flex: 1,
    backgroundColor: "rgb(0, 196, 101)",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: SIZES.medium,
    borderRadius: SIZES.medium,
  },
  applyBtnText: {
    color: COLORS.lightWhite,
    fontSize: SIZES.medium,
    fontFamily: FONTS.bold,
  },
});
