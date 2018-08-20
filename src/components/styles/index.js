import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import Colors from './Colors'


const regularFont = "Montserrat-Regular";
const styles = StyleSheet.create({

// Header
    header:{
        backgroundColor:Colors.primary.containerColor,
        margin: 0        
    },
    headerIcon: {
        color:Colors.primary.textDark
    },
    headerText: {
        color:Colors.primary.textDark,
        fontFamily: regularFont,
        fontSize: 18,
        fontWeight: '400'
    },
// Tabs
    
    tabBar:{
        backgroundColor:Colors.primary.containerColor,
        elevation: 3,
    },
    tab:{
        alignContent:'stretch',
    },
    tabLabel:{
        fontFamily: regularFont,
    },
    tabIndicator:{
        backgroundColor: Colors.primary.lightColor
    },
    tabIndicatorLabel:{
        color: Colors.primary.defaultColor,
        fontFamily: regularFont,
    },
    tableCard:{
        elevation: 1.3,
        backgroundColor: "#fff",
        margin: 9,
        paddingVertical:20,
        paddingHorizontal:15,
        borderRadius: 7,
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
        color: Colors.primary.defaultDarkColor ,
        fontFamily: regularFont,
    },
    tableCardNumber:{
        color: '#616161',
        fontSize:16,
        fontFamily: regularFont
    },
    container :{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: Colors.primary.containerColor,
    },
    content:{
        marginTop:15,
        padding:10
    },
    contentTitle: {
        color:Colors.primary.defaultDarkColor,
        fontFamily: regularFont,
    },
    list :{
        marginBottom:15,
        marginTop:15
    },
    listItem:{
        elevation: 0.6,
        backgroundColor: "#fff",
        margin: 9,
        padding:10,
        borderRadius: 7
    },
    listItemTitle: {
        fontSize: 15,
        color:Colors.primary.defaultDarkColor,
        fontFamily: regularFont,
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
    categoriaItem :{
        elevation: 1,
        marginBottom: 5,
        marginHorizontal: 15,
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: Colors.primary.containerColor
    },
    categoriaText :{
        fontSize: 18
    },
    text: {
        color: Colors.primary.defaultDarkColor,
        fontFamily: regularFont
    },
    lightText:{
        color: Colors.primary.textOnPrimary,
        fontFamily: regularFont
    },
    icon: {
        color: '#888',
        fontSize: 20
    },

    //Buttons
    button: {
        alignItems:'center' ,
        paddingHorizontal:15,
        paddingVertical:15,
        borderRadius: 60,
        marginRight: 15,
        elevation: 4
    },
    buttonPrimary: {
        backgroundColor:Colors.primary.defaultColor,
    },
    buttonLightText :{
        color: Colors.primary.textOnPrimary,
        fontFamily: regularFont
    },

    viewHeader: {
        backgroundColor: Colors.primary.lightColor,
        padding: 15
    },
    viewHeaderSearch: {
        backgroundColor: Colors.primary.containerColor,
        padding: 15
    },
    viewHeaderText:{
        color: Colors.primary.textOnPrimary,
        fontFamily: regularFont
    },

    //Adicionar Produto

    headerAddItem:{
        backgroundColor: Colors.primary.containerColor,
    },
    headerAddItemProduct:{
        fontSize:24,
        textAlign: 'center',
    },  
    headerAddItemContent : {
        padding: 15
    },
    headerAddItemValue:{
        textAlign: 'center',
        fontSize: 24,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 50,
        marginVertical: 15
    },
    buttonContainer: {
        paddingHorizontal: 60,
        paddingVertical: 10,
        backgroundColor: 'rgba(255,255,255,.6)',
    },
    buttonContainerRow :{
        flexDirection: 'row'
    },
    containerButtonBottom :{
        paddingBottom: 60
    },


    // Number Picker Component

    numberPickerContainer:{
        justifyContent: 'center',
        flexDirection: 'row'
    },

    numberPickerItem:{
        justifyContent: 'center',
        alignItems: 'center',
        width: '35%'
    }

});


export {styles, Colors};


