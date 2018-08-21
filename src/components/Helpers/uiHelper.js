import React, {Component} from 'react';
import {Icon} from 'native-base';
import {Text, TouchableOpacity, TextInput, View} from 'react-native';
import TextInputMask from 'react-native-text-input-mask';
import {Colors,styles} from '../../components/Styles';

const getIconMesa = (tipoMesa) => {
    
    let type, name;

    switch(tipoMesa) {
        case 'OCUPADA(O)':
            type = 'MaterialIcons';
            name = 'block'
            break;
        case 'CONTA':
            type = 'EvilIcons';
            name = 'like';
            break;
        case 'RESERVADA(O)':
            type = 'MaterialCommunityIcons';
            name = 'pencil';
            break;
        case 'LIVRE':
            type = 'MaterialIcons';
            name = 'check';
            break;
        default:
            type = 'MaterialIcons';
            name = 'credit-card';
      }

    return <Icon name={name} type={type} style={styles.tableCardText} /> 
} 

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
                    <TouchableOpacity activeOpacity={0.8} style={[styles.numberPickerButton]} onPress={ () => this.decrease()}><Icon style={[styles.buttonDarkText, styles.numberPickerIcon]}  name="remove" type="MaterialIcons"></Icon></TouchableOpacity>
                </View>
                <View style={styles.numberPickerItem}>
                    <TextInputMask style={styles.numberPickerInput} underlineColorAndroid='rgba(0,0,0,0)' defaultValue={this.state.value} maxLength={this.state.maxLength}  keyboardType={'numeric'} mask={"[000]{,}[000]"} value={this.state.value} onChangeText={(formatted, value) => { this.setParams(value); } } />
                    <Text>{this.props.unity}</Text>
                </View>
                <View style={styles.numberPickerItem}>
                <TouchableOpacity activeOpacity={0.8} style={[ styles.numberPickerButton]} onPress={ () =>this.add()} ><Icon style={[styles.buttonDarkText, styles.numberPickerIcon]} name="add"  type="MaterialIcons"></Icon></TouchableOpacity>
                </View>
            </View>
        )
    }
}

export {getIconMesa, NumberPicker}