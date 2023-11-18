import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import MyStack from '../../components/Stack'

const Categories = () => {
  const listScreens = [
    {
      key: 'List Categories'
    },
    {
      key: 'Create Category'
    },
    {
      key: 'Edit Category'
    }
  ]
  return (
    <NavigationContainer independent={true}>
      <MyStack listScreens={listScreens} />
    </NavigationContainer>
  )
}

export default Categories
