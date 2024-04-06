import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { COLORS, SIZES, tabs, SHADOWS, FONTS } from "../../constants";

export default function JobTabs({ activeTab, setActiveTab }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={tabs}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ columnGap: SIZES.small / 2 }}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.tabBtn(activeTab, item)}
            onPress={() => setActiveTab(item)}
          >
            <Text style={styles.tabText(activeTab, item)}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.medium,
    marginBottom: SIZES.small,
  },
  tabBtn: (activeTab, item) => ({
    paddingVertical: SIZES.medium,
    paddingHorizontal: SIZES.xLarge,
    backgroundColor: item === activeTab ? "rgb(34, 42, 64)" : "rgb(38, 38, 38)",
    borderRadius: SIZES.medium,
    marginLeft: 2,
    ...SHADOWS.medium,
  }),
  tabText: (activeTab, item) => ({
    fontSize: SIZES.small,
    color: COLORS.lightWhite,
    fontFamily: FONTS.medium,
  }),
});
