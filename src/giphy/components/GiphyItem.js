import { View, Text, Image, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import ThemeContext from "../../context/ThemContext";
import { ThemeStyle } from "../../utils/themeStyle";

const GiphyItem = ({item}) => {

    const {theme} = useContext(ThemeContext);

//   const handleToggleTheme = () => {
//     const newTheme = theme === 'light' ? 'dark' : 'light';
//     toggleTheme(newTheme);
//   };

    // console.log(item.images.original.url)

    return (
        <View style={[
            styles.rowContainer,
            theme === 'light' ? ThemeStyle.whiteContainer : ThemeStyle.darkContainer
        ]}>
            <View styles={[
                styles.imageContainer,
                theme === 'light' ? ThemeStyle.whiteContainer : ThemeStyle.darkContainer
            ]}>
                <Image 
                    source={{uri: item.images.original.url}}
                    style={styles.image}
                    alt={item.alt_text}
                />
            </View>
            <View style={[
                styles.detailContainer,
                theme === 'light' ? ThemeStyle.whiteContainer : ThemeStyle.darkContainer
            ]}>
                <View style={styles.titleContainer}> 
                    <View style={{flexShrink: 1}}>
                        <Text
                            style={[{
                                fontSize: 13,
                            },
                            theme === 'light' ? ThemeStyle.lightThemeText : ThemeStyle.darkThemeText
                        ]}
                            numberOfLines={2}
                            overflow="ellipsis"
                        >
                            {item.title}
                            <Text style={theme === 'light' ? ThemeStyle.lightThemeText : ThemeStyle.darkThemeText}>
                                {"(" + item?.user?.display_name + ")"}
                            </Text>
                        </Text>
                    </View>
                </View>
                <View 
                    style={styles.rating}
                >
                    {/* <StarRating
                        rating={item.rating}
                        starDimension={15}
                        color="green"
                    /> */}
                    <Text 
                        style ={[{
                            fontSize: 11,
                        },
                        theme === 'light' ? ThemeStyle.lightThemeText : ThemeStyle.darkThemeText
                    ]}
                    >
                        {"(" + item.rating + ")"}
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        padding: 10,
    },
    imageContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    titleContainer: {
        flexDirection: 'row',
        flex: 1,
        flexWrap: 'wrap',
    },
    image: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
    detailContainer: {
        padding: 10,
        flexShrink: 1,
    },
    rating: {
        flexDirection: 'row',
    }
});

export default GiphyItem;


