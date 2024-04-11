import { StyleSheet, TextInput, View } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import ThemeContext from "../../context/ThemContext";
import { ThemeStyle } from "../../utils/themeStyle";


const CustomTextInput = ({
    onTextChange,
    onFocus
}) => {
    const [text, onChangeText] = useState("");
    const {theme, toggleTheme} = useContext(ThemeContext);

    useEffect(() => {
        onTextChange(text);
    }, [text]); 

    return (
        <View
            style={
                theme === 'light' ? ThemeStyle.whiteContainer : ThemeStyle.darkContainer
            }
        >
            <TextInput
                style={[styles.input, theme === 'light' ? ThemeStyle.textInputLightStyle : ThemeStyle.textInputDarkStyle]}
                onChangeText={onChangeText}
                value={text}
                placeholder="Search for giphs"
                placeholderTextColor={theme === 'light' ? 'grey' : 'white'}
            />
        </View>
    )
}

export default CustomTextInput

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },    
})