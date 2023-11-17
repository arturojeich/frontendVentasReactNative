import { StatusBar } from 'expo-status-bar'
import Drawers from './src/components/Drawers'
import { NavigationContainer } from '@react-navigation/native'

export default function App() {
  return (
    <NavigationContainer>
      <Drawers />
    </NavigationContainer>
  )
}
