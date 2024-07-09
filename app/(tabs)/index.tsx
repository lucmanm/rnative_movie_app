import { ActivityIndicator, FlatList, Image, Pressable, StyleSheet } from "react-native";

import { Text } from "@/components/Themed";
import { TMovies } from "@/lib/types";
import { Link } from "expo-router";
import ErrorMessage from "@/components/error-message";
import { getUpcomingMovies } from "@/actions/movie-list";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function TabOneScreen() {
  const { data, isLoading, error, fetchNextPage } = useInfiniteQuery<TMovies[]>({
    queryKey: ["getUpcomingMovies"],
    queryFn:  getUpcomingMovies,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => pages.length + 1,
  });

  if (isLoading) {
    return (
      <ActivityIndicator style={{ flex: 1, justifyContent: "center", alignItems: "center" }} />
    );
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }
  const movieList = data?.pages.flat();
  return (
    <FlatList
      onEndReached={() => {
        fetchNextPage();
      }}
      data={movieList}
      numColumns={2}
      columnWrapperStyle={{ gap: 10 }}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      renderItem={({ item }) => (
        <Link href={`/${item.id}`} asChild>
          <Pressable style={styles.container}>
            <Image
              source={{
                uri: `${process.env.EXPO_PUBLIC_THE_MOVIE_DB_IMAGES_URL}/${item.poster_path}`,
              }}
              style={styles.image}
            />
            <Text style={styles.title}>{item.title}</Text>
          </Pressable>
        </Link>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 20,
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 5,
  },
  image: {
    width: "100%",
    aspectRatio: 3 / 5,
  },
});
