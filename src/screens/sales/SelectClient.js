import React, { useState } from 'react'
import { View, Text, Button } from 'react-native'
import { printToFileAsync } from 'expo-print'
import { shareAsync } from 'expo-sharing'
import DropDownList from '../../components/DropDownList'
import { CustomStyles } from '../../customStyles/CustomStyles'
import { WebView } from 'react-native-webview'
import emailjs from '@emailjs/browser'
import * as MailComposer from 'expo-mail-composer'

const SelectClient = ({ route, navigation }) => {
  const { salesKeys, salesList, clientsKeys, clientsList, productsList } =
    route.params
  const [client, setCliente] = useState({})
  const [fileUri, setFileUri] = useState()

  function GetAllSalesExport() {
    let recordsArray = []
    salesKeys.forEach((key) => {
      if (salesList[key].cliente == client) {
        recordsArray.push({
          nroFactura: salesList[key].nroFactura,
          fecha: salesList[key].fecha,
          cantidad: salesList[key].cantidad,
          producto: productsList[salesList[key].producto].nombre,
          total: salesList[key].total,
          cliente: `${clientsList[salesList[key].cliente].nombre} ${
            clientsList[salesList[key].cliente].apellido
          }`
        })
      }
    })

    // Agrupar por número de factura
    let groupedByInvoice = recordsArray.reduce((acc, record) => {
      if (!acc[record.nroFactura]) {
        acc[record.nroFactura] = []
      }
      acc[record.nroFactura].push(record)
      return acc
    }, {})
    console.log(groupedByInvoice)

    return groupedByInvoice
  }

  function generateHTML(recordsArray) {
    let html = '<html><body>'
    let recordKeys = Object.keys(recordsArray)
    console.log('Tamanho de la lista: ' + recordKeys.length)
    html += `<h1>Facturaciones de: ${clientsList[client].nombre} ${clientsList[client].apellido}</h1>`
    if (recordKeys.length == 0) {
      html += `<h4>No se registran facturas para este cliente</h4>`
      html += `<br>  </br>`
      html += '</body></html>'
    } else {
      recordKeys.forEach((key) => {
        html += `<h1>ID Factura: ${key}</h1>`
        recordsArray[key].forEach((record) => {
          html += `<p>Fecha: ${record.fecha}</p>`
          html += `<p>Producto: ${record.producto}</p>`
          html += `<p>Cantidad: ${record.cantidad}</p>`
          html += `<p>Total: ${record.total}</p>`
          html += `<br>  </br>`
        })
      })
      html += '</body></html>'
    }
    return html
  }

  let createPDF = async () => {
    const html = await generateHTML(GetAllSalesExport())
    //const html = generateHTML(salesList)
    await printToFileAsync({
      html: html,
      base64: false
    }).then(function (response) {
      let uri = response.uri
      let options = {
        attachments: [uri],
        body: `Estimado cliente, ${clientsList[client].nombre} ${clientsList[client].apellido}
        
        Le informamos ya se encuentran disponibles sus facturaciones de consumición:`,
        recipients: [`${clientsList[client].email}`],
        subject: `Facturación de Cliente`
      }

      MailComposer.composeAsync(options)
    })
  }

  const filterClients = () => {
    let arr = []
    clientsKeys.forEach((key) => {
      arr.push({
        value: key,
        label: `${clientsList[key]?.nombre} ${clientsList[key]?.apellido}`
      })
    })
    return arr
  }

  return (
    <View
      style={{
        height: '100%',
        justifyContent: 'space-evenly'
      }}
    >
      <View style={CustomStyles.inputContainer}>
        <Text style={[CustomStyles.label, { marginBottom: 50 }]}>
          Facturas del Cliente:{' '}
        </Text>
        {clientsKeys.length > 0 ? (
          <DropDownList
            style={{ marginBottom: 50 }}
            items={filterClients()}
            value={client}
            setValue={setCliente}
            zIndex={5000}
            placeholder={'Seleccione un cliente'}
          />
        ) : null}
      </View>
      <View style={[CustomStyles.buttons]}>
        <View>
          <Button
            title="Generar Facturación"
            onPress={() => {
              console.log(
                'Se ha decidido enviar email a: ' + clientsList[client]?.nombre
              )
              createPDF()
            }}
            color={CustomStyles.colors.mainBackground}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Button
            title="Cancelar"
            onPress={() => {
              setCliente('')
            }}
            color="grey"
          />
        </View>
      </View>
    </View>
  )
}

export default SelectClient
