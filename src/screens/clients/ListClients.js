import React, { useState, useEffect } from 'react'
import { ScrollView, View, ActivityIndicator, SafeAreaView } from 'react-native'
import { app } from '../../../firebaseConfig'
import {
  getDatabase,
  ref,
  onValue,
  push,
  update,
  remove
} from 'firebase/database'
import FooterOptions from '../../components/FooterOptions'
import ClientItem from './ClientItem'
import { confirm, error } from '../../components/Alerts'

const ListClients = ({ navigation }) => {
  const [dbFirebase, setDBFirebase] = useState(getDatabase(app))
  const [clientsList, setclientsList] = useState({})
  const clientKeys = Object.keys(clientsList)

  useEffect(() => {
    return onValue(
      ref(dbFirebase, '/administracion/clientes'),
      (querySnapShot) => {
        let data = querySnapShot.val() || {}
        let itemList = { ...data }
        setclientsList(itemList)
      }
    )
  }, [])

  validatePerson = (newClient) => {
    if (newClient !== undefined && newClient !== null) {
      if (
        newClient.nombre &&
        newClient.apellido &&
        newClient.ruc &&
        newClient.email
      ) {
        return true
      }
    }
    error(
      'No se pudo registrar la persona',
      'Todos los campos deben completarse!'
    )
    return false
  }

  function postClient(newClient) {
    validatePerson(newClient)
      ? push(ref(dbFirebase, '/administracion/clientes/'), newClient)
      : console.log('No se pudo agregar un nuevo Cliente!')
    console.log('El Cliente a guardar es: ' + JSON.stringify(newClient))
  }

  validatePutClient = (newClient) => {
    if (newClient !== undefined && newClient !== null) {
      if (
        newClient.nombre ||
        newClient.apellido ||
        newClient.ruc ||
        newClient.email
      ) {
        return true
      }
    }
    return false
  }

  function putClient({
    id,
    newClient,
    setLabelNombre,
    setLabelApellido,
    setLabelRuc,
    setLabelEmail
  }) {
    if (validatePutClient(newClient)) {
      update(ref(dbFirebase, `/administracion/clientes/${id}`), newClient)
      newClient.nombre && setLabelNombre(newClient.nombre)
      newClient.apellido && setLabelApellido(newClient.apellido)
      newClient.ruc && setLabelRuc(newClient.ruc)
      newClient.email && setLabelEmail(newClient.email)
    } else {
      console.log('No se pudo actualizar el registro!')
    }
    console.log('La persona a actualizar es: ' + JSON.stringify(newClient))
  }

  function removeClient(id) {
    console.log('Delete Cliente, with id: ' + id)
    id !== '' && id !== undefined
      ? remove(ref(dbFirebase, `/administracion/clientes/${id}`))
      : console.log('No se pudo crear eliminar el Cliente!')
  }

  function GetAllClients() {
    return (
      <ScrollView>
        <View>
          {clientKeys.length > 0 ? (
            clientKeys.map((key) => {
              return (
                <ClientItem
                  key={key}
                  clientData={clientsList[key]}
                  id={key}
                  navigation={navigation}
                  putFunction={putClient}
                  deleteFunction={removeClient}
                />
              )
            })
          ) : (
            <ActivityIndicator size={'large'} color={`black`} />
          )}
        </View>
      </ScrollView>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GetAllClients />
      <FooterOptions
        navigation={navigation}
        screenTypeName={'Crear Cliente'}
        extraData={postClient}
      />
    </SafeAreaView>
  )
}

export default ListClients
