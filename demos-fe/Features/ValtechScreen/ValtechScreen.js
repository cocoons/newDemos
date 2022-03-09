import * as React from 'react';
import { StyleSheet, Text, ScrollView, Image, View, Button, Picker, TouchableOpacity} from 'react-native';
import { useEffect, useState} from 'react';
import { useNavigation} from '@react-navigation/native';
import axios from 'axios'
import { useDispatch} from 'react-redux';
import { useSelector } from 'react-redux';
import { selectCurrentAuth } from '../Login/LoginSlice'
import { Icon } from 'react-native-elements';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { TextInput } from 'react-native-element-textinput';

const getUserOfferts = (userId, setCompanyOffertsLists, setWaitForData) => {
  //console.log('userID is: ', userId)
  axios
    .post('http://localhost:8080/' + `valtech/getUserOffertsByUserId`, {'userId': userId} )
    .then(res => {
        console.log(`received user data in getUserData is:`, res.data)
        setCompanyOffertsLists(res.data)
        setWaitForData(true)
    })
  }
  const addUserOffertToUser = (data, setCompanyOffertsLists) => {
    //console.log('userID is: ', userId)
    axios
      .post('http://localhost:8080/' + `valtech/addUserOffert`, data )
      .then(res => {
          console.log(`received data in addUserOffert is:`, res.data)
          setCompanyOffertsLists(res.data)
      })
    }  

export const ValtechScreen = () => {
  const dispatch = useDispatch();
  const currentAuth = useSelector(selectCurrentAuth)

  const [userOffertList, setUserOffertList] = useState()
  const [waitForData, setWaitForData] = useState(false)

  const [name, setName] = useState(currentAuth.username)
  const [userId, setUserId] = useState(currentAuth.id)
  const [email, setEmail] = useState()
  const [mobile, setMobile] = useState()
  const [adressA, setAdressA] = useState()
  const [adressB, setAdressB] = useState()
  const [distanceAToB, setDistanceAToB] = useState()
  const [distanceUnit, setDistanceUnit] = useState('select unit')
  const [area, setArea] = useState(0)
  const [haveGarret, setHaveGarret] = useState(false)
  const [garretArea, setGarretArea] = useState(0)
  const [havePiano, setHavePiano] = useState(false)
  const [packagingHelp, setPackagingHelp] = useState(false)
  const [totPrice, setTotPrice] = useState(false)

  const distanceUnits = [{id: 0, unit: 'meter'}, {id: 1, unit: 'kilometer'}, {id: 3, unit: 'miles'}]

  const collector = {
  "companyName": name, 
  "userId": userId,
  "offert":
  { "area": area,
    "email": email,
    "price": totPrice,
    "mobile": mobile,
    "adressA": adressA,
    "adressB": adressB,
    "havePiano": havePiano,
    "haveGarret": haveGarret,
    "garretArea": garretArea,
    "distanceAToB": distanceAToB,
    "distanceUnit": distanceUnit,
    "packagingHelp": packagingHelp},
  }

  useEffect(() => {
    console.log('collector in valtechScreen is: ', collector)
  })

  useEffect(() => {
    console.log('currentAuth in valtechScreen is: ', currentAuth)
    getUserOfferts(currentAuth.id, setUserOffertList, setWaitForData)
  },[])

  const setUnit = (itemValue) => {
    setDistanceUnit(itemValue)
  }

  const calculateOffertPrice = async () => {
    console.log("inside calculate")
    var isIntOrDec = true
    if ( !Number.isInteger(parseInt(area, 10)) ) isIntOrDec = false
    if ( !Number.isInteger(parseInt(garretArea, 10)) ) isIntOrDec = false
    if ( !Number.isInteger(parseInt(distanceAToB, 10)) ) isIntOrDec = false

    if (isIntOrDec){
      var distancePrice = 0
      var volumePrice = 0
      var pianoPrice = 0

      var totGarretArea = parseInt(garretArea, 10) * 2
      var totArea = totGarretArea + parseInt(area, 10)
      var tmpDistance = parseInt(distanceAToB, 10)

      //distance price
      if (tmpDistance >= 0 && tmpDistance <= 49 )
      {
        distancePrice = 1000 + tmpDistance * 10
      }
      else if(tmpDistance > 49 && tmpDistance <= 99)
      {
        distancePrice = 5000 + tmpDistance * 8
      }
      else if(tmpDistance > 100 )
      {
        distancePrice = 10000 + tmpDistance * 7
      } 
      else
      {
        return "Distance exceeds 2^53 - 1"
      }
      
      //volumePrice
      if (Math.floor(totArea / 50) < 1) {
        //console.log('volumePrice = 1 * distancePrice')
        volumePrice = 1 * distancePrice
      }
      else {
        //console.log('volumePrice = Math.ceil(totArea / 50) * distancePrice',  volumePrice = Math.ceil(totArea / 50) * distancePrice)
        volumePrice = Math.ceil(totArea / 50) * distancePrice
      }

      //pianoPrice
      if (havePiano) pianoPrice = 5000

    }
    else {
      console.log("form input error")
    }

    collector.offert.price = distancePrice + volumePrice + pianoPrice
    console.log('collector is: ', collector)
    console.log(`totGarretArea is: ${totGarretArea}, totArea is: ${totArea}, tmpDistance is: ${tmpDistance}`)
    console.log(`totPrice:, : distancePrice: ${distancePrice}, volumePrice: ${volumePrice}, pianoPrice: ${pianoPrice}`)
    //setTotPrice(distancePrice + volumePrice + pianoPrice)
    
    addUserOffertToUser(collector, setUserOffertList)
  }

  return (
    <ScrollView vertical>
        <View style={form.layout}>  
          <Text style={form.title}>{currentAuth.username}: Get a new offert.</Text>
          <FormTextInput text={'Email'} icon={'email'} type='fontisto' value={email} setter={setEmail} />
          <FormTextInput text={'Mobile'} icon={'mobile1'} type='antdesign' value={mobile} setter={setMobile} />
          <FormTextInput text={'Area'} icon={'house'} type='materialicons' value={area} setter={setArea} />
          <FormTextInput text={'From address'} icon={'address'} type='entypo' value={adressA} setter={setAdressA} />
          <FormTextInput text={'To address'} icon={'address'} type='entypo' value={adressB} setter={setAdressB} />
          <FormTextInput text={'Distance'} icon={'arrowright'} type='antdesign' value={distanceAToB} setter={setDistanceAToB} />
          
          <View style={{marginTop: 2, marginHorizontal: 12, flexDirection: 'row'}}>
          <Icon style={{marginRight: 20, marginTop: 6}} name='select-arrows' type='entypo' color='#00aced' />
            <Picker
              selectedValue={distanceUnit}
              style={form.picker}
              onValueChange={(itemValue, itemIndex) => setDistanceUnit(itemValue)}>
              <Picker.Item key={20} label={distanceUnit} value={distanceUnit} />
              {
                distanceUnits.map( unit => {
                  return (
                    <Picker.Item key={unit.id} label={unit.unit} value={unit.unit} />
                  )
                })
              }
            </Picker> 
            
          </View>

          <FormCheckbox value={haveGarret} text={'Have garret?'} setter={setHaveGarret} />
          {
            haveGarret && <FormTextInput text={'Area'} icon={'house-siding'} type='materialicons' value={garretArea} setter={setGarretArea} />
          }  
          <FormCheckbox value={havePiano} text={'Have piano?'} setter={setHavePiano} />          
          <FormCheckbox value={packagingHelp} text={'Want packaging?'} setter={setPackagingHelp} />

          <View style={{marginLeft: 60, justifyContent: 'center', marginHorizontal: 12, flexDirection: 'column', marginTop: 20}}>
            <TouchableOpacity style={{width: '100%', borderRadius: 8, borderWidth: 0.5, borderColor: '#00aced', height: 45, marginRight: 20, backgroundColor: 'white'}} onPress={() => {calculateOffertPrice()} }>
              <Text style={{fontSize: 16, color: 'black', textAlign: "center", marginVertical: 10}}>Submit</Text>
            </TouchableOpacity>   
          </View>

        </View>
        
    </ScrollView>


  )
};

const FormTextInput = (props) => {
  return (
    <View style={{ marginTop: 2,  flex: 1, justifyContent: 'center', marginHorizontal: 12, flexDirection: 'row'}}>
      <Icon style={{marginRight: 20, marginTop: 7}} name={props.icon} type={props.type} color='#00aced' />
      <TextInput
        value={props.value}
        style={form.input}
        inputStyle={form.inputStyle}
        labelStyle={form.labelStyle}
        textStyle={{textAlign: 'center'}}
        placeholderStyle={form.placeholderStyle}
        textErrorStyle={form.textErrorStyle}
        label={props.text}
        placeholder={''}
        placeholderTextColor='#00aced'
        focusColor="blue"
        showIcon={false}
        onChangeText={props.setter}
      />
  </View>  
  )
}

const FormCheckbox = (props) => {
  return (
    <View style={{marginLeft: 60, marginTop: 2, marginHorizontal: 12, flexDirection: 'row'}}>
      <BouncyCheckbox
        style={{ marginTop: 2}}
        isChecked={props.value}
        text={props.text}
        textStyle={{ fontSize: 16, color: 'black', height: 30 }}
        iconStyle={{backgroundColor: '#00aced', borderColor: 'black'}}
        disableBuiltInState
        onPress={() => props.setter(!props.value)}
      />
   </View>    
  )
}

const form = StyleSheet.create({
  layout: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 8,
    marginLeft: "auto",
    marginRight: "auto",
  },
  item: {
    width: '100%',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#00aced', 
    color: 'black', 
    height: 30, 
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 20,
    color: '#08060B',
    fontSize: 20,
    fontStyle: 'normal',
    fontFamily: 'Kanit',
    lineHeight: 22,
    paddingTop: 20,
    paddingBottom: 12,
    paddingLeft: 0,    
    marginLeft: 33
  },
  input: {
    backgroundColor: 'white',
    height: 45,
    paddingHorizontal: 30,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#00aced',
  },
  inputStyle: { fontSize: 16 },
  labelStyle: {
    fontSize: 14,
    position: 'absolute',
    top: -10,
    backgroundColor: 'white',
    paddingHorizontal: 4,
    marginLeft: -4,
  },
  placeholderStyle: { fontSize: 16 },
  textErrorStyle: { fontSize: 16 },  
  picker: {
    flex: 2,  
    fontSize: 16,
    textAlign: 'center',
    alignItems: 'center',
    backgroundColor: 'white', 
    color: 'black', 
    height: 43, 
    marginBottom: 5,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#00aced',    
  },  
  image: {
    width: 30,
    height: 31,
    borderRadius: 12,
    marginRight: 10,
  },
})
