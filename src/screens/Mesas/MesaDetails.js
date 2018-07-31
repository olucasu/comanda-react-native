import React, { Component} from 'react';
import {Text, ScrollView, View,Button} from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Card ,List, ListItem} from 'react-native-elements'

export default class MesaDetails extends Component {

    state = {
        status : 'desocupada'
    }

    render(){

        const list = [
            {
                name: 'Suco - Abacaxi 350ml',
            },
            {
                name: 'Açaí Especial - 500ml',
            },
            {
                name: 'Açaí Especial - 500ml',
            },
            {
                name: 'Açaí Especial - 500ml',
            },
            {
                name: 'Açaí Especial - 500ml',
            },
          ]

          return(
            <ScrollView>
                <View>
                    <Button onPress={()=> { alert('Você iniciou o atendimento!')}} title="Iniciar Atendimento" />
                    <Card>
                        <Text h2> Adicionar Produtos </Text>
                        <View>
                            <FormLabel>Buscar Produtos</FormLabel>
                            <FormInput/>
                        </View>
                    </Card>
                    <Card>
                        <Text h2> Consumo </Text>
                        <List containerStyle={{marginBottom: 20}}>
                        {
                            list.map((l, i) => (
                                <ListItem  key={i} title={l.name}
                                />
                            ))
                        }
                        </List>
                    </Card>
                </View>
            </ScrollView>
        );
    }
}