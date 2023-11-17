import React, { useState } from 'react'
import { View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { CustomStyles } from '../customStyles/CustomStyles'

const DropDownList = ({ items, value, setValue, zIndex, placeholder }) => {
  const [open, setOpen] = useState(false)
  DropDownPicker.setListMode('SCROLLVIEW')

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 15
        }}
      >
        <DropDownPicker
          style={{
            borderColor: CustomStyles.colors.mainBackground
          }}
          textStyle={{ fontSize: 20 }}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          zIndex={zIndex}
          placeholder={placeholder}
        />
      </View>
    </View>
  )
}

export default DropDownList
