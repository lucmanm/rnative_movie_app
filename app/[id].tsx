import { fetchMoviesDetails } from "@/api/getmovies";
import { TMoviesDetails } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";

const MovieDetails = () => {
  const { id } = useLocalSearchParams();

  const { data, isLoading, error } = useQuery<TMoviesDetails>({
    queryKey: ["movieDetails", id],
    queryFn: () => fetchMoviesDetails(id as string),
  });
  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }


  return (
    <View>
      <Text>{data?.original_title}</Text>
    </View>
  );
};

export default MovieDetails;
