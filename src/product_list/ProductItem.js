import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';

const ProductItem = ({item, index}) => {


    return (
        <View style={styles.rowContainer}>
            <View styles={styles.imageContainer}>
                <Image 
                    source={{uri: item.thumbnail}}
                    style={styles.image}
                    
                />
            </View>
            <View style={styles.detailContainer}>
                <View style={styles.titleContainer}> 
                    <View style={{flexShrink: 1}}>
                        <Text
                            style={{
                                fontSize: 13,
                            }}
                            numberOfLines={2}
                            overflow="ellipsis"
                        >
                            {item.title}
                            <Text>
                                {"(" + item.description + ")"}
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
                        style ={{
                        fontSize: 11,
                        }}
                    >
                        {"(" + item.rating + ")"}
                    </Text>
                </View>
                <View>
                    <Text 
                        style={{
                        color: "green",
                        fontWeight: "bold",
                        fontSize: 14,
                    }}>
                        {item.discountPercentage + "% off "}
                        <Text
                            style={{
                                color: "grey",
                                textDecorationLine: "line-through",
                                margin: 5
                            }}
                        >
                            {item.price}
                        </Text>
                        <Text
                            style={{
                                color: "black",
                                margin: 5
                            }}
                        >
                            {"  " + Math.round(item.price - (item.price * item.discountPercentage / 100))}
                        </Text>
                    </Text>
                </View>
                <View>
                    <Text style={{color: "red", fontSize: 10}}>
                        {"Only " + item.stock + " left"}
                    </Text>
                </View>
                <View>
                    <Text style={{color: "black", opacity: 0.8, fontSize: 10}}>
                        {"Free Delivery"}
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
        height: 100,
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

export default ProductItem;


