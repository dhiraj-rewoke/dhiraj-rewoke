import{useEffect, useState} from 'react';
import { StyleSheet, TextInput, ScrollView } from 'react-native';
import {Picker} from '@react-native-picker/picker';


//import EditScreenInfo from '../components/EditScreenInfo';

import { Text, View } from '../components/Themed';

import { VictoryBar, VictoryTheme, VictoryChart} from "victory-native";



const state = [
  {"code": 'AN', 'name': 'Andaman Nicober'},
  {'code': 'Ap', 'name': 'Andhra Pradesh'},
  {'code': 'AR', 'name': 'Arunachal Pradesh'},
  {'code': 'AS', 'name' : 'Assam'},
  {'code': 'BR', 'name':'Bihar'},
  {'code': 'CH', 'name': 'Chandigarh'},
  {'code': 'CT', 'name':'Chattishgarh'},
  {'code': 'DL', 'name': 'Delhi'},
  {'code': 'DN', 'name': 'damondeu'},
  {'code': 'GA', 'name': 'Goa'},
  {'code': 'GJ', 'name': 'Gujarat'},
  {'code': 'HP','name': 'Himachal pradesh'},
  {'code': 'HR', 'name': 'Hariyana'},
  {'code': 'JH', 'name':'Jharkhand'},
  {'code': 'JK', 'name': 'Jammu and kashmir'},
  {'code': 'KA', 'name': 'Karnataka'},
  {'code': 'KL', 'name': 'Kerela'},
  {'code': 'LA', 'name': 'Ladakh'},
  {'code': 'LD', 'name': 'Lakshadeep'},
  {'code': 'MH', 'name': 'Maharastra'},
  {'code': 'ML', 'name': 'Meghalaya'},
  {'code': 'MP', 'name': 'Madhya pradesh'},
  {'code': 'MZ', 'name': 'Mizoram'},
  {'code': 'NL', 'name': 'Nagaland'},
  {'code': 'OR', 'name': 'Odisha'},
  {'code': 'PB', 'name': 'Punjab'},
  {'code': 'PY', 'name': 'Pundicherry'},
  {'code': 'RJ', 'name': 'Rajasthan'},
  {'code': 'SK', 'name': 'Sikkim'},
  {'code': 'TG', 'name': 'Telengana'},
  {'code': 'TN', 'name': 'Tamil Nadu'},
  {'code': 'TR', 'name': 'Tripura'},
  {'code': 'UP', 'name': 'Uttar Pradesh'},
  {'code': 'UT', 'name': 'Uttarakhand'},
  {'code': 'WB', 'name': 'West Bengal'}
]


export default function TabTwoScreen() {

  const [timeData , setTimeData]: any = useState(null);
  const [stateSelected, selectState] = useState('');
  const [listData, setListData]:any = useState(null);

useEffect(() => {
   fetch("https://data.covid19india.org/v4/min/timeseries.min.json")
   .then(response => response.json())
       // 4. Setting *dogImage* to the image url that we received from the response above
   .then(data=> {
     console.log(data)
     setTimeData(data);
   })
 },[])


 const handleChange= (data: any) =>{
  //  e.preventDefault();
   const selectedState = data
       console.log(selectedState)
       selectState(selectedState);
      
       const data1 = timeData[selectedState].dates;
       const data2: any = Object.keys(data1).map((element)=>{
         // console.log({'name': element, 'data' :data1[element].total.confirmed });

           return {'name': element, 'number' : data1[element].total.confirmed } ;
         })
    
      console.log(data2);
      
      setListData(data2);

     }


     function pickAState(){
      const data = state.filter((data)=> {  
         if(data.code == stateSelected){
           return  data.name
         }
       });

     console.log(data[0].name);
       return  data[0].name;

     }


 

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Tab Two</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabTwoScreen.tsx" /> */}
      <ScrollView> 
     <Picker  
  selectedValue={stateSelected}
  style={{ height: 50, width: 250 }}
  onValueChange={(itemValue: any, itemIndex) =>
    handleChange(itemValue)
  }>
    <Picker.Item label="Please select a state"/> 
 {
   state.map((data)=>(
     <Picker.Item label={data.name} value={data.code}/>
   ))
 }

  
</Picker>

{ stateSelected ? (
  <View>
<Text style={styles.title}> State data </Text>
<VictoryChart width={380} >
        { listData ?
<VictoryBar  data={listData.slice(Math.max(listData.length - 5, 0))} x="name" y="number"   labels={({ datum }) => `${datum.number}`}  />

 : null
        }
</VictoryChart>  </View>) : null
}

</ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding:10
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
 
});
