import React, { useState } from 'react'
import { View, Text, TextInput, ScrollView, Button } from 'react-native'
import { CustomStyles } from '../../customStyles/CustomStyles'
import DropDownList from '../../components/DropDownList'

const CreateProduct = ({ route, navigation }) => {
  let { extraData } = route.params
  let { postFunction, categoriesList, categoriesKey } = extraData
  const [category, setCategory] = useState('')
  const [newProduct, setNewProduct] = useState({})

  inputTextClear = () => {
    setCategory('')
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
        <Text style={[CustomStyles.label, { marginBottom: 10 }]}>
          Categoría
        </Text>
        {categoriesKey.length > 0 ? (
          <DropDownList
            style={{ marginBottom: 50 }}
            items={filterCategories()}
            value={category}
            setValue={setCategory}
            zIndex={5000}
            placeholder={'Seleccione una Categoria'}
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
          placeholder="Ej. '847-00'"
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
          placeholder="Ej. 'Coca Cola 250 ml.'"
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
          placeholder="Ej. '5000'"
          onChangeText={(x) => setNewProduct({ ...newProduct, precio: x })}
          defaultValue={''}
        />
      </View>
      <View style={[CustomStyles.buttons, { marginTop: 50 }]}>
        <View>
          <Button
            title="Guardar"
            onPress={() => {
              postFunction({ ...newProduct, categoria: category }),
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
              setNewProduct()
              inputTextClear()
            }}
            color="grey"
          />
        </View>
      </View>
    </ScrollView>
  )
}

export default CreateProduct
