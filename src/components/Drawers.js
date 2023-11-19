import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Categories from '../screens/categories/Categories'
import Products from '../screens/products/Products'
import Sales from '../screens/sales/Sales'
import Clients from '../screens/clients/Clients'
import { CustomStyles as style } from '../customStyles/CustomStyles'

const Drawer = createDrawerNavigator()

const Drawers = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: style.colors.mainBackground
        },
        headerTitleStyle: {
          fontSize: 26,
          color: 'black'
        },
        drawerStyle: {
          backgroundColor: style.colors.mainBackground
        },
        drawerActiveBackgroundColor: style.colors.secondaryBackground,
        drawerActiveTintColor: style.colors.mainText
      }}
    >
      <Drawer.Screen
        name="Home"
        component={Sales}
        options={{
          drawerIcon: () => (
            <MaterialCommunityIcons
              name="view-dashboard"
              size={54}
              color="black"
            />
          ),
          headerPressOpacity: 1,
          headerPressColor: style.colors.mainBackground,
          drawerActiveBackgroundColor: style.colors.mainBackground,
          drawerLabelStyle: {
            height: 80,
            alignSelf: 'center',
            fontSize: 35,
            textAlignVertical: 'center',
            color: 'black'
          }
        }}
      />
      <Drawer.Screen
        name="Categorias"
        component={Categories}
        options={{
          drawerIcon: () => (
            <MaterialIcons name="calendar-today" size={24} color="black" />
          )
        }}
      />
      <Drawer.Screen
        name="Productos"
        component={Products}
        options={{
          drawerIcon: () => (
            <MaterialIcons name="category" size={24} color="black" />
          )
        }}
      />
      <Drawer.Screen
        name="Clientes"
        component={Clients}
        options={{
          drawerIcon: () => (
            <MaterialIcons name="people" size={24} color="black" />
          )
        }}
      />
      <Drawer.Screen
          name="Ventas"
          component={Sales}
          options={{
            drawerIcon: () => (
              <MaterialIcons name="receipt" size={24} color="black" />
            )
          }}
        />
    </Drawer.Navigator>
  )
}

export default Drawers
