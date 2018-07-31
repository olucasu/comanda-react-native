import React from 'react';
import {StyleSheet} from 'react-native';


const styles = StyleSheet.create({
    container :{
        paddingBottom: 60,
        paddingTop: 60,
        paddingHorizontal : 15,
        flex: 1,
        flexDirection: 'row',
   
    },
    item: {
        alignItems: "center",
        backgroundColor: "#fff",
        flexGrow: 1,
        margin: 9,
        padding: 15,
        flexBasis: 0,
        borderRadius: 5
    },
    text: {
        color: "#333333"
    },
    icon: {
        color: '#888'
    }
});


export default styles;
