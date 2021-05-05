
import React, { Component } from 'react';
import { SafeAreaView, Text, View } from 'react-native';

import axios from 'axios';
import MapView from 'react-native-map-clustering';
import { Marker } from 'react-native-maps';


export default class App extends Component {

  constructor() {
    super();
    this.state = {
      events: [],
      loading: true
    }
  }

  componentDidMount() {
    axios.get('https://eonet.sci.gsfc.nasa.gov/api/v2.1/events')
      .then((res) => {
        this.setState({
          events: res.data.events,
          loading: false
        })
        console.log(res)
      })
      .catch((error) => console.log(error));

    // fetch("http://localhost:12689/api/barbers/getall")
    //   .then(response =>  console.log(response))
    //   .then(data => {
    //     // this.setState({
    //       // events: data.events,
    //       // loading: false 
    //     // })
    //     // console.log(data);
    //   })
    //   .catch((error) => console.log(error));

    // console.log('başladı')
    // axios.get('http://192.168.1.105:8090/api/barbers/getall')
    // .then((res) => { 
    //   console.log(res)
    // })
    // .catch((error) => console.log(error));
  }

  render() {
    const { loading, events } = this.state;
    return <SafeAreaView style={{ flex: 1 }}>
      {loading
        ?
        <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}><Text>Yükleniyor...</Text></View>
        :
        <MapView initialRegion={{
          latitude: 52.9,
          longitude: 19.2,
          latitudeDelta: 8.5,
          longitudeDelta: 8.5
        }}
          style={{
            height: '100%'
          }}
        >

          {
            events.map(item => {
              if (typeof (item.geometries[0].coordinates[0]) !== 'object') {

                return <Marker
                  key={item.id}
                  title={item.title}
                  description={item.link.substring(0,25)}
                  coordinate={{
                    latitude: item.geometries[0].coordinates[1],
                    longitude: item.geometries[0].coordinates[0]
                  }}
                >
                  <View style={{
                    width: 36,
                    height: 36,
                    backgroundColor: 'blue',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 50
                  }}>
                    <Text>🔥</Text>
                  </View>
                </Marker>
              }
            })
          }

        </MapView>
      }
    </SafeAreaView>
  }

}
