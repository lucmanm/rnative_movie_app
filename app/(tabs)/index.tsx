import { ActivityIndicator, FlatList, Image, Pressable, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { useQuery } from "@tanstack/react-query";
import { fetchTopRatedMovies } from "@/actions/getmovies";
import { TMovies } from "@/lib/types";
import { Link } from "expo-router";
import ErrorMessage from "@/components/error-message";

export default function TabOneScreen() {
  const { data, isLoading, error } = useQuery<TMovies[]>({
    queryKey: ["topRatedMovies"],
    queryFn: fetchTopRatedMovies,
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }
  return (
    <FlatList
      data={data}
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
