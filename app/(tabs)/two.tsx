import { ActivityIndicator, FlatList, Image, Pressable, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TMovies } from "@/lib/types";
import { Link } from "expo-router";
import ErrorMessage from "@/components/error-message";
import { getWatchListMovies } from "@/actions/watch-list";
import { AntDesign } from "@expo/vector-icons";
import { deleteWatchListMovies } from "@/actions/watch-list";

export default function TabTwoScreen() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<TMovies[]>({
    queryKey: ["getWatchListMovies"],
    queryFn: getWatchListMovies,
  });

  const { mutate: deleteMovieToWatcList } = useMutation({
    mutationFn: (id: number) => deleteWatchListMovies(id),
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
            {/* Delete */}
            <Pressable
              onPress={() => deleteMovieToWatcList(item.id)}
              style={{
                borderWidth: 2,
                padding: 5,
                borderRadius: 20,
                position:"absolute",
                bottom: 40,
                right: 10,
                borderColor: "#dc2626",
                backgroundColor: "#dc2626"
              }}
            >
              <AntDesign style={{color: "#f1f5f9"}}name="delete" size={24} color="black" />
            </Pressable>
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
