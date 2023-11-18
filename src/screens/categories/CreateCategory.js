import React, { useState } from 'react'
import { View, Text, TextInput, ScrollView, Button, Switch } from 'react-native'
import { ref, push } from 'firebase/database'
import { CustomStyles } from '../../customStyles/CustomStyles'
import { confirm, error } from '../../components/Alerts'

const CreateCategory = ({ route, navigation }) => {
  let { extraData } = route.params
  let postFunction = extraData
  const [newCategory, setnewCategory] = useState()
  let inputText = ''

  handleInputText = (text) => {
    inputText = text
  }

  inputTextClear = () => {
    this.textInput.clear()
  }

  return (
    <ScrollView>
      <View style={CustomStyles.inputContainer}>
        <Text style={CustomStyles.label}>Nombre</Text>
        <TextInput
          ref={(input) => {
            this.textInput = input
          }}
          style={CustomStyles.textInput}
          placeholder="Ej. 'Minutas'"
          onChangeText={(x) => setnewCategory({ ...newCategory, nombre: x })}
          defaultValue={''}
        />
      </View>
      <View style={[CustomStyles.buttons, { marginTop: 50 }]}>
        <View>
          <Button
            title="Guardar"
            onPress={() => {
              postFunction(newCategory), inputTextClear()
            }}
            color={CustomStyles.colors.mainBackground}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Button
            title="Cancelar"
            onPress={() => {
              inputTextClear()
            }}
            color="grey"
          />
        </View>
      </View>
    </ScrollView>
  )
}

export default CreateCategory
