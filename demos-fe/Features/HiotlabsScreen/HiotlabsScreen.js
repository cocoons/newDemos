import * as React from 'react';
import { StyleSheet, Text, Image, View, ScrollView, Button,  } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { useEffect, useState} from 'react';
import { useNavigation} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios'
import { updateEmployeesList } from '../Employee/EmployeeSlice';
import { useDispatch} from 'react-redux';

const Stack = createStackNavigator();

export const HiotlabsScreen = () => {

  const dispatch = useDispatch();

  const [companyLists, setCompanyLists] = useState({
    perksList: [{id: 0, icon: '', title: '', description: ''}],
    employeesList: [{id: 0, name: '', fullName: '', avatar: '', title: '', source: ''}]
  })

  const [employeesList, setEmployeesList] = useState()
  const [waitForData, setWaitForData] = useState(false)

  const getUserData = (userId) => {
    axios
      //Change here to the ip you run the express server on it uses cors just for local testing between container and localhost
      //so as long as it finds the express server it should work fine

      .get('http://localhost:8080/' + `valtech/getLists` )
      .then(res => {
          console.log(`received user data in getUserData is:`, res.data)
          setCompanyLists(res.data)
          setEmployeesList(res.data.employeesList)
          dispatch(updateEmployeesList(res.data.employeesList))
          setWaitForData(true)
      })
    }

    useEffect(() => {
        getUserData()
    },[])

    return (
      <ScrollView >
        { 
          !waitForData ? <></>
          :
            <ScrollView horizontal style={{paddingLeft: 24}}>
                {
                  employeesList.map(employee => {
                    return (
                      <EmployeeHeaderCard key={employee.id} name={employee.name} avatar={employee.avatar} employee={employee}/>  
                    )})
                }                      
            </ScrollView>
        }

        <Heading text="Work perks and benefits"/>
        <ScrollView vertical>
          {
            companyLists.perksList.map(perk => {
            return (
              <Perks key={perk.id} title={perk.title} description={perk.description} image={perk.icon}/>
            )})
          }        
        </ScrollView>
      </ScrollView>
    )
};

const Heading = (props) => (
  <Text style={blipCardstyles.heading}>
    {props.text}
  </Text>
);

const Perks = (props) => (
  <View style={perks.layout}>
      <Image style={perks.image} source={{ uri: props.image }} />
    <View style={perks.content}>
      <Text style={perks.title}> {props.title} </Text>
      <Text style={perks.description} numberOfLines={4}> {props.description} </Text>
    </View>
  </View>
);

const EmployeeHeaderCard = (props) => {
  const nav = useNavigation()
  const headerHeight = useHeaderHeight(); // if adding navigationHeader to mainScreen then style={{paddingTop: headerHeight }}
  //console.log(`props.employee is: `, props.employee)
  return (
    <>
      <View style={{paddingTop: 10 }} >
        <View style={blipCardstyles.card} onClick={() => nav.navigate('Employee', props.employee) }>
          <EmployeeCardAvatar url={props.employee.avatar} />
          <Text style={blipCardstyles.name}> {props.employee.name} </Text>
        </View>
      </View>
  </>
  )
}

const EmployeeCardAvatar = (props) => {
  const nav = useNavigation()
  return (
  <Image 
    style={blipCardstyles.avatar}
    source={{ uri: props.url }}
  />
  )
}

  const perks = StyleSheet.create({
    layout: {
      flex: 1, 
      marginHorizontal: 24,
      flexDirection: 'row',
    },
    image: {
      width: 30,
      height: 31,
      borderRadius: 12,
      marginRight: 10,
    },
    content: {
      flex: 2,
      marginBottom: 10,
    },
    title: {
      color: '#280D5F',
      fontSize: 10,
      fontWeight: '600',
      fontStyle: 'normal',
      fontFamily: 'kanit',
      lineHeight: 14,
      textTransform: 'uppercase',
      paddingTop: 5,
    },
    description: {
      color: '#280D5F',
      fontSize: 10,
      fontWeight: '400',
      fontStyle: 'normal',
      fontFamily: 'Open Sans',
      lineHeight: 18,
      paddingTop: 2,  
    },
  });


const blipCardstyles = StyleSheet.create({
  avatar: {
    borderRadius: '50%',
    width: 64,
    height: 64,
  },
  img: {
    borderRadius: '50%',
    width: 128,
    height: 128,
  },  
  card: {
    width: 88,
    height: 112,
    borderRadius: 12,
    padding: 10,
    marginRight: 0,
    background: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E3EB',
    marginRight: 10,

  },  
  heading: { 
    color: '#08060B',
    fontSize: 20,
    fontWeight: '600',
    fontStyle: 'normal',
    fontFamily: 'Kanit',
    lineHeight: 22,
    paddingTop: 20,
    paddingBottom: 12,
    paddingLeft: 24,
  },
  name: {
    color: '#280D5F',
    fontSize: 12,
    fontWeight: '600',
    fontStyle: 'normal',
    fontFamily: 'kanit',
    lineHeight: 14,
    paddingTop: 12, 
    textTransform: 'uppercase', 
    textAlign: 'center',
  },
});


