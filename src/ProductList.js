import { SafeAreaView, View, Text, FlatList } from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import ProductItem from "./ProductItem"

const fetchProducts = async (limit, skip) => {

    const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
    const data = await response.json();

    return data;
}

const ProductList = () => {
    const [data, setData] = useState({
        products: [],
        total: 0,
        skip: 0,
        limit: 10,
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = useCallback(() => {
        if (loading) return;
        setLoading(true);
        const {
            limit,
            skip
        } = data;
        fetchProducts(limit, skip)
            .then((responseData) => {
                console.log(responseData);
                setData((prevData) => {
                    return {
                        products: [ ...prevData.products, ...responseData.products],
                        total: responseData.total,
                        skip: prevData.skip + responseData.products.length,
                        limit: responseData.limit,
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
    }, [data.products, loading])

    const getNewData = useCallback(async () => {
        const {
            products,
            total
        } = data;
        console.log(data.products.length, total);
        if (products.length < total) {
            console.log("fetching new data");
            loadData();
        }
    }, [data.products, loading]);

    const {
        products,
    } = data;
    return (
        <SafeAreaView>
            <View>
                <Text>Product List</Text>
            </View>
            <FlatList 
                data={products}
                renderItem={({item, index}) => {
                    return (
                        <ProductItem item={item} index={index} />
                    )
                }}
                onEndReached={getNewData}
                keyExtractor={(item, index) => item.id}
                onEndReachedThreshold={0.2}
            />
        </SafeAreaView>
    )
}

export default ProductList;