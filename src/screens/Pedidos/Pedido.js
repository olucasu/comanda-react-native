import React from 'react';
import { FlatList, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { styles, Colors } from '../../components/Styles';
import EmptyResult from '../../components/Helpers/EmptyResult';
import {_formatMoney} from  '../../components/Helpers/uiHelper';
const hasComplemento = complemento => {
  if (complemento != ""  &&  complemento != null) {
    return (
        <View> 
            <Text style={[styles.text, styles.fontSemiBold]}>Complemento(s):</Text>
            <Text style={[styles.text, styles.textSmall]}>{complemento}</Text>
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
            if( value.id_produto == item.id_produto && item.complemento === value.complemento ) {
              let index = pedido.indexOf(item);
              pedido.splice(index, 1);
            }
        })
        props.setPedido(pedido)
    }

   const addSingleItem = (pedido, item) => {
        let index = "";
        pedido.filter((value)=>{
            if( value.id_produto == item.id_produto && item.complemento === value.complemento ) {
               index = pedido.indexOf(item);
            }
        })
        pedido[index].qtde =  parseFloat(pedido[index].qtde) + 1 ;
        let valorFinal = parseFloat(pedido[index].vlr_unidade) * pedido[index].qtde;
        pedido[index].vlr_vendido = valorFinal;

        props.setPedido(pedido)

      }

   const removeSingleItem = (pedido, item) => {
      let index = "";
      pedido.filter((value)=>{
          if( value.id_produto == item.id_produto && item.complemento === value.complemento ) {
             index = pedido.indexOf(item);
          }
      })

      pedido[index].qtde > 1 ? pedido[index].qtde =  parseFloat(pedido[index].qtde) - 1 : "";
      let valorFinal = parseFloat(pedido[index].vlr_unidade) * pedido[index].qtde;
      pedido[index].vlr_vendido = valorFinal;
      props.setPedido(pedido)
    }


    return (
      <ScrollView>
   
        <FlatList
          extraData={props}
          keyExtractor={(item, index) => index.toString()}
          data={props.pedido}
          renderItem={({ item }) => {
            return (
              <View style={styles.listItem}>
                <Text style={[styles.listItemTitle, styles.fontSemiBold]}>
                     {` ${item.descricao} - R$${_formatMoney(item.vlr_unidade)}`}
                </Text>
                  {/* <Text style={styles.text}>Código: </Text> */}
                  
                  <View style={{
                      flex: 1,
                      justifyContent: 'flex-start',
                      flexDirection: 'row'

                    }} >
                    <Text style={[styles.buttonLightText, styles.fontSemiBold, { backgroundColor:Colors.primary.darkColor, marginVertical: 5}, styles.badge ]}>Qtd: {item.qtde}</Text>
                  </View>  
                  {hasComplemento(item.complemento)}
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    flexDirection: 'row'
                  }}
                >
                  <Text style={styles.text}>
                    Subtotal: R${ _formatMoney(item.vlr_vendido)}
                  </Text>
                </View>
                <View style={[styles.content, styles.sideBySide]}>
                    <TouchableOpacity  activeOpacity={0.9} style={styles.listActionButton} onPress={ () => { removeItem(props.pedido, item) } }>
                        <Text> Remover Item</Text>
                    </TouchableOpacity>
                     <TouchableOpacity  activeOpacity={0.9} style={styles.listActionButton} onPress={ () => { removeSingleItem(props.pedido, item) } }>
                        <Text> -1</Text>
                    </TouchableOpacity>
                     <TouchableOpacity  activeOpacity={0.9} style={styles.listActionButton} onPress={ () => { addSingleItem(props.pedido, item) } }>
                        <Text> +1</Text>
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
