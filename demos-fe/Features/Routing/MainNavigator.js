import * as React from 'react';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { ValtechScreen } from '../ValtechScreen/ValtechScreen';
import { StartScreen } from '../StartScreen/StartScreen'
import { HiotLabsNavigator1 } from './HiotlabsNavigator'
import { ValtechNavigator1 } from './ValtechNavigator';

const Tab = createBottomTabNavigator();

export const MainNavigator = (props) => {
  return (
    <Tab.Navigator 
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTransparent:true,
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          color: '#08060B',
          paddingLeft: 10
        },
      }}         
    >
      <Tab.Screen name="Start" options={{headerShown:false}} component={StartScreen} />
      <Tab.Screen name="Hiotlabs" options={{headerShown:false}} component={HiotLabsNavigator1} />
      <Tab.Screen name="Valtech" options={{headerShown:false}} component={ValtechNavigator1} />
    </Tab.Navigator>
  )
}
