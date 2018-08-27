import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import Colors from './Colors'


const regularFont = "Montserrat-Regular";
const semiBoldFont = "Montserrat-SemiBold";



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
        marginVertical: 10,
        paddingVertical:20,
        paddingHorizontal: 15,
        borderRadius: 7,
        flexDirection: 'row',
        alignItems: 'center',
        flex:1,
        margin: 10,
        justifyContent: 'space-between'
    },
   
    tableCardLivre:{
        color: '#4CAF50'
    },
   
    tableCardOcupado:{
       color: '#FF9800'
    },
   
    tableCardConta:{
       color: '#03A9F4'
    },
    
    tableCardReservado:{
        color:"#111E6C"
    },

    
    bgLivre:{
        backgroundColor: '#4CAF50'
    },
   
    bgOcupado:{
       backgroundColor: '#FF9800'
    },
   
    bgConta:{
       backgroundColor: '#03A9F4'
    },
    
    bgReservado:{
        backgroundColor:"#111E6C"
    },





   
    tableCardText:{
        color: Colors.primary.defaultDarkColor ,
        fontFamily: regularFont,
        fontSize: 15,
        marginRight: 15,
    },

    
    tableCardIcon:{
        height: 30,
        width:30,
        fontSize: 30,
        alignSelf: 'center',
        flex: 1
    },
    
    tableCardNumber:{
        color: Colors.primary.textDark,
        fontSize:16,
        fontFamily: semiBoldFont,
    },
    
    container :{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: Colors.primary.containerColor,
        margin:0,
        padding:0,
        overflow: 'hidden'
    },

    sideBySide : {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
   
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },

    containerBorder:{
        borderRadius:15,
    },

    content:{
        marginTop:15,
        padding:10
    },
    
    contentTitle: {
        color:Colors.primary.defaultDarkColor,
        fontFamily: semiBoldFont,
    },
   
    list :{
        marginBottom:15,
        marginTop:15,
    },
    
    listItem:{
        elevation: 0.6,
        backgroundColor: "#fff",
        margin: 9,
        padding:10,
        borderRadius: 7,
        flex:1,
    },

    listItemBig :{
        paddingVertical: 30
    },
   
    listItemTitle: {
        fontSize: 15,
        color:Colors.primary.defaultDarkColor,
        fontFamily: regularFont,
    },
   
    alignItemsCenter : {
        alignItems: 'center',
        justifyContent: 'center',
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

    fontSemiBold: {
        fontFamily: semiBoldFont
    },
    
    lightText:{
        color: Colors.primary.textOnPrimary,
        fontFamily: regularFont
    },
    icon: {
        color: Colors.primary.textDark,
        fontSize: 20
    },
    iconHeroMessage:{
        color: Colors.primary.defaultColor,
        fontSize: 84,
        marginBottom: 15
    },

    //Buttons
    button: {
        alignItems:'center' ,
        paddingHorizontal:30,
        paddingVertical:15,
        borderRadius: 60,
        elevation: 4,
    },
    buttonPrimary: {
        backgroundColor:Colors.primary.defaultColor,
    },

    buttonSecondary: {
        backgroundColor:Colors.secondary.defaultColor,
    },

    buttonSmLeft:{
        alignItems:'center' ,
        justifyContent: 'center',
        borderRadius: 50,
        elevation: 2,
        marginRight: 15,
        width:40,
        height:40,
    },

    buttonWhite:{
        backgroundColor: '#fff'
    },

    buttonLightText :{
        color: Colors.primary.textOnPrimary,
        fontFamily: regularFont
    },
    buttonDarkText :{
        color: Colors.primary.textDark,
        fontFamily: regularFont
    },
    buttonInputGroup:{
        borderTopLeftRadius:0,
        borderBottomLeftRadius:0,
        alignItems:'center' ,
        paddingHorizontal:15,
        paddingVertical:14,
        borderRadius: 60,
        elevation: 2
       
    },
    viewHeader: {
        backgroundColor: Colors.primary.lightColor,
        padding: 15
    },
    viewHeaderSearch: {
        backgroundColor: Colors.primary.lightColor,
        margin:0,
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
        fontFamily: semiBoldFont
    },  
    headerAddItemContent : {
        padding: 15
    },
    headerAddItemValue:{
        textAlign: 'center',
        fontSize: 24,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 100,
        marginVertical: 15
    },
    buttonFlex:{
        flex: 1
    },
    buttonContainer: {
        paddingVertical: 10,
        margin: 5,
        alignItems: 'center',
    },
    buttonGroup :{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerButtonBottom :{
        paddingBottom: 60
    },

    inputShadow : {
        elevation: 2,
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50,
        paddingHorizontal: 10,
        borderColor: 'transparent',
        backgroundColor: Colors.primary.containerColorInverse,
        color: Colors.primary.textDark,
        fontFamily: regularFont
    },

    // Number Picker Component

    numberPickerContainer:{
        flexDirection: 'row'
    },

    numberPickerItem:{
        justifyContent: 'center',
        alignItems: 'center',
        flex:1,
    },

    numberPickerButton:{
        borderRadius: 50,
        alignItems:'center',
        justifyContent:'center',
        width:60,
        height:60,
        borderColor: '#fefefe',
        borderWidth: 1,
        elevation: 1,
        padding: 0,
        overflow:'hidden'
    },




    numberPickerIcon:{
        margin: 0,
        padding:0,
        fontSize: 32
    },
    numberPickerInput : {
        alignItems:'center',
        justifyContent:'center',
        flex:1,
        fontSize: 32,
        width: 100,
        textAlign:'center',
        color: Colors.primary.defaultColor,
        fontFamily: regularFont,
        padding:0,
        margin: 0
    },


    //Helpers 
    mb30:{
        marginBottom: 30
    },

    //Input
    inputForm:{
        fontFamily: regularFont,
        backgroundColor: '#eee',
        paddingHorizontal: 15,
        borderRadius: 10,
        borderColor: "#eee",
        borderWidth: 1,
        fontSize: 18,
        color: Colors.primary.textDark
    },

});


export {styles, Colors};


