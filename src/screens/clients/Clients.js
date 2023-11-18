import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import MyStack from '../../components/Stack'

const Clients = () => {
  const listScreens = [
    {
      key: 'List Clients'
    },
    {
      key: 'Create Client'
    },
    {
      key: 'Edit Client'
    }
  ]
  return (
    <NavigationContainer independent={true}>
      <MyStack listScreens={listScreens} />
    </NavigationContainer>
  )
}

export default Clients
