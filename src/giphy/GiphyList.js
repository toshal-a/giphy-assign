import { SafeAreaView, View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native"
import React, { useCallback, useEffect, useState, useContext } from "react"
import GiphyItem from "./components/GiphyItem"
import ActivityIndicatorCustomised from "./components/ActivityIndicatorCustomised";
import { fetchProducts, fetchSearchResults } from "./network/network";
import CustomTextInput from "./components/CustomTextInput";
import ThemeContext from "../context/ThemContext";
import { ThemeStyle } from "../utils/themeStyle";

const initialSearchResponse = {
    data: [],
    total: 0,
    skip: 0,
    limit: 10,
}

const GiphyList = () => {
    const [searchResponse, setSearchResponse] = useState(initialSearchResponse);
    const [searchText, setSearchText] = useState('')

    const {theme, toggleTheme} = useContext(ThemeContext);

    const handleToggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        toggleTheme(newTheme);
    };


    const [trendingResponse, setTrendingResponse] = useState({
        data: [],
        total: 0,
        skip: 0,
        limit: 10,
    });

    const [loading, setLoading] = useState(false);
    const [isSearch, setSearching] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = useCallback(() => {
        if (loading) return;
        setLoading(true);
        const {
            limit,
            skip
        } = trendingResponse;
        fetchProducts(limit, skip)
            .then((responseData) => {
                console.log("fetchProducts", responseData);
                setTrendingResponse((prevData) => {
                    return {
                        data: [...prevData.data, ...responseData.data],
                        total: responseData.pagination?.total_count ?? 0,
                        skip: prevData.skip + responseData.data.length,
                        limit: responseData?.pagination?.count ?? 0,
                    }
                });

                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [trendingResponse.data, loading])

    const searchGiphs = useCallback((textChanged, text) => {
        if (!textChanged && loading) return;
        setLoading(true);
        const {
            limit,
            skip
        } = searchResponse;
        fetchSearchResults(limit, skip, text)
            .then((responseData) => {
                console.log("fetchSearchResults", responseData);
                setSearchResponse((prevData) => {
                    return {
                        data: [...prevData.data, ...responseData.data],
                        total: responseData?.pagination?.total_count ?? 0,
                        skip: prevData.skip + responseData.data.length,
                        limit: responseData?.pagination?.count ?? 0,
                    }
                });

                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [searchResponse, loading, searchText, isSearch])

    const onSearchTextChange = (text) => {
        if (text.length > 0 && text != searchText) {
            setSearchText(text);
            setSearching(true);
            setSearchResponse(initialSearchResponse);
            searchGiphs(true, text);
        } else if (text != searchText) {
            setSearchText(text);
            setSearching(false);
            setSearchResponse(initialSearchResponse);
        }

    }

    const getNewData = useCallback(async () => {
        const {
            data,
            total
        } = trendingResponse;

        if (data.length < total) {
            console.log("fetching new data");
            loadData();
        }
    }, [trendingResponse.data, loading]);

    const {
        data,
    } = trendingResponse;

    const themeText = `Switch to ${theme === 'light' ? 'Dark' : 'Light'} Theme`
    const {
        data: searchData
    } = searchResponse;
    return (
        <SafeAreaView
            style={
                theme === 'light' ? ThemeStyle.whiteContainer : ThemeStyle.darkContainer
            }
        >
            <View>
                <Text
                    style={theme === 'light' ? ThemeStyle.lightThemeText : ThemeStyle.darkThemeText}
                >Giphy List</Text>
            </View>
            <TouchableOpacity
                onPress={handleToggleTheme}
                style={{
                    marginTop: 10,
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    backgroundColor: theme === 'light' ? '#fff' : '#000',
                }}>
                <Text style={theme === 'light' ? ThemeStyle.lightThemeText : ThemeStyle.darkThemeText}>
                    {themeText}
                </Text>
            </TouchableOpacity>
            <CustomTextInput
                onTextChange={onSearchTextChange}
            />
            {
                isSearch
                    ? <FlatList
                        data={searchData}
                        renderItem={({ item, index }) => {
                            return (
                                <GiphyItem item={item} index={index} />
                            )
                        }}
                        onEndReached={() => {
                            searchGiphs(false, searchText);
                        }}
                        keyExtractor={(item, index) => item.id}
                        onEndReachedThreshold={0.2}
                        ListFooterComponent={() => {
                            return loading ?
                                <View>
                                    <ActivityIndicatorCustomised
                                        size={"small"}
                                    />
                                </View>
                                : <View />
                        }}
                    />
                    : <FlatList
                        data={data}
                        renderItem={({ item, index }) => {
                            return (
                                <GiphyItem item={item} index={index} />
                            )
                        }}
                        onEndReached={getNewData}
                        keyExtractor={(item, index) => item.id}
                        onEndReachedThreshold={0.2}
                        ListFooterComponent={() => {
                            return loading ?
                                <View>
                                    <ActivityIndicatorCustomised
                                        size={"small"}
                                    />
                                </View>
                                : <View />
                        }}
                    />
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    darkcontainer: {
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        ...ThemeStyle.darkcontainer,
    },
    lightContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        ...ThemeStyle.lightContainer
    },
    // text: {
    //     color: theme === 'dark' ? 'white' : 'black',
    // },
    // button: {
    //     color: theme === 'dark' ? 'black' : 'white',
    // },
});

export default GiphyList;