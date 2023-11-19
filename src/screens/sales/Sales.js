import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import MyStack from '../../components/Stack'

const Sales = () => {
  const listScreens = [
    {
      key: 'List Sales'
    },
    {
      key: 'Create Sale'
    }//,
    //{
    //  key: 'Edit Product'
    //}
  ]
  return (
    <NavigationContainer independent={true}>
      <MyStack listScreens={listScreens} />
    </NavigationContainer>
  )
}

export default Sales
