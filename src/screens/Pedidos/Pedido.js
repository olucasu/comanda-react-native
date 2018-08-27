import React from 'react';
import { FlatList, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from '../../components/Styles';
import EmptyResult from '../../components/Helpers/EmptyResult';
import {_formatMoney} from  '../../components/Helpers/uiHelper';
const hasComplemento = complemento => {
  if (complemento != ""  &&  complemento != null) {
    return (
        <View> 
            <Text style={[styles.text, styles.fontSemiBold]}>Complemento(s):</Text>
            <Text style={styles.text}>{complemento}</Text>
        </View>
    )
  } else {
    return false
  }
}

/**
 * 
 * Component pedido
 * 
 * Retorna pedido que está sendo montado
 */
const Pedido = props => {

  if (props.pedido.length > 0) {

    const removeItem = (pedido, item) => {
        pedido.filter((value)=>{
            if( value.id_produto == item.id_produto ) {
              let index = pedido.indexOf(item);
              pedido.splice(index, 1);
            }
        })
        props.update()
    }

    return (
      <ScrollView>
   
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={props.pedido}
          renderItem={({ item }) => {
            return (
              <View style={styles.listItem}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.listItemTitle, styles.fontSemiBold]}>
                     {item.descricao}
                  </Text>
                  {/* <Text style={styles.text}>Código: </Text> */}
                  <Text style={styles.text}>Qtd: {item.qtde}</Text>
                  {hasComplemento(item.complemento)}
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    flexDirection: 'row'
                  }}
                >
                  <Text style={styles.text}>
                    Vlr {item.unidade}: R${  _formatMoney(item.vlr_vendido) }
                  </Text>
                </View>
                <View>
                    <TouchableOpacity onPress={ () => { removeItem(props.pedido, item) } }>
                        <Text> Remover Item</Text>
                    </TouchableOpacity>
                </View>
              </View>
            )
          }}
        />
      </ScrollView>
    )
  } else {
    return <EmptyResult  icon={{iconName: "tag-faces", iconType:"MaterialIcons" }}  smile-wink message='Insira alguns itens no pedido.' />
  }
}

export default Pedido
