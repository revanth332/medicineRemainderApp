import React, {useState,useEffect} from 'react';
import { View, StyleSheet, Text, Button, Image, FlatList, ScrollView,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios'


const HomeScreen = ({navigation}) => {
  const [medicines,setMedicines] = useState([])
  useEffect(() => {
    // Make a GET request to the API to fetch the medicine details
    axios.get('http://localhost:5000/medicines')
      .then(response => {
        console.log(response.data)
        setMedicines(response.data.meds);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const username = "Rahul";
  const profilePicture = "https://imgv3.fotor.com/images/blog-richtext-image/10-profile-picture-ideas-to-make-you-stand-out.jpg";
  // const medicines = [
  //   {
  //     name: 'Ibuprofen',
  //     dosage: 200,
  //     timeOfDay: 'Morning with meal',
  //     frequency: 1
  //   },
  //   {
  //     name: 'Loratadine',
  //     dosage: 10,
  //     timeOfDay: 'Morning without meal',
  //     frequency: 2
  //   }
  // ];
  const handleDelete = (id) => {
    
    axios.post('http://localhost:5000/deletemedicine',{"id":id}).then(res => {
      setMedicines(medicines.filter((med) => med._id !== id))
    console.log(res);
  }).catch(err => console.log(err))
  }

  const handleUpdate = (id) => {
    axios.post('http://localhost:5000/updatemedicine',{"id":id}).then(res => {
      setMedicines(medicines.map(med => med._id === id ? {...med,completed:true} : med))
    console.log(res);
  }).catch(err => console.log(err))
  }

  const delIcon = {
    name: 'delete-variant',
    color: 'red',
    size:25,
  };

  const checkIcon = {
    name: 'calendar-check',
    color: '#0066FF',
    size:25,
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.view1}>
        <Text style={styles.heading}>Take care of your health !</Text>
        <Image style={styles.profilePicture} source={{ uri: profilePicture }} />
      </View>
      <View style={styles.view2}>
        <View style={{backgroundColor:'white',padding:20,borderRadius:10}}>
        <Text style={styles.greeting}>Welcome {username}</Text>
        <Text style={styles.subheading}>You have some medicines today.</Text>
        <Text style={styles.subheading}>Track your medicines...</Text>
        </View>
      </View>
      <View style={styles.view3}>
        <Text style={styles.greeting}>Today's medicines</Text>
        <Button title="Add new" onPress={() => navigation.navigate('Schedule')} />
      </View>
      <View style={styles.view4}>
        {medicines.map((medicine, index) => !medicine.completed ? (
          <View key={index} style={{flexDirection: 'row',alignItems:'center',marginBottom:15,backgroundColor:'white',borderTopRightRadius:25,
          borderBottomRightRadius:25}}>
          <Image style={styles.medPicture} source={{ uri: "https://c4.wallpaperflare.com/wallpaper/93/145/241/green-pill-medication-capsule-wallpaper-preview.jpg" }} />
          <View style={styles.medicineItem}>
            <Text style={styles.medicineName}>{medicine.name}</Text>
            <Text style={styles.medicineFrequency}>Frequency : {medicine.doses}</Text>            
          </View>
          <TouchableOpacity onPress={() => handleUpdate(medicine._id)}><Icon style={{marginRight:10}} {...checkIcon} /></TouchableOpacity> 
          <TouchableOpacity onPress={() => handleDelete(medicine._id)}><Icon style={{marginRight:10}} {...delIcon} /></TouchableOpacity> 
          </View>
        ) : null)}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 50
  },
  view2: {
    padding: 10,
    
  },
  greeting: {
    fontSize: 17,
    fontWeight:'bold'
  },
  subheading: {
    fontSize: 14
  },
  view3: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10
  },
  view4: {
    padding: 10,
  },
  medicineItem: {
    flex:1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 5,
    marginLeft:20,
  },
  medicineName: {
    fontSize: 16,
    fontWeight:'bold'
  },
  medicineDosage: {
    fontSize: 14
  },
  medicineTimeOfDay: {
    fontSize: 14,
    fontWeight:'bold',
    color:'#818585'
  },
  medicineFrequency: {
    fontSize: 14,
    color:'#818585',
    fontWeight:'bold'
  },
  medPicture:{
    width: 100,
    height: 85,
    borderTopLeftRadius:25,
    borderBottomLeftRadius:25
  }
});

export default HomeScreen;
