import React from 'react'
import { TouchableOpacity } from 'react-native'
import { CustomStyles } from '../customStyles/CustomStyles'
import { MaterialIcons } from '@expo/vector-icons'

const FooterOptions = ({ navigation, screenTypeName, extraData }) => {
  return (
    <TouchableOpacity
      style={CustomStyles.createButton}
      onPress={() =>
        navigation.navigate(screenTypeName, {
          extraData: extraData ? extraData : null
        })
      }
    >
      <MaterialIcons name="add" size={60} color="white" />
    </TouchableOpacity>
  )
}

export default FooterOptions
