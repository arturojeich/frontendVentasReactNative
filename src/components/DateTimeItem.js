import React, { useState } from 'react'
import { SafeAreaView, Button, Text, TouchableOpacity } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { CustomStyles } from '../customStyles/CustomStyles'

const DateTimeItem = ({ date, setDate, options }) => {
  const [mode, setMode] = useState('date')
  const [show, setShow] = useState(false)
  const { width, borderColor, fontColor, fontSize, height, backgroundColor } =
    options

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate
    setShow(false)
    setDate(currentDate)
  }

  const showMode = (currentMode) => {
    setShow(true)
    setMode(currentMode)
  }

  const showDatepicker = () => {
    showMode('date')
  }

  return (
    <SafeAreaView>
      <TouchableOpacity
        style={{
          backgroundColor: backgroundColor,
          fontSize: 26,
          width: width,
          height: height,
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: borderColor,
          borderWidth: 1,
          borderRadius: 10
        }}
        onPress={showDatepicker}
      >
        <Text
          style={{ fontSize: fontSize, color: fontColor }}
        >{`${date.getDate()}/${
          date.getMonth() + 1
        }/${date.getFullYear()}`}</Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </SafeAreaView>
  )
}

export default DateTimeItem
