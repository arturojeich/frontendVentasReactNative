import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { CustomStyles } from '../../customStyles/CustomStyles'
import { confirm } from '../../components/Alerts'

const SaleItem = ({
  saleData,
  deleteFunction,
  id,
  navigation,
  productsList,
  productsKey,
  clientsList,
  clientsKey
}) => {
  const {
    container,
    titleTheme,
    textTheme,
    buttons,
    shadowProp,
    data,
    elevation
  } = styles
  const { nroFactura, fecha, total, producto, cantidad, cliente } = saleData

  return (
    <View key={id} style={[container, shadowProp, elevation]}>
      <View style={[data]}>
        <Text
          style={[titleTheme, { alignSelf: 'flex-start', fontSize: 28 }]}
        >{`${nroFactura}`}</Text>
        <Text style={[titleTheme]}>Fecha</Text>
        <Text style={[textTheme]}>{fecha}</Text>
        <Text style={[titleTheme]}>Total</Text>
        <Text style={[textTheme]}>{total}</Text>
        <Text style={[titleTheme]}>Producto</Text>
        <Text style={[textTheme]}>
          {productsList[producto] ? productsList[producto].nombre : 'Nulo'}
        </Text>
        <Text style={[titleTheme]}>Cantidad</Text>
        <Text style={[textTheme]}>{cantidad}</Text>
        <Text style={[titleTheme]}>Cliente</Text>
        <Text style={[textTheme]}>
          {clientsList[cliente] ? clientsList[cliente].nombre : 'Nulo'}
        </Text>
      </View>
      <View style={[buttons]}>
        <MaterialIcons.Button
          name="delete"
          size={26}
          color="black"
          backgroundColor={CustomStyles.colors.mainCard}
          onPress={() =>
            confirm(
              'Eliminar',
              `Esta seguro de eliminar el registro de ${nroFactura}?`,
              deleteFunction,
              id
            )
          }
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 350,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    paddingRight: 10,
    backgroundColor: CustomStyles.colors.mainCard
  },
  titleTheme: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20
  },
  textTheme: {
    color: 'black',
    fontSize: 16
  },
  data: {
    justifyContent: 'center',
    height: '100%',
    width: '80%',
    paddingLeft: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%',
    height: '100%',
    marginRight: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10
  },
  shadowProp: {
    shadowColor: 'black'
  },
  elevation: {
    elevation: 5
  }
})
export default SaleItem
