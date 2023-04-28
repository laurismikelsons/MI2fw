import { View } from "react-native";
import { Stack } from "expo-router";

export default function AddForm() {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Stack.Screen
                options={{
                    title: "Pievienot",
                    headerLargeTitle: true,
                    headerSearchBarOptions: {
                        onChangeText: (event) => {
                            // Update the query params to match the search query.
                            router.setParams({
                                q: event.nativeEvent.text,
                            });
                        },
                    },
                }}
            />
        </View>
    );
}