import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import useRequest from "../../hook/useRequest";
import { FONTS, SIZES } from "../../constants";
import MyJobCard from "../cards/my-job-card";

export default function MyJobs() {
  const [selectedJob, setSelectedJob] = useState(null);

  const { data, isLoading, error } = useRequest("search", {
    query: "React native",
    page: "1",
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jobs for you</Text>

      <View style={styles.jobsContainer}>
        {isLoading ? (
          <ActivityIndicator size={"small"} color={"rgb(81, 153, 240)"} />
        ) : error ? (
          <Text style={styles.something}>Something went wrong</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <MyJobCard
                item={item}
                selectedJob={selectedJob}
                setSelectedJob={setSelectedJob}
              />
            )}
            keyExtractor={(item) => `job-${item.job_id}`}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            scrollEnabled={false}
            nestedScrollEnabled={true}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.xLarge,
  },
  title: {
    fontSize: SIZES.xLarge,
    fontFamily: FONTS.bold,
    color: "#fff",
  },
  jobsContainer: {
    marginTop: SIZES.medium,
  },
  something: {
    fontSize: SIZES.xLarge,
    fontFamily: FONTS.bold,
    color: "white",
    paddingTop: 50,
    textAlign: "center",
  },
});
