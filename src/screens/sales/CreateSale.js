import React, { useState } from 'react'
import { View, Text, TextInput, ScrollView, Button } from 'react-native'
import { CustomStyles } from '../../customStyles/CustomStyles'
import DropDownList from '../../components/DropDownList'

const CreateSale = ({ route, navigation }) => {
  let { extraData } = route.params
  let { postFunction, productsList, productsKey, clientsList, clientsKeys } = extraData
  const [product, setProduct] = useState('')
  const [newSale, setNewSale] = useState({})
  const [client, setClient] = useState('')


  inputTextClear = () => {
    setProduct('')
    setClient('')
    this.textInput1.clear()
    this.textInput2.clear()
    this.textInput3.clear()
  }

  function filterProducts() {
    let arr = []
    productsKey.forEach((key) => {
      arr.push({
        value: key,
        label: `${productsList[key]?.nombre}`
      })
    })
    return arr
  }

  function filterClients() {
    let arr = []
    clientsKeys.forEach((key) => {
      arr.push({
        value: key,
        label: `${clientsList[key]?.nombre}`
      })
    })
    return arr
  }

  return (
    <ScrollView>
      <View style={CustomStyles.inputContainer}>
        <Text style={[CustomStyles.label, { marginBottom: 10 }]}>
          Producto
        </Text>
        {productsKey.length > 0 ? (
          <DropDownList
            style={{ marginBottom: 50 }}
            items={filterProducts()}
            value={product}
            setValue={setProduct}
            zIndex={5000}
            placeholder={'Seleccione un Producto'}
          />
        ) : null}
      </View>
      <View style={CustomStyles.inputContainer}>
          <Text style={[CustomStyles.label, { marginBottom: 10 }]}>
            Cliente
          </Text>
          {clientsKeys.length > 0 ? (
            <DropDownList
              style={{ marginBottom: 70 }}
              items={filterClients()}
              value={client}
              setValue={setClient}
              zIndex={4000}
              placeholder={'Seleccione un Cliente'}
            />
          ) : null}
      </View>
      <View style={CustomStyles.inputContainer}>
          <Text style={CustomStyles.label}>Número de Factura</Text>
          <TextInput
            ref={(input) => {
              this.textInput1 = input
            }}
            style={CustomStyles.textInput}
            placeholder="Ej. '847-00'"
            onChangeText={(x) => setNewSale({ ...newSale, nroFactura: x })}
            defaultValue={''}
          />
      </View>
      <View style={CustomStyles.inputContainer}>
        <Text style={CustomStyles.label}>Fecha</Text>
        <TextInput
          ref={(input) => {
            this.textInput2 = input
          }}
          style={CustomStyles.textInput}
          placeholder="Ej. '16-08-2023'"
          onChangeText={(x) => setNewSale({ ...newSale, fecha: x })}
          defaultValue={''}
        />
      </View>
      <View style={CustomStyles.inputContainer}>
        <Text style={CustomStyles.label}>Cantidad</Text>
        <TextInput
          ref={(input) => {
            this.textInput3 = input
          }}
          style={CustomStyles.textInput}
          placeholder="Ej. '5'"
          onChangeText={(x) => setNewSale({ ...newSale, cantidad: x })}
          defaultValue={''}
        />
      </View>
      <View style={[CustomStyles.buttons, { marginTop: 50 }]}>
        <View>
          <Button
            title="Guardar"
            onPress={() => {
              const cantidad = parseInt(newSale.cantidad);
              const precio = parseInt(productsList[product].precio);
              //console.log(cantidad, precio)
              //console.log(typeof cantidad, typeof precio)
              //console.log(product)
              postFunction({ ...newSale, producto: product, cliente: client, total:(cantidad*precio) }),
                setNewSale({}),
                inputTextClear()
            }}
            color={CustomStyles.colors.mainBackground}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Button
            title="Cancelar"
            onPress={() => {
              setNewSale()
              inputTextClear()
            }}
            color="grey"
          />
        </View>
      </View>
    </ScrollView>
  )
}

export default CreateSale
