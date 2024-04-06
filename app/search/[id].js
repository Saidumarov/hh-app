import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, FONTS, SIZES, icons } from "../../constants";
import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
import { HeaderBtn } from "../../components";
import JobCard from "../../components/cards/job-card";
import axios from "axios";

export default function Search() {
  const router = useRouter();
  const params = useGlobalSearchParams();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setpage] = useState(1);

  const handleSearch = async () => {
    setIsLoading(true);
    setData([]);
    try {
      const option = {
        method: "GET",
        url: `https://jsearch.p.rapidapi.com/search`,
        headers: {
          "X-RapidAPI-Key":
            "9d761d3068msh3bb30d13f85fab7p13a4e2jsn85bad2ea3862",
          "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
        },
        params: {
          query: params.id,
          page: page.toString(),
        },
      };

      const { data: res } = await axios.request(option);
      setData(res.data);
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePagination = (direction) => {
    if (direction === "left" && page > 1) {
      setpage(page - 1);
      handleSearch();
    } else if (direction === "right") {
      setpage(page + 1);
      handleSearch();
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "rgb(18, 18, 18)" }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "rgb(18, 18, 18)" },
          headerShadowVisible: false,
          headerTitle: "",
          headerLeft: () => (
            <HeaderBtn
              icon={require("../../assets/icons/left.png")}
              dimensions={"60%"}
              onPress={() => router.back()}
            />
          ),
        }}
      />

      <FlatList
        data={data}
        renderItem={({ item }) => (
          <JobCard
            item={item}
            onPress={() => router.push(`/details/${item.job_id}`)}
          />
        )}
        keyExtractor={(item) => `search-job-${item.job_id}`}
        contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
        ListHeaderComponent={() => (
          <>
            <View style={styles.container}>
              <Text style={styles.searchTitle}>{params.id}</Text>
              <Text style={styles.noOfSearchedJobs}>Job Opportunities</Text>
            </View>
            <View style={styles.loaderWrapper}>
              {isLoading ? (
                <ActivityIndicator size={"small"} color={COLORS.lightWhite} />
              ) : (
                error && <Text>Something went wrong</Text>
              )}
            </View>
          </>
        )}
        ListFooterComponent={() =>
          isLoading ? (
            <></>
          ) : (
            <View style={styles.footerContainer}>
              <TouchableOpacity
                style={styles.paginationBtn}
                onPress={() => handlePagination("left")}
              >
                <Image
                  style={styles.paginationIcon}
                  source={require("../../assets/icons/chevron-left.png")}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <View style={styles.paginationTextWrapper}>
                <Text style={styles.paginationText}>{page}</Text>
              </View>
              <TouchableOpacity
                style={styles.paginationBtn}
                onPress={() => handlePagination("right")}
              >
                <Image
                  style={styles.paginationIcon}
                  source={require("../../assets/icons/chevron-right.png")}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  searchTitle: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.xLarge,
    color: COLORS.lightWhite,
  },
  noOfSearchedJobs: {
    marginTop: 2,
    fontFamily: FONTS.medium,
    fontSize: SIZES.small,
    color: COLORS.gray2,
  },
  loaderWrapper: {
    marginTop: SIZES.medium,
  },
  footerContainer: {
    marginTop: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    marginBottom: 50,
  },
  paginationBtn: {
    width: 30,
    height: 30,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.gray,
  },
  paginationIcon: {
    width: "60%",
    height: "60%",
    tintColor: COLORS.white,
  },
  paginationTextWrapper: {
    width: 30,
    height: 30,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  paginationText: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.medium,
    color: COLORS.primary,
  },
});
