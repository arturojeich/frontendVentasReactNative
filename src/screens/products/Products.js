import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import MyStack from '../../components/Stack'

const Products = () => {
  const listScreens = [
    {
      key: 'List Products'
    },
    {
      key: 'Create Product'
    },
    {
      key: 'Edit Product'
    }
  ]
  return (
    <NavigationContainer independent={true}>
      <MyStack listScreens={listScreens} />
    </NavigationContainer>
  )
}

export default Products
