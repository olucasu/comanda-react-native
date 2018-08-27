import React, {Component} from 'react';
import {Icon} from 'native-base';
import {Text, TouchableOpacity, TextInput, View , TouchableNativeFeedback} from 'react-native';
import TextInputMask from 'react-native-text-input-mask';
import {Colors,styles} from '../../components/Styles';


const _getStatusStyle = (status) => {
    console.log(status);
    switch(status) {
      case 'OCUPADA(O)':
          return 'bgOcupado'
          break;
      case 'CONTA':
          return 'bgConta'
          break;
      case 'RESERVADA(O)':
          return 'bgReservado'
          break;
      case 'Livre':
          return 'bgLivre'
          break;
      default:
          return 'bgLivre'
    }
}

/**
 * 
 * @param {*} tipoMesa 
 * 
 * Retorna Componente ícone baseado no tipo de mesa
 */
const getIconMesa = (tipoMesa) => {
    
    let type, name, style;

    switch(tipoMesa) {
        case 'OCUPADA(O)':
            type = 'MaterialIcons';
            name = 'people'
            style=  styles.tableCardOcupado
            break;
        case 'CONTA':
            type = 'Ionicons';
            name = 'md-thumbs-up';
            style=  styles.tableCardConta

            break;
        case 'RESERVADA(O)':
            type = 'MaterialCommunityIcons';
            name = 'pencil';
            style=  styles.tableCardReservado
            break;
        case 'LIVRE':
            type = 'MaterialIcons';
            name = 'check';
            style=  styles.tableCardLivre
            break;
        default:
            type = 'MaterialIcons';
            name = 'credit-card';
      }

    return <Icon name={name} type={type} style={[styles.tableCardIcon, style]} /> 
} 


/**
 * Componenente visual
 * 
 * Retorna componente contador
 */
class NumberPicker extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: "1",
            maxLength: props.maxLength ? props.maxLength : 10
        }
    }

    add(){
        const newValue = String(parseFloat(this.state.value) + parseFloat("1,000"));
        this.setParams(newValue);
    }
    
    decrease(){
        const value = parseFloat(this.state.value);
        const newValue = String( value - parseFloat("1,000"));
        if(value > 1) 
            this.setParams(newValue);
        
    }

    setParams(value) {
        this.setState({value});
        this.props.onChangeText(value);
    }

    render(){
        return(
            <View style={styles.numberPickerContainer} >
                <View style={styles.numberPickerItem}>
                    <TouchableNativeFeedback  onPress={ () => this.decrease()}>
                        <View style={[styles.numberPickerButton]}>
                            <Icon style={[styles.buttonDarkText, styles.numberPickerIcon]}  name="remove" type="MaterialIcons"></Icon>
                        </View>
                    </TouchableNativeFeedback>
                </View>
                <View style={styles.numberPickerItem}>
                    <TextInputMask style={styles.numberPickerInput} underlineColorAndroid='rgba(0,0,0,0)' defaultValue={this.state.value} maxLength={this.state.maxLength}  keyboardType={'numeric'} mask={"[000]{,}[000]"} value={this.state.value} onChangeText={(formatted, value) => { this.setParams(value); } } />
                    <Text>{this.props.unity}</Text>
                </View>
                <View style={styles.numberPickerItem}>
                <TouchableNativeFeedback   onPress={ () =>this.add()} >
                    <View style={[styles.numberPickerButton]}>
                        <Icon style={[styles.buttonDarkText, styles.numberPickerIcon]} name="add"  type="MaterialIcons"></Icon>
                    </View>
                    </TouchableNativeFeedback>
                </View>
            </View>
        )
    }
}


const _formatMoney = (value) =>{
    return parseFloat(Math.round(value * 100) / 100).toFixed(2)
}

export {getIconMesa, NumberPicker, _formatMoney, _getStatusStyle}