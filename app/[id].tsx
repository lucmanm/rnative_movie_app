import { fetchMoviesDetails } from "@/actions/getmovies";
import { TMoviesDetails } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";
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
      <Stack.Screen
        options={{
          title: data?.original_title,
        }}
      />
      <Image
        source={{
          uri: `${process.env.EXPO_PUBLIC_THE_MOVIE_DB_IMAGES_URL}/${data?.backdrop_path}`,
        }}
        style={{ aspectRatio: 4 / 3 }}
      />
      <Text style={{ padding: 5, fontSize: 16, fontWeight: 600 }}>{data?.original_title}</Text>
      <Text style={{ padding: 5, fontSize: 16, fontWeight: 300 }}>{data?.overview}</Text>
    </View>
  );
};

export default MovieDetails;
