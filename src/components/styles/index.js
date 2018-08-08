import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import Colors from './Colors'

const styles = StyleSheet.create({

// Header
    header:{
        backgroundColor:Colors.defaultBgColor,
        margin: 0        
    },
    headerIcon: {
        color:Colors.defaultDarkColor
    },
    headerText: {
        color:Colors.defaultDarkColor,
        fontFamily: 'sans-serif',
        fontWeight: '900',
    },
// Tabs
    
    tabBar:{
        backgroundColor:Colors.defaultBgColor,
        elevation: 3,
    },
    tab:{
        alignContent:'stretch',
    },
    tabLabel:{
        fontFamily: 'sans-serif',
        fontWeight: '900',
        fontSize: 12,
    },
    tabIndicator:{
        backgroundColor: Colors.primaryColor,
    
    },
    tabIndicatorLabel:{
        color: Colors.primaryColor
    },
    tableCard:{
        elevation: 1,
        backgroundColor: "#fff",
        margin: 9,
        paddingVertical:20,
        paddingHorizontal:15,
        borderRadius: 7,
        borderLeftWidth: 7,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexBasis: 0,
        flexGrow: 1,
    },
    tableCardLivre:{
        borderColor: '#4CAF50'
    },
    tableCardOcupado:{
       borderColor: '#FF9800'
    },
    tableCardConta:{
       borderColor: '#03A9F4'
    },
    tableCardReservado:{
        borderColor:"#212121"
    },
    tableCardText:{
        color: Colors.defaultDarkColor ,
        fontWeight:'400'
    },
    tableCardNumber:{
        fontWeight:'900',
        color: '#616161',
        fontSize:16,
    },
    container :{
        paddingBottom: 60,
        paddingTop: 60,
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.defaultBgColor
    },
    alignItemsCenter : {
        alignItems: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
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
        color: '#888',
        fontSize: 20
    }

});


export {styles, Colors};


