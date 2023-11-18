import React, { useState } from 'react'
import { View, Text, TextInput, ScrollView, Button, Switch } from 'react-native'
import { ref, push } from 'firebase/database'
import { CustomStyles } from '../../customStyles/CustomStyles'

const CreateClient = ({ route, navigation }) => {
  let { extraData } = route.params
  let postFunction = extraData
  const [isEnabled, setIsEnabled] = useState(false)
  const [newClient, setNewClient] = useState()
  let inputText = ''

  handleInputText = (text) => {
    inputText = text
  }

  inputTextClear = () => {
    this.textInput1.clear()
    this.textInput2.clear()
    this.textInput3.clear()
    this.textInput4.clear()
    setIsEnabled(false)
  }

  return (
    <ScrollView>
      <View style={CustomStyles.inputContainer}>
        <Text style={CustomStyles.label}>Nombres</Text>
        <TextInput
          ref={(input) => {
            this.textInput1 = input
          }}
          style={CustomStyles.textInput}
          placeholder="Ej. 'Juan Luis'"
          onChangeText={(x) => setNewClient({ ...newClient, nombre: x })}
          defaultValue={''}
        />
      </View>
      <View style={CustomStyles.inputContainer}>
        <Text style={CustomStyles.label}>Apellidos</Text>
        <TextInput
          ref={(input) => {
            this.textInput2 = input
          }}
          style={CustomStyles.textInput}
          placeholder="Ej. 'Perez Alves'"
          onChangeText={(x) => setNewClient({ ...newClient, apellido: x })}
          defaultValue={''}
        />
      </View>
      <View style={CustomStyles.inputContainer}>
        <Text style={CustomStyles.label}>RUC</Text>
        <TextInput
          ref={(input) => {
            this.textInput3 = input
          }}
          style={CustomStyles.textInput}
          placeholder="Ej. '123456-7'"
          onChangeText={(x) => setNewClient({ ...newClient, ruc: x })}
          defaultValue={''}
        />
      </View>
      <View style={CustomStyles.inputContainer}>
        <Text style={CustomStyles.label}>Email</Text>
        <TextInput
          ref={(input) => {
            this.textInput4 = input
          }}
          style={CustomStyles.textInput}
          placeholder="Ej. 'ejemplo@mail.com'"
          onChangeText={(x) => setNewClient({ ...newClient, email: x })}
          defaultValue={''}
        />
      </View>
      <View style={[CustomStyles.buttons, { marginTop: 50 }]}>
        <View>
          <Button
            title="Guardar"
            onPress={() => {
              postFunction(newClient), setNewClient(), inputTextClear()
            }}
            color={CustomStyles.colors.mainBackground}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Button
            title="Cancelar"
            onPress={() => {
              setNewClient()
              inputTextClear()
            }}
            color="grey"
          />
        </View>
      </View>
    </ScrollView>
  )
}

export default CreateClient
