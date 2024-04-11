import { StyleSheet, Text, View, ActivityIndicator, useWindowDimensions  } from 'react-native'
import React from 'react'

const ActivityIndicatorCustomised = ({
    size
}) => {
    const {height, width, scale, fontScale} = useWindowDimensions();

    return (
        <View
            style={[
                styles.container,
                {
                    width: width
                }
            ]}
        >
            <ActivityIndicator size={size} color="#0000ff" />
        </View>
    )
}

export default ActivityIndicatorCustomised

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 100,
    }
})