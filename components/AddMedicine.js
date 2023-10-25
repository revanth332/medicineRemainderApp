import React , {useState} from 'react';
import {
  StyleSheet,
  Text,TouchableOpacity,Button,View,Image, TextInput, ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EmailInput from './EmailInput';
import axios from 'axios'

const checkIcon = {
  name: 'check',
  color: 'white',
  size:20,
};

const Box = ({ color,text,checked,color2 }) => {
  return (
    <View style={{
      width: 120,
      height: 50,
      backgroundColor: checked ? color2 : color,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10
    }} >
      {!checked ? <Text style={{fontWeight:'bold',fontSize:15,padding:10}}>{text}</Text> :
      <Icon {...checkIcon}/>}
      </View>
  );
};

const AddMedicine = () => {
  const [doses,setDoses] = useState(0)
  const [timings, setTimings] = useState([]);
  const [medName,setMedName] = useState('')
  const [mail,setMail] = useState('');
  const times = ["morning with meals","noon with meals","evening with meals","morning before meals","noon before meals","evening before meals"]

  const handleIncrement = () => {
    setDoses(doses + 1);
  };
  const handleDecrement = () => {
    setDoses(doses - 1);
  };

const handleTiming = (indx) => {
  if(timings.includes(times[indx])){
    setTimings(timings.filter(item => item !== times[indx]));
  }
  else{
    setTimings([...timings,times[indx]]);
  }
}

const handleSubmit = () => {
const medData = {name:medName,doses:doses,caretakermail:mail,timings:timings};
  axios.post('http://localhost:5000/addmedicine',medData).then(item => {
    setMedName('');
    setDoses(0);
    setMail('');
    setTimings([]);
  }).catch(err => console.log(err))
  // console.log(medData)
}

  const link = "https://media.gettyimages.com/id/183367047/photo/mixed-medicine-many-pills-and-capsules.jpg?s=612x612&w=0&k=20&c=CLMM0Zrb2s3lTzlJa4gQ5FtJ0DoiPyZ0I-vcehCVI2w=";
  return (
      <ScrollView style={styles.container}>
        <View style={styles.view}>
          <Text style={styles.heading}>Schedule of dose</Text>
          <Image style={styles.medPicture} source={{ uri: link}} />
        </View>
        <View style={styles.view}>
          <EmailInput type="name" handleInput={setMedName} />
        </View>
        <View style={styles.view}>
          <Text style={styles.heading}>When you want to take it</Text>
          <View style={styles.boxContainer}>
            <TouchableOpacity onPress={() => handleTiming(0)}><Box color="#abffac" color2="#238636" text="morning with meals" checked={timings.includes(times[0]) ? true : false}/></TouchableOpacity>
            <TouchableOpacity onPress={() => handleTiming(1)}><Box color="#a1e9ff" color2="#165AAA" text="noon with meals" checked={timings.includes(times[1]) ? true : false}/></TouchableOpacity>
            <TouchableOpacity onPress={() => handleTiming(2)}><Box color="#da5e5e" color2="#EC5033" text="evening with meals" checked={timings.includes(times[2]) ? true : false}/></TouchableOpacity>
          </View>
          <View style={styles.boxContainer}>
          <TouchableOpacity onPress={() => handleTiming(3)}><Box color="#abffac" color2="#238636" text="morning before meals" checked={timings.includes(times[3]) ? true : false}/></TouchableOpacity>
            <TouchableOpacity onPress={() => handleTiming(4)}><Box color="#a1e9ff" color2="#165AAA" text="noon before meals" checked={timings.includes(times[4]) ? true : false}/></TouchableOpacity>
            <TouchableOpacity onPress={() => handleTiming(5)}><Box color="#da5e5e" color2="#EC5033" text="evening before meals" checked={timings.includes(times[5]) ? true : false}/></TouchableOpacity>
          </View>
          </View>
          <View style={styles.view}>
          <Text style={styles.heading}>Daily Doses ? </Text>
          <View style={styles.view2}>
          <TouchableOpacity onPress={handleDecrement}>
            <Text style={styles.operator}>-</Text>
          </TouchableOpacity>
            <Text style={{flex:1,justifyContent: 'center',alignItems: 'center',fontSize:30,backgroundColor:'white',textAlign:'center'}}>{doses}</Text>
            <TouchableOpacity onPress={handleIncrement}>
            <Text style={styles.operator}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.view}>
          <EmailInput type="mail" handleInput={setMail} />
        </View>
        <View style={styles.view}>
        <Button
        onPress={handleSubmit}
        title='Submit'
        color='#e68401'
         style={styles.submitButton} />
        </View>
        
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  boxContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom:10
  },
  view: {
    padding: 10,
  },
  view2:{
    flexDirection:'row'
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom:20
  },
  medPicture: {
    width:"100%",
    height: 200,
    borderRadius:10,
    
  },
  operator:{
    backgroundColor:'#e68401',
    height:50,
    width:50,
    flexDirection:'row',

    fontWeight:'bold',
    color:'white',
    fontSize:30,
    textAlign:'center'
  },
  submitButton: {
    borderWidth: 1,
    borderColor: '#0000FF',
    color: '#0000FF',
  },
});
export default AddMedicine;