import { getMoviesDetails } from "@/actions/getmovies";
import { TMoviesDetails } from "@/lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Image, Pressable, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { saveMovieToWatcList } from "@/actions/watch-list";
const MovieDetails = () => {
  const [isPressed, setIsPressed] = useState(false);
  const { id } = useLocalSearchParams();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<TMoviesDetails>({
    queryKey: ["movieDetails", id],
    queryFn: () => getMoviesDetails(Number(id)),
  });

  const { mutate: addMovieToWatcList } = useMutation({
    mutationFn: () => saveMovieToWatcList(id as string),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getWatchListMovies"],
        refetchType: "active",
      });
    },
  });

  if (isLoading) {
    return (
      <ActivityIndicator style={{ flex: 1, justifyContent: "center", alignItems: "center" }} />
    );
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
      {/* Button */}
      <Pressable
        onPress={() => addMovieToWatcList()}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        style={{
          position: "absolute",
          right: 10,
          bottom: 150,
          backgroundColor: isPressed ? "#64748b" : "#0f172a",
          flexDirection: "row",
          justifyContent: "center",
          borderRadius: 20,
          padding: 10,
          alignItems: "center",
          gap: 10,
          marginHorizontal: "auto",
        }}
      >
        <Feather style={{ color: "#f1f5f9" }} name="book" size={24} color="black" />
      </Pressable>
      <Text style={{ padding: 5, fontSize: 16, fontWeight: 300 }}>{data?.overview}</Text>
    </View>
  );
};

export default MovieDetails;
