import {View} from "react-native";
import {Stack} from "expo-router";

export default function EditForm() {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Stack.Screen
                options={{
                    title: "Labot",
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