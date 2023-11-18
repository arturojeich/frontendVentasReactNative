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
import ProductItem from './ProductItem'
import { confirm, error } from '../../components/Alerts'

const ListProducts = ({ navigation }) => {
  const [dbFirebase, setDBFirebase] = useState(getDatabase(app))
  const [categoriesList, setCategoriesList] = useState({})
  const categoriesKey = Object.keys(categoriesList)
  const [productList, setProductList] = useState({})
  const productsKeys = Object.keys(productList)

  useEffect(() => {
    return onValue(
      ref(dbFirebase, '/administracion/productos'),
      (querySnapShot) => {
        let data = querySnapShot.val() || {}
        let itemList = { ...data }
        setProductList(itemList)
      }
    )
  }, [])

  useEffect(() => {
    return onValue(
      ref(dbFirebase, '/administracion/categorias'),
      (querySnapShot) => {
        let data = querySnapShot.val() || {}
        let itemList = { ...data }
        setCategoriesList(itemList)
      }
    )
  }, [])

  validatePostProduct = (newProduct) => {
    if (newProduct !== undefined && newProduct !== null) {
      if (
        newProduct.nombre &&
        newProduct.categoria &&
        newProduct.codigo &&
        newProduct.precio
      ) {
        return true
      }
    }
    error(
      'No se pudo registrar el producto',
      'Todos los campos deben completarse!'
    )
    return false
  }

  function postProduct(newProduct) {
    validatePostProduct(newProduct)
      ? push(ref(dbFirebase, '/administracion/productos/'), newProduct)
      : console.log('No se pudo agregar un nuevo Producto!')
    console.log('El Producto a guardar es: ' + JSON.stringify(newProduct))
  }

  validatePutProduct = (newProduct) => {
    if (newProduct !== undefined && newProduct !== null) {
      if (
        newProduct.categoria ||
        newProduct.codigo ||
        newProduct.nombre ||
        newProduct.precio
      ) {
        return true
      }
    }
    return false
  }

  function putProduct(
    id,
    newProduct,
    setCategory,
    setLabelCodigo,
    setLabelNombre,
    setLabelPrecio
  ) {
    if (validatePutProduct(newProduct)) {
      update(ref(dbFirebase, `/administracion/productos/${id}`), newProduct)
      newProduct.nombre && setLabelNombre(newProduct.nombre)
      newProduct.categoria && setCategory(newProduct.categoria)
      newProduct.codigo && setLabelCodigo(newProduct.codigo)
      newProduct.precio && setLabelPrecio(newProduct.precio)
    } else {
      console.log('No se pudo actualizar el registro!')
    }
    console.log('El Producto a actualizar es: ' + JSON.stringify(newProduct))
  }

  function removeProduct(id) {
    console.log('Delete Producto, with id: ' + id)
    id !== '' && id !== undefined
      ? remove(ref(dbFirebase, `/administracion/productos/${id}`))
      : console.log('No se pudo crear eliminar el Producto!')
  }

  function GetAllProducts() {
    return (
      <ScrollView>
        <View>
          {productsKeys.length > 0 ? (
            productsKeys.map((key) => {
              return (
                <ProductItem
                  key={key}
                  productData={productList[key]}
                  id={key}
                  navigation={navigation}
                  putFunction={putProduct}
                  deleteFunction={removeProduct}
                  categoriesList={categoriesList}
                  categoriesKey={categoriesKey}
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
      <GetAllProducts />
      <FooterOptions
        navigation={navigation}
        screenTypeName={'Crear Producto'}
        extraData={{
          postFunction: postProduct,
          categoriesList: categoriesList,
          categoriesKey: categoriesKey
        }}
      />
    </SafeAreaView>
  )
}

export default ListProducts
