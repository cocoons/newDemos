import * as React from 'react';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { HireFireScreen } from '../HiotlabsScreen/HireFireScreen/HireFireScreen';
import { HiotlabsScreen } from '../HiotlabsScreen/HiotlabsScreen';

const Tab = createBottomTabNavigator();

export const HiotLabsNavigator1 = (props) => {
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
      <Tab.Screen name="Perks" options={{headerShown:false}} component={HiotlabsScreen} />
      <Tab.Screen name="HireFire" component={HireFireScreen} />
    </Tab.Navigator>
  )
}
