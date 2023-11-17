import React, { useState } from 'react'
import { View, Text, TextInput, ScrollView, Button } from 'react-native'
import { ref, update } from 'firebase/database'
import { CustomStyles } from '../../customStyles/CustomStyles'

const EditCategory = ({ route, navigation, db }) => {
  let inputText = ''
  const { id, oldDescripcion } = route.params

  handleInputText = (text) => {
    inputText = text
  }

  function putCategory({ id, data }) {
    console.log('Update Category, with description: ' + data.descripcion)
    console.log('Update Category, with id: ' + id)
    data.descripcion !== '' && id !== '' && id !== undefined
      ? update(ref(db, `/administracion/categorias/${id}`), data)
      : console.log('No se pudo crear actualizar categoria!')
  }

  return (
    <ScrollView contentContainerStyle={CustomStyles.contentContainer}>
      <View style={CustomStyles.inputContainer}>
        <Text style={CustomStyles.label}>Descripción Actual</Text>
        <Text style={CustomStyles.textInput}>{oldDescripcion}</Text>
        <Text style={CustomStyles.label}>Descripción Nueva</Text>
        <TextInput
          ref={(input) => {
            this.textInput = input
          }}
          style={CustomStyles.textInput}
          placeholder="Por ejemplo, 'Oftalmología'"
          onChangeText={(x) => handleInputText(x)}
          defaultValue={inputText}
        />
      </View>
      <View style={CustomStyles.buttons}>
        <View>
          <Button
            title="Actualizar"
            onPress={() => {
              putCategory({
                id: id,
                data: { descripcion: inputText }
              })
            }}
            color={CustomStyles.colors.mainBackground}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Button
            title="Cancelar"
            onPress={() => {
              handleInputText('')
              this.textInput.clear()
            }}
            color="grey"
          />
        </View>
      </View>
    </ScrollView>
  )
}

export default EditCategory
