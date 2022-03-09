import * as React from 'react';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { ValtechScreen } from '../ValtechScreen/ValtechScreen';
import { ValtechAddOffertScreen } from '../ValtechScreen/ValtechAddOffertScreen ';

const Tab = createBottomTabNavigator();

export const ValtechNavigator1 = (props) => {
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
      <Tab.Screen name="Offert" options={{headerShown:false}} component={ValtechScreen} />
      <Tab.Screen name="See Offerts" options={{headerShown:false}} component={ValtechAddOffertScreen} />
    </Tab.Navigator>
  )
}
