import * as React from 'react';
import { StyleSheet, Text, ScrollView, Image, View, Picker} from 'react-native';
import { useEffect, useState} from 'react';
import axios from 'axios'
import { useDispatch} from 'react-redux';
import { useSelector } from 'react-redux';
import { selectCurrentAuth } from '../Login/LoginSlice'
import { Icon } from 'react-native-elements';
import { Card } from 'react-native-elements'

const getUserOfferts = (userId, setUserOffertsList, setWaitForData) => {
  //console.log('userID is: ', userId)
  axios
    .post('http://172.29.91.47:8080/' + `valtech/getUserOffertsByUserId`, {'userId': userId} )
    .then(res => {
        console.log(`received user data in getUserOfferts is:`, res.data)
        setUserOffertsList(JSON.parse(JSON.stringify(res.data)))
        setWaitForData(true)
    })
  }

export const ValtechAddOffertScreen = () => {
  const dispatch = useDispatch();
  const currentAuth = useSelector(selectCurrentAuth)

  const [userOffertList, setUserOffertList] = useState()
  const [waitForData, setWaitForData] = useState(false)

  const [name, setName] = useState(currentAuth.username)
  const [userId, setUserId] = useState(currentAuth.id)
  const [selectedOffer, setSelectedOffert] = useState("Select offert")
  const [pickerItemIsSelected, setPickerItemIsSelected] = useState(false)

  const [selectedOffertObject, setSelectedOffertObject] = useState("Select offert")


  useEffect(() => {
    console.log('userOffertList is: ', userOffertList)
    console.log('selectedOffer is: ', selectedOffer)
    console.log('selectedOffertObject is: ', selectedOffertObject)
  })

  useEffect(() => {
    console.log('currentAuth in valtechScreen is: ', currentAuth)
    getUserOfferts(currentAuth.id, setUserOffertList, setWaitForData)
  },[selectedOffer])

  const setPickerIsSelected = (itemValue) => {
    console.log("testing")
    setSelectedOffert(itemValue)
    setPickerItemIsSelected(true)
    setSelectedOffertObject(userOffertList.filter((it) => it.createdAt === itemValue)[0])
  }

  return (
    <ScrollView vertical>
        <View style={style.container}>  
          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 40, marginBottom: 8}}>
            <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
              <View>
                <Text style={style.title}> Select Offert </Text>
              </View>
            <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
          </View>

          <View style={style.item}>
            { waitForData &&
              <Picker
                selectedValue={selectedOffer}
                style={style.picker}
                onValueChange={(itemValue, itemIndex) => setPickerIsSelected(itemValue, itemIndex)}>
                <Picker.Item key={20} label={selectedOffer} value={selectedOffer} />
                {
                  userOffertList.map( offert => {
                    return (
                      <Picker.Item key={offert.id} label={offert.createdAt} value={offert.createdAt} />
                    )
                  })
                }
              </Picker>
            }
          </View>

          { pickerItemIsSelected &&
            <View style={{width: '100%', flexDirection: 'column',  marginLeft: "auto", marginRight: "auto", padding: 8,}} >
              <Card>
                <Card.Title>Offert</Card.Title>
                <Card.Divider />
                <Card.Image
                  style={{ padding: 0}}
                  source={{uri:'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg'}}
                />
                  <View style={{flexDirection: 'row', marginTop: 20}}>
                    <Icon style={{marginTop: 1, marginRight: 20}} name='house' type='materialicons' color='#00aced' />
                    <Text style={style.text} >Company: {selectedOffertObject.companyName}</Text>
                  </View>

                  <View style={{flexDirection: 'row', marginTop: 5 }}>
                    <Icon style={{marginTop: 1, marginRight: 20}} name='email' type='fontisto' color='#00aced' />
                    <Text style={style.text} >Email: {selectedOffertObject.offert.email}</Text>
                  </View>

                  <View style={{flexDirection: 'row', marginTop: 5 }}>
                    <Icon style={{marginTop: 1, marginRight: 20}} name='mobile1' type='antdesign' color='#00aced' />
                    <Text style={style.text} >Mobile: {selectedOffertObject.offert.mobile}</Text>
                  </View>

                  <View style={{flexDirection: 'row', marginTop: 5 }}>
                    <Icon style={{marginTop: 1, marginRight: 20}} name='address' type='entypo' color='#00aced' />
                    <Text style={style.text} >adressA: {selectedOffertObject.offert.adressA}</Text>
                  </View>

                  <View style={{flexDirection: 'row', marginTop: 5 }}>
                    <Icon style={{marginTop: 1, marginRight: 20}} name='address' type='entypo' color='#00aced' />
                    <Text style={style.text} >adressB: {selectedOffertObject.offert.adressB}</Text>
                  </View>

                  <View style={{flexDirection: 'row', marginTop: 5 }}>
                    <Icon style={{marginTop: 1, marginRight: 20}} name='house' type='materialicons' color='#00aced' />
                    <Text style={style.text} >Area: {selectedOffertObject.offert.area}</Text>
                  </View>                           
                
                  <View style={{flexDirection: 'row', marginTop: 5 }}>
                    <Icon style={{ marginRight: 20}} name='shrink' type='antdesign' color='#00aced' />
                    <Text style={style.text} >DistanceAToB: {selectedOffertObject.offert.distanceAToB}</Text>
                  </View>

                  <View style={{flexDirection: 'row', marginTop: 5 }}>
                    <Icon style={{marginTop: 1, marginRight: 20}} name='bucket' type='entypo' color='#00aced' />
                    <Text style={style.text} >distanceUnit: {selectedOffertObject.offert.distanceUnit}</Text>
                  </View>   
                  
                  <View style={{flexDirection: 'row', marginTop: 5 }}>
                    <Icon style={{marginTop: 1, marginRight: 20}} name='house-siding' type='materialicons' color='#00aced' />
                    <Text style={style.text} >HaveGarret: {JSON.stringify(selectedOffertObject.offert.haveGarret)}</Text>
                  </View>  

                  <View style={{flexDirection: 'row', marginTop: 5 }}>
                    <Icon style={{marginTop: 1, marginRight: 20}} name='house' type='materialicons' color='#00aced' />
                    <Text style={style.text} >GarretArea: {selectedOffertObject.offert.garretArea}</Text>
                  </View>                    
                  
                  <View style={{flexDirection: 'row', marginTop: 5 }}>
                    <Icon style={{marginTop: 1, marginRight: 20}} name='line-weight' type='materialicons' color='#00aced' />
                    <Text style={style.text} >HavePiano: {JSON.stringify(selectedOffertObject.offert.havePiano)}</Text>
                  </View>                     
                  
                  <View style={{flexDirection: 'row', marginTop: 5 }}>
                    <Icon style={{marginTop: 1, marginRight: 20}} name='shopping-package' type='fontisto' color='#00aced' />
                    <Text style={style.text} >PackagingHelp: {JSON.stringify(selectedOffertObject.offert.packagingHelp)}</Text>
                  </View>  

                  <View style={{flexDirection: 'row', marginTop: 5 }}>
                    <Icon style={{marginTop: 1, marginRight: 20}} name='price-tag' type='entypo' color='#00aced' />
                    <Text style={style.text} >OffertPrice: {selectedOffertObject.offert.price}</Text>
                  </View>  

                  
              </Card>
            </View>
          }

        </View>
          
        { /*<View>
          <Text>debug: {JSON.stringify(userOffertList)}</Text>
        </View> */}
    </ScrollView>


  )
};

const OffertItem = (props) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <Icon style={{marginTop: 1, marginRight: 25}} name='select-arrows' type='entypo' color='#00aced' />
      <Text style={style.text} >{props.title}: {props.value}</Text>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1, 
    width: '80%',
    flexDirection: 'column',
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  item: {
    width: '40%',
    textAlign: 'center',
    flexDirection: 'row',
    padding: 8,
    marginLeft: "auto",
    marginRight: "auto", 
    justifyContent: 'center'
  },
  picker: {
    flex: 2,  
    fontSize: 16,
    textAlign: 'center',
    backgroundColor: 'white', 
    color: 'black', 
    height: 43, 
    marginBottom: 5,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#00aced',    
  }, 
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#08060B',
    fontSize: 20,
    fontStyle: 'normal',
    fontFamily: 'Kanit',
    lineHeight: 22,
  },
  text: {
    marginTop: 2,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#08060B',
    fontSize: 12,
    fontStyle: 'normal',
    fontFamily: 'Kanit',
    lineHeight: 22,
  },   
})
