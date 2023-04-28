import { View } from "react-native";
import {SplashScreen, Stack} from "expo-router";
import {useEffect, useState} from "react";
import { DataTable } from 'react-native-paper';
import connect, {sql} from '@databases/expo';

SplashScreen.preventAutoHideAsync();

export default function Home() {
    const [appIsReady, setAppIsReady] = useState(false);

    const [page, setPage] = useState(0);

    useEffect(() => {
        async function prepare() {
            try {
                const db = connect('my-database');
                const ready = db.tx(function* (tx) {
                    yield tx.query(sql`
                        CREATE TABLE IF NOT EXISTS ITEM (
                            ID integer PRIMARY KEY AUTOINCREMENT,
                            NAME text,
                            CATEGORY_ID integer
                        );
                     `);
                });
                console.log(db);
                console.log(ready);
            } catch (e) {
                console.warn(e);
            } finally {
                // Tell the application to render
                setAppIsReady(true);
            }
        }
        prepare().then(async () => {
            const db = connect('my-database');

            const items = await db.query(sql`
                    SELECT * FROM item;
                  `) || undefined;
            console.log(items);
        });
    }, []);


    if (!appIsReady) {
        return null;
    }
    return (
        <>
            {!appIsReady && <SplashScreen />}
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Stack.Screen
                    options={{
                        title: "Katalogs",
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
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>Dessert</DataTable.Title>
                        <DataTable.Title numeric>Calories</DataTable.Title>
                        <DataTable.Title numeric>Fat</DataTable.Title>
                    </DataTable.Header>

                    <DataTable.Row>
                        <DataTable.Cell>Frozen yogurt</DataTable.Cell>
                        <DataTable.Cell numeric>159</DataTable.Cell>
                        <DataTable.Cell numeric>6.0</DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                        <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
                        <DataTable.Cell numeric>237</DataTable.Cell>
                        <DataTable.Cell numeric>8.0</DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Pagination
                        page={page}
                        numberOfPages={3}
                        onPageChange={(page) => setPage(page)}
                        label="1-2 of 6"
                        itemsPerPage={10}
                        showFastPagination
                        optionsLabel={'Rows per page'}
                    />
                </DataTable>
            </View>
        </>
    );
}