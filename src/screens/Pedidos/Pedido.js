import React from 'react'
import { FlatList, Text, View, TouchableOpacity } from 'react-native'
import { styles } from '../../components/Styles'
import EmptyResult from '../../components/Helpers/EmptyResult'

const hasComplemento = complemento => {
  if (complemento != ""  &&  complemento != null) {
      
    return <Text style={styles.text}> Complemento: {complemento}</Text>
  } else {
    return false
  }
}


const Pedido = props => {
  const _getValorPedido = () => {
    let valor = 0
    if (props.pedido != null) {
      props.pedido.map(item => (valor += item.vlr_vendido * item.qtde))
    }
    return parseFloat(Math.round(valor * 100) / 100).toFixed(2)
  }

  if (props.pedido.length > 0) {

    const removeItem = (pedido, item) => {
        pedido.filter((value)=>{
            if( value.id_produto == item.id_produto ) {
              let index = pedido.indexOf(item);
              pedido.splice(index, 1);
            }
        })
        console.log(props);
        props.update()
    }

    return (
      <View style={styles.container}>
        <View style={styles.viewHeader}>
          <Text style={[styles.viewHeaderText, styles.fontSemiBold]}>
            Pedido | Total: R$ {_getValorPedido()}
          </Text>
        </View>
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
                    Subtotal: R${item.vlr_vendido}
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
      </View>
    )
  } else {
    return <EmptyResult  icon={{iconName: "tag-faces", iconType:"MaterialIcons" }}  smile-wink message='Insira alguns itens no pedido.' />
  }
}

export default Pedido
