import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

function Main({navigation}){
  //const [devs,setDevs] = useState([]);
  const [currentRegion,setCurrentRegion] = useState(null);
  //const [techs, setTechs] = useState('');

  useEffect(()=>{
    async function loadInitialPosition(){
      const { granted } = await requestPermissionsAsync();

      if(granted){
        const {coords} = await getCurrentPositionAsync({
          enableHighAccuracy: true,
        });
      const {latitude, longitude} = coords;
        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        });
      }
    } 
    loadInitialPosition();
  },[]);

  if (!currentRegion) {
    return null;
  }

  return(  
    <>
      <MapView initialRegion={currentRegion} style={styles.map}>
        <Marker coordinate={{ latitude: -20.9707772, longitude: -48.4718702 }}>
          <Image style={styles.avatar} source={{ uri: 'https://avatars3.githubusercontent.com/u/20876017?s=460&v=4'}} />

          <Callout onPress={()=> {
            //navegação
            navigation.navigate('Profile', { github_username: 'jeffymesquita' });
          }}>
            <View style={styles.callout} >
              <Text style={styles.devName} >Jeferson Mesquita</Text>
              <Text style={styles.devBio} >Bla bla bla</Text>
              <Text style={styles.devTechs} >etc etc e tal</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>
      <KeyboardAvoidingView style={styles.searchForm}>
        <TextInput 
          style={styles.searchInput}
          placeholder="Buscar Devs por techs"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}        
        />
        <TouchableOpacity onPress={() => {}} style={styles.loadButton}>
          <MaterialIcons name="my-location" size={20} color="#FFF" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </>
  )
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },

  avatar:{
    width: 65,
    height: 65,
    borderRadius: 6,
    borderWidth: 6,
    borderColor: '#FFF',
  },

  callout: {
    width: 260,
  },

  devName: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  devBio: {
    color: '#666',
    marginTop: 5,
  },

  devTechs: {
    marginTop: 5,
  },

  searchForm: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    zIndex: 5,
    flexDirection: 'row',
  },

  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFF',
    color: '#333',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset:{
      width: 5,
      height: 5,
    },
    elevation: 2,
  },

  loadButton: {
    width: 50,
    height: 50, 
    backgroundColor: '#8e4dff',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,    
  },

})

export default Main;