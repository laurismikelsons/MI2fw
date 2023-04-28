import {
    ThemeProvider,
    DarkTheme
} from "@react-navigation/native";
import { Provider as PaperProvider } from 'react-native-paper';
import {Tabs} from 'expo-router';

export default function Layout() {
    return (
        <PaperProvider>
            <ThemeProvider value={DarkTheme}>
                <Tabs>
                    <Tabs.Screen
                        name="index"
                        options={{
                            title: "Katalogs",
                            href: {
                                pathname: "/",
                            },
                        }}
                    />
                    <Tabs.Screen
                        name="addForm"
                        options={{
                            title: "Pievienot",
                            href: {
                                pathname: "/addForm",
                            },
                        }}
                    />
                    <Tabs.Screen
                        name="editForm"
                        options={{
                            title: "Labot",
                            href: {
                                pathname: "/editForm",
                            },
                        }}
                    />
                    <Tabs.Screen
                        name="recipes"
                        options={{
                            title: "Receptes",
                            href: {
                                pathname: "/recipes",
                            },
                        }}
                    />
                </Tabs>
            </ThemeProvider>
        </PaperProvider>
    )
}