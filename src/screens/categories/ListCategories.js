import React, { useState, useEffect } from 'react'
import { ScrollView, View, ActivityIndicator, SafeAreaView } from 'react-native'
import { app } from '../../../firebaseConfig'
import { getDatabase, ref, onValue, push, update } from 'firebase/database'
import FooterOptions from '../../components/FooterOptions'
import CategoryItem from './CategoryItem'

const ListCategories = ({ navigation }) => {
  const [dbFirebase, setDBFirebase] = useState(getDatabase(app))
  const [categoryList, setCategoryList] = useState({})
  const categoryKeys = Object.keys(categoryList)

  useEffect(() => {
    return onValue(
      ref(dbFirebase, '/administracion/categorias'),
      (querySnapShot) => {
        let data = querySnapShot.val() || {}
        let itemList = { ...data }
        setCategoryList(itemList)
      }
    )
  }, [])

  function putCategory({ id, data }) {
    console.log('Update Category, with description: ' + data.nombre)
    console.log('Update Category, with id: ' + id)
    data.nombre !== '' && id !== '' && id !== undefined
      ? update(ref(dbFirebase, `/administracion/categorias/${id}`), data)
      : console.log('No se pudo crear actualizar categoria!')
  }

  validateCategory = (newCategory) => {
    if (newCategory !== undefined && newCategory !== null) {
      if (newCategory.nombre) {
        return true
      }
    }
    error(
      'No se pudo registrar la categoria',
      'Todos los campos deben completarse!'
    )
    return false
  }

  function postCategory(newCategory) {
    validateCategory(newCategory)
      ? push(ref(dbFirebase, '/administracion/categorias/'), newCategory)
      : console.log('No se pudo agregar una nueva Categoria!')
    console.log('La categoria a guardar es: ' + JSON.stringify(newCategory))
  }

  function GetAllCategories() {
    return (
      <ScrollView>
        <View>
          {categoryKeys.length > 0 ? (
            categoryKeys.map((key) => {
              return (
                <CategoryItem
                  key={key}
                  categoryData={categoryList[key]}
                  id={key}
                  navigation={navigation}
                  db={dbFirebase}
                  putFunction={putCategory}
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
      <GetAllCategories />
      <FooterOptions
        navigation={navigation}
        db={dbFirebase}
        screenTypeName={'Crear Categoría'}
        extraData={postCategory}
      />
    </SafeAreaView>
  )
}

export default ListCategories
