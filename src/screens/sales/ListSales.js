import React, { useState, useEffect } from 'react'
import { ScrollView, View, ActivityIndicator, SafeAreaView, TouchableOpacity } from 'react-native'
import { app } from '../../../firebaseConfig'
import {
  getDatabase,
  ref,
  onValue,
  push,
  update,
  remove
} from 'firebase/database'
import FooterOptions from '../../components/FooterOptions'
import SaleItem from './SaleItem'
import { CustomStyles } from '../../customStyles/CustomStyles'
import { confirm, error } from '../../components/Alerts'
import { printToFileAsync } from 'expo-print'
import { shareAsync } from 'expo-sharing'
import { MaterialIcons } from '@expo/vector-icons'

const ListSales = ({ navigation }) => {
  const [dbFirebase, setDBFirebase] = useState(getDatabase(app))
  const [productsList, setProductsList] = useState({})
  const productsKey = Object.keys(productsList)
  const [salesList, setSalesList] = useState({})
  const salesKeys = Object.keys(salesList)
  const [clientsList, setClientsList] = useState({})
  const clientsKeys = Object.keys(clientsList)

  useEffect(() => {
    return onValue(
      ref(dbFirebase, '/administracion/ventas'),
      (querySnapShot) => {
        let data = querySnapShot.val() || {}
        let itemList = { ...data }
        setSalesList(itemList)
      }
    )
  }, [])

  useEffect(() => {
    return onValue(
      ref(dbFirebase, '/administracion/productos'),
      (querySnapShot) => {
        let data = querySnapShot.val() || {}
        let itemList = { ...data }
        setProductsList(itemList)
      },
    )
  }, [])

    useEffect(() => {
        return onValue(
          ref(dbFirebase, '/administracion/clientes'),
          (querySnapShot) => {
            let data = querySnapShot.val() || {}
            let itemList = { ...data }
            setClientsList(itemList)
          },
        )
      }, [])

  validatePostSale = (newSale) => {
    if (newSale !== undefined && newSale !== null) {
      if (
        newSale.nroFactura &&
        newSale.fecha &&
        newSale.cantidad &&
        newSale.producto //&&
        //newSale.total
      ) {
        return true
      }
    }
    error(
      'No se pudo registrar la venta',
      'Todos los campos deben completarse!'
    )
    return false
  }

  function postSale(newSale) {
    validatePostSale(newSale)
      ? push(ref(dbFirebase, '/administracion/ventas/'), newSale)
      : console.log('No se pudo agregar una nueva venta!')
    console.log('La venta a guardar es: ' + JSON.stringify(newSale))
  }

/*function GetAllSalesExport() {
    let recordsArray = [];

    salesKeys.forEach((key) => {
        recordsArray.push({
            nroFactura: salesList[key].nroFactura,
            fecha: salesList[key].fecha,
            cantidad: salesList[key].cantidad,
            producto: productsList[salesList[key].producto].nombre,
            total: salesList[key].total,
        });
    }
    return recordsArray;
}*/



function generateHTML(recordsArray) {
    let html = '<html><body>';
    console.log("Array de records: " + recordsArray[0])
    recordsArray.forEach((record) => {
        html += `<h1>Número de Factura: ${record.nroFactura}</h1>`;
        html += `<p>Fecha: ${record.fecha}</p>`;
        html += `<p>Producto: ${record.producto}</p>`;
        html += `<p>Cantidad: ${record.cantidad}</p>`;
        html += `<p>Total: ${record.total}</p>`;
    });
    html += '</body></html>';
    return html;
}


    let createPDF = async () => {
      //const html = generateHTML(GetAllSalesExport())
      const html = generateHTML(salesList)
      const file = await printToFileAsync({
            html: html,
            base64: false
          });

          await shareAsync(file.uri);
    };


  function removeSale(id) {
    console.log('Delete Venta, with id: ' + id)
    id !== '' && id !== undefined
      ? remove(ref(dbFirebase, `/administracion/ventas/${id}`))
      : console.log('No se pudo crear eliminar la Venta!')
  }

  function GetAllSales() {
    return (
      <ScrollView>
        <View>
          {salesKeys.length > 0 ? (
            salesKeys.map((key) => {
              return (
                <SaleItem
                  key={key}
                  saleData={salesList[key]}
                  id={key}
                  navigation={navigation}
                  deleteFunction={removeSale}
                  productsList={productsList}
                  productsKey={productsKey}
                  clientsList={clientsList}
                  clientsKeys={clientsKeys}
                />
              )
            })
          ) : (
            <ActivityIndicator size={'large'} color={`black`} />
          )}
        </View>
      </ScrollView>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GetAllSales />
      <FooterOptions
        navigation={navigation}
        screenTypeName={'Crear Venta'}
        extraData={{
          postFunction: postSale,
          productsList: productsList,
          productsKey: productsKey,
          clientsList: clientsList,
          clientsKeys: clientsKeys
        }}
      />
      <TouchableOpacity
      style={[
        CustomStyles.createButton,
        { right: 30, bottom: 100, backgroundColor: 'blue' } // adjust the position and color as needed
        ]}
        onPress={createPDF}
         >
         <MaterialIcons name="picture-as-pdf" size={50} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default ListSales
