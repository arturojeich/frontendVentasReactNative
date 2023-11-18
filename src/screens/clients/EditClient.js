import '../../utilities/ignoreWarnings'
import React, { useState } from 'react'
import { View, Text, TextInput, ScrollView, Button } from 'react-native'
import { ref, update } from 'firebase/database'
import { CustomStyles } from '../../customStyles/CustomStyles'

const EditClient = ({ route, navigation }) => {
  const { id, clientData, putFunction } = route.params
  const { nombre, apellido, ruc, email } = clientData
  let [newClient, setNewClient] = useState({})
  let [labelNombre, setLabelNombre] = useState(nombre)
  let [labelApellido, setLabelApellido] = useState(apellido)
  let [labelRuc, setLabelRuc] = useState(ruc)
  let [labelEmail, setLabelEmail] = useState(email)

  let inputNombre = ''
  let inputApellido = ''
  let inputRuc = ''
  let inputEmail = ''

  handleInputNombre = (text) => {
    inputNombre = text
  }

  handleInputApellido = (text) => {
    inputApellido = text
  }

  handleInputRuc = (text) => {
    inputRuc = text
  }

  handleInputEmail = (text) => {
    inputEmail = text
  }

  inputTextClear = () => {
    this.textInput1.clear()
    this.textInput2.clear()
    this.textInput3.clear()
    this.textInput4.clear()
  }

  return (
    <ScrollView>
      <View style={[CustomStyles.inputContainer, { width: '100%' }]}>
        <Text style={CustomStyles.label}>Nombre</Text>
        <TextInput
          ref={(input) => {
            this.textInput1 = input
          }}
          style={CustomStyles.textInput}
          placeholder={labelNombre}
          onChangeText={(x) => setNewClient({ ...newClient, nombre: x })}
          defaultValue={inputNombre}
        />
      </View>
      <View style={CustomStyles.inputContainer}>
        <Text style={CustomStyles.label}>Apellido</Text>
        <TextInput
          ref={(input) => {
            this.textInput2 = input
          }}
          style={CustomStyles.textInput}
          placeholder={labelApellido}
          onChangeText={(x) => setNewClient({ ...newClient, apellido: x })}
          defaultValue={inputApellido}
        />
      </View>

      <View style={CustomStyles.inputContainer}>
        <Text style={CustomStyles.label}>RUC</Text>
        <TextInput
          ref={(input) => {
            this.textInput3 = input
          }}
          style={CustomStyles.textInput}
          placeholder={labelRuc}
          onChangeText={(x) => setNewClient({ ...newClient, ruc: x })}
          defaultValue={inputRuc}
        />
      </View>

      <View style={CustomStyles.inputContainer}>
        <Text style={CustomStyles.label}>Email</Text>
        <TextInput
          ref={(input) => {
            this.textInput4 = input
          }}
          style={CustomStyles.textInput}
          placeholder={labelEmail}
          onChangeText={(x) => setNewClient({ ...newClient, email: x })}
          defaultValue={inputEmail}
        />
      </View>

      <View style={CustomStyles.buttons}>
        <View>
          <Button
            title="Actualizar"
            onPress={() => {
              putFunction({
                id: id,
                newClient: newClient,
                setLabelNombre: setLabelNombre,
                setLabelApellido: setLabelApellido,
                setLabelRuc: setLabelRuc,
                setLabelEmail: setLabelEmail
              }),
                handleInputNombre(''),
                handleInputApellido(''),
                handleInputRuc(''),
                handleInputEmail(''),
                inputTextClear(),
                setNewClient({})
            }}
            color={CustomStyles.colors.mainBackground}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Button
            title="Cancelar"
            onPress={() => {
              setNewClient({}), inputTextClear()
            }}
            color="grey"
          />
        </View>
      </View>
    </ScrollView>
  )
}

export default EditClient
