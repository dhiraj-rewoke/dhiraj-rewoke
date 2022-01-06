import { StyleSheet,} from 'react-native';
import {useEffect, useState} from 'react';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
//import PieChart from 'react-native-pie-chart';
import { VictoryPie, VictoryChart, VictoryTheme } from "victory-native";

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
   

  const [fetchedData, setFetchedData] = useState(null);
  const [pieData,setPieData] = useState([]);
  const widthAndHeight = 250
  const series = [123, 321, 123, 789, 537];
  const sliceColor = ['#F44336','#2196F3','#FFEB3B', '#4CAF50', '#FF9800'];


  const data = {
    "chart": {
      "caption": "Recommended Portfolio Split",
      "subCaption": "For a net-worth of $1M",
      "showValues": "1",
      "showPercentInTooltip": "0",
      "numberPrefix": "$",
      "enableMultiSlicing": "1",
      "theme": "fusion"
    },
    "data": pieData
  }

  const  libraryPath = Platform.select({
    android: { uri: 'file:///android_asset/fusioncharts.html' },
    ios: require('./assets/fusioncharts.html')
  })
  useEffect(() => {
    fetchData();
},[])


const fetchData = ()=>{
 fetch("https://data.covid19india.org/v4/min/data.min.json")
 .then(response => response.json())
     // 4. Setting *dogImage* to the image url that we received from the response above
 .then(data=> {

     console.log(data)
    const data2: any=  Object.keys(data).map(element => {

        //  console.log( element +" ,"+data[element].total.confirmed);
          return {name: element, value: data[element].total.confirmed }
         //     addData(newData);
         //    console.log(data7)
     });  
    
      setPieData(data2);
 })
}

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" /> */}
        
        {/* <Text style={styles.title}>Tab One</Text> */}
        <View >
      
              <VictoryPie   theme={VictoryTheme.material} data={pieData} x="name" y="value"  />
            
        </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
