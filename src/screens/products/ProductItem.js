import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { CustomStyles } from '../../customStyles/CustomStyles'
import { confirm } from '../../components/Alerts'

const ProductItem = ({
  productData,
  putFunction,
  deleteFunction,
  id,
  navigation,
  categoriesList,
  categoriesKey
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
  const { categoria, codigo, nombre, precio } = productData

  return (
    <View key={id} style={[container, shadowProp, elevation]}>
      <View style={[data]}>
        <Text
          style={[titleTheme, { alignSelf: 'flex-start', fontSize: 28 }]}
        >{`${nombre}`}</Text>
        <Text style={[titleTheme]}>Codigo </Text>
        <Text style={[textTheme]}>{codigo}</Text>
        <Text style={[titleTheme]}>Categoria</Text>
        <Text style={[textTheme]}>{categoria}</Text>
        <Text style={[titleTheme]}>Precio</Text>
        <Text style={[textTheme]}>{precio}</Text>
      </View>
      <View style={[buttons]}>
        <MaterialIcons.Button
          name="edit"
          size={26}
          color="black"
          style={{ marginRight: 0, marginLeft: 0 }}
          backgroundColor={CustomStyles.colors.mainCard}
          onPress={() => {
            navigation.navigate('Editar Producto', {
              id: id,
              putFunction: putFunction,
              productData: productData,
              categoriesList: categoriesList,
              categoriesKey: categoriesKey
            })
          }}
        />
        <MaterialIcons.Button
          name="delete"
          size={26}
          color="black"
          backgroundColor={CustomStyles.colors.mainCard}
          onPress={() =>
            confirm(
              'Eliminar',
              `Esta seguro de eliminar el registro de ${nombre}?`,
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
    height: 250,
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
export default ProductItem
