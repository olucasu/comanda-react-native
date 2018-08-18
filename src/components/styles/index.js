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
        fontFamily: 'sans-serif-light',
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
     
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.defaultBgColor
    },
    content:{
        marginTop:15,
        paddingLeft:5,
        paddingRight: 5,
        paddingBottom: 10,
    },
    contentTitle: {
        color:Colors.defaultDarkColor,
        fontFamily: 'sans-serif-light',
    },
    list :{
        marginBottom:15,
        marginTop:15
    },
    listItem:{
        elevation: 1,
        backgroundColor: "#fff",
        margin: 9,
        padding:10,
        borderRadius: 7
    },
    listItemTitle: {
        fontSize: 15,
        color:Colors.defaultDarkColor,
        fontFamily: 'sans-serif-light',
        fontWeight: '600'
    },
    alignItemsCenter : {
        alignItems: 'center',
        flex:1
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
        color: Colors.defaultDarkColor,
        fontFamily: 'notoserif'
    },
    icon: {
        color: '#888',
        fontSize: 20
    },

    //Buttons
    button: {
        alignItems:'center' ,
        paddingHorizontal:15,
        paddingVertical:15
    },
    buttonPrimary: {
        backgroundColor:Colors.primaryColor,
    },
    buttonLightText :{
        color: Colors.defaultLightTextColor
    }

});


export {styles, Colors};


