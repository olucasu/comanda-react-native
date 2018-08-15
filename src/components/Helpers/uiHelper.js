import React, {Component} from 'react';
import {Icon} from 'native-base';
import {Text, TouchableOpacity, TextInput, View} from 'react-native'
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
            maxLength: 2
        }
    }

    add(){
        this.setState({value: String(parseInt(this.state.value) + 1)})
    }
    
    decrease(){
        const intValue = parseFloat
        if(parseInt(this.state.value) >= 1) 
            this.setState({value: String(parseInt(this.state.value) - 1)})
    }

    render(){
        return(
            <View>
                <TouchableOpacity onPress={ () => this.decrease()}><Icon name="minus" type="EvilIcons"></Icon></TouchableOpacity>
                <TextInput defaultValue={this.state.value} maxLength={this.state.maxLength}  keyboardType={'numeric'}  value={this.state.value} onChangeText={(value) => this.setState({value}) } />
                <TouchableOpacity onPress={ () =>this.add()} ><Icon name="plus" type="EvilIcons"></Icon></TouchableOpacity>
            </View>
        )
    }
}
export {getIconMesa, NumberPicker}