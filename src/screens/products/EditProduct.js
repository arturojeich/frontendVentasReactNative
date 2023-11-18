import React, { useState } from 'react'
import { View, Text, TextInput, ScrollView, Button, Switch } from 'react-native'
import { CustomStyles } from '../../customStyles/CustomStyles'
import DropDownList from '../../components/DropDownList'

const EditProduct = ({ route, navigation }) => {
  const { id, productData, putFunction, categoriesList, categoriesKey } =
    route.params
  const { categoria, codigo, nombre, precio } = productData
  const [category, setCategory] = useState('')
  const [newProduct, setNewProduct] = useState({})
  let [labelCategoria, setLabelCategoria] = useState('')
  let [labelCodigo, setLabelCodigo] = useState(codigo)
  let [labelNombre, setLabelNombre] = useState(nombre)
  let [labelPrecio, setLabelPrecio] = useState(precio)

  inputTextClear = () => {
    this.textInput1.clear()
    this.textInput2.clear()
    this.textInput3.clear()
  }

  function filterCategories() {
    let arr = []
    categoriesKey.forEach((key) => {
      arr.push({
        value: key,
        label: `${categoriesList[key]?.nombre}`
      })
    })
    return arr
  }

  return (
    <ScrollView>
      <View style={CustomStyles.inputContainer}>
        <Text style={[CustomStyles.label, { marginBottom: 10 }]}>Reserva</Text>
        {categoriesKey.length > 0 ? (
          <DropDownList
            style={{ marginBottom: 50 }}
            items={filterCategories()}
            value={category}
            setValue={setCategory}
            zIndex={5000}
            placeholder={categoriesList[categoria]?.nombre}
          />
        ) : null}
      </View>
      <View style={CustomStyles.inputContainer}>
        <Text style={CustomStyles.label}>Codigo</Text>
        <TextInput
          ref={(input) => {
            this.textInput1 = input
          }}
          style={CustomStyles.textInput}
          placeholder={labelCodigo}
          onChangeText={(x) => setNewProduct({ ...newProduct, codigo: x })}
          defaultValue={''}
        />
      </View>
      <View style={CustomStyles.inputContainer}>
        <Text style={CustomStyles.label}>Nombre</Text>
        <TextInput
          ref={(input) => {
            this.textInput2 = input
          }}
          style={CustomStyles.textInput}
          placeholder={labelNombre}
          onChangeText={(x) => setNewProduct({ ...newProduct, nombre: x })}
          defaultValue={''}
        />
      </View>
      <View style={CustomStyles.inputContainer}>
        <Text style={CustomStyles.label}>Precio</Text>
        <TextInput
          ref={(input) => {
            this.textInput3 = input
          }}
          style={CustomStyles.textInput}
          placeholder={labelPrecio}
          onChangeText={(x) => setNewProduct({ ...newProduct, precio: x })}
          defaultValue={''}
        />
      </View>
      <View style={[CustomStyles.buttons, { marginTop: 50 }]}>
        <View>
          <Button
            title="Guardar"
            onPress={() => {
              putFunction(
                id,
                { ...newProduct, categoria: category },
                setCategory,
                setLabelCodigo,
                setLabelNombre,
                setLabelPrecio
              ),
                setNewProduct({}),
                inputTextClear()
            }}
            color={CustomStyles.colors.mainBackground}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Button
            title="Cancelar"
            onPress={() => {
              setNewProduct(), inputTextClear()
            }}
            color="grey"
          />
        </View>
      </View>
    </ScrollView>
  )
}

export default EditProduct
