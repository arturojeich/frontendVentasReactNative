import React, { useState, useEffect } from 'react'
import {
  ScrollView,
  View,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity
} from 'react-native'
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
import SaleItem from './SaleItem'
import { CustomStyles } from '../../customStyles/CustomStyles'
import { confirm, error } from '../../components/Alerts'
import { MaterialIcons } from '@expo/vector-icons'

const ListSales = ({ navigation }) => {
  const [dbFirebase, setDBFirebase] = useState(getDatabase(app))
  const [productsList, setProductsList] = useState({})
  const productsKey = Object.keys(productsList)
  const [salesList, setSalesList] = useState({})
  const salesKeys = Object.keys(salesList)
  const [clientsList, setClientsList] = useState({})
  const clientsKeys = Object.keys(clientsList)

  useEffect(() => {
    return onValue(
      ref(dbFirebase, '/administracion/ventas'),
      (querySnapShot) => {
        let data = querySnapShot.val() || {}
        let itemList = { ...data }
        setSalesList(itemList)
      }
    )
  }, [])

  useEffect(() => {
    return onValue(
      ref(dbFirebase, '/administracion/productos'),
      (querySnapShot) => {
        let data = querySnapShot.val() || {}
        let itemList = { ...data }
        setProductsList(itemList)
      }
    )
  }, [])

  useEffect(() => {
    return onValue(
      ref(dbFirebase, '/administracion/clientes'),
      (querySnapShot) => {
        let data = querySnapShot.val() || {}
        let itemList = { ...data }
        setClientsList(itemList)
      }
    )
  }, [])

  validatePostSale = (newSale) => {
    if (newSale !== undefined && newSale !== null) {
      if (
        newSale.nroFactura &&
        newSale.fecha &&
        newSale.cantidad &&
        newSale.producto //&&
        //newSale.total
      ) {
        return true
      }
    }
    error(
      'No se pudo registrar la venta',
      'Todos los campos deben completarse!'
    )
    return false
  }

  function postSale(newSale) {
    validatePostSale(newSale)
      ? push(ref(dbFirebase, '/administracion/ventas/'), newSale)
      : console.log('No se pudo agregar una nueva venta!')
    console.log('La venta a guardar es: ' + JSON.stringify(newSale))
  }

  function removeSale(id) {
    console.log('Delete Venta, with id: ' + id)
    id !== '' && id !== undefined
      ? remove(ref(dbFirebase, `/administracion/ventas/${id}`))
      : console.log('No se pudo crear eliminar la Venta!')
  }

  function GetAllSales() {
    return (
      <ScrollView>
        <View>
          {salesKeys.length > 0 ? (
            salesKeys.map((key) => {
              return (
                <SaleItem
                  key={key}
                  saleData={salesList[key]}
                  id={key}
                  navigation={navigation}
                  deleteFunction={removeSale}
                  productsList={productsList}
                  productsKey={productsKey}
                  clientsList={clientsList}
                  clientsKeys={clientsKeys}
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
      <GetAllSales />
      <FooterOptions
        navigation={navigation}
        screenTypeName={'Crear Venta'}
        extraData={{
          postFunction: postSale,
          productsList: productsList,
          productsKey: productsKey,
          clientsList: clientsList,
          clientsKeys: clientsKeys
        }}
      />
      <TouchableOpacity
        style={[
          CustomStyles.createButton,
          { right: 30, bottom: 100, backgroundColor: 'green' } // adjust the position and color as needed
        ]}
        //onPress={createPDF}
        onPress={() => {
          navigation.navigate('Seleccionar Cliente', {
            salesKeys: salesKeys,
            salesList: salesList,
            clientsKeys: clientsKeys,
            clientsList: clientsList,
            productsList: productsList
          })
        }}
      >
        <MaterialIcons name="account-balance-wallet" size={50} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default ListSales
