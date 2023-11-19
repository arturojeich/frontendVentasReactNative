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
import SaleItem from './SaleItem'
import { confirm, error } from '../../components/Alerts'

const ListSales = ({ navigation }) => {
  const [dbFirebase, setDBFirebase] = useState(getDatabase(app))
  const [productsList, setProductsList] = useState({})
  const productsKey = Object.keys(productsList)
  const [salesList, setSalesList] = useState({})
  const salesKeys = Object.keys(salesList)

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

  /*validatePutProduct = (newSale) => {
    if (newSale !== undefined && newSale !== null) {
      if (
        newSale.categoria ||
        newSale.codigo ||
        newSale.nombre ||
        newSale.precio
      ) {
        return true
      }
    }
    return false
  }*/

  /*function putProduct(
    id,
    newSale,
    setCategory,
    setLabelCodigo,
    setLabelNombre,
    setLabelPrecio
  ) {
    if (validatePutProduct(newSale)) {
      update(ref(dbFirebase, `/administracion/productos/${id}`), newSale)
      newSale.nombre && setLabelNombre(newSale.nombre)
      newSale.categoria && setCategory(newSale.categoria)
      newSale.codigo && setLabelCodigo(newSale.codigo)
      newSale.precio && setLabelPrecio(newSale.precio)
    } else {
      console.log('No se pudo actualizar el registro!')
    }
    console.log('El Producto a actualizar es: ' + JSON.stringify(newSale))
  }*/

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
          productsKey: productsKey
        }}
      />
    </SafeAreaView>
  )
}

export default ListSales
