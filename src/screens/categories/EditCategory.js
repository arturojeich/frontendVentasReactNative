import '../../utilities/ignoreWarnings'
import React, { useState } from 'react'
import { View, Text, TextInput, ScrollView, Button } from 'react-native'
import { ref, update } from 'firebase/database'
import { CustomStyles } from '../../customStyles/CustomStyles'

const EditCategory = ({ route, navigation }) => {
  const { id, oldNombre, putFunction } = route.params
  let [labelText, setLabelText] = useState(oldNombre)
  let inputText = ''

  handleLabel = (text) => {
    setLabelText(text)
  }

  handleInputText = (text) => {
    inputText = text
  }

  inputTextClear = () => {
    this.textInput.clear()
  }

  return (
    <ScrollView contentContainerStyle={CustomStyles.contentContainer}>
      <View style={CustomStyles.inputContainer}>
        <Text style={CustomStyles.label}>Nombre Actual</Text>
        <Text style={CustomStyles.textInput}>{labelText}</Text>
        <Text style={CustomStyles.label}>Nombre Nuevo</Text>
        <TextInput
          ref={(input) => {
            this.textInput = input
          }}
          style={CustomStyles.textInput}
          placeholder="Por ejemplo, 'Minutas'"
          onChangeText={(x) => handleInputText(x)}
          defaultValue={inputText}
        />
      </View>
      <View style={CustomStyles.buttons}>
        <View>
          <Button
            title="Actualizar"
            onPress={() => {
              putFunction({
                id: id,
                data: {
                  nombre: inputText
                }
              }),
                handleLabel(inputText),
                handleInputText(''),
                inputTextClear()
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
