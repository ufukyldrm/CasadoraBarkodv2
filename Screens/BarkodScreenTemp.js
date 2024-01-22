import React, {AppRegistry, Component} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import BarcodeScanner from 'react-native-barcode-scanners';
import {SocialIcon, Icon, Input, Text, Button} from 'react-native-elements';

import AuthStore from '../Stores/AuthStore';
import {Observer, observer} from 'mobx-react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BarkodScreenSecond from './BarkodScreenSecond';
import BarkodScreenFirst from './BarkodScreenFirst';
export default class BarkodScrreenTemp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statebarkodreader: 'xray',
      statereader: false,
    };
  }


 // kamera secimine 2 simge koy oradan çağır yaa

  /*

  <Input
                     placeholder="1666666666666"
                     keyboardType="numeric"
                     textAlign="center"
                     onChangeText={value => this.setState({adet: value})}
            />

                 <Button
            icon={
              <Icon
                name="wrench"
                type="font-awesome"
                color="white"
                size={25}
                iconStyle={{marginRight: 10}}
              />
            }
            title="Barkodları Gönder"
            onPress={this.toggleOverlay}
          />

  */


          toggleOverlayXray = () => {
            this.setState({
                statebarkodreader: 'xray',

              });
          };
          toggleOverlayCamera = () => {
            this.setState({
                statebarkodreader: 'camera',

              });
          };

  render() {
    return (

<View >
      
   

         {
          this.state.statebarkodreader=="xray"?  
           (


            <BarkodScreenFirst></BarkodScreenFirst>
           )
            :
            <BarkodScreenSecond></BarkodScreenSecond>

         }
       
  


      

</View>
     

   
    );
  }
}

const styles = StyleSheet.create({
  buttonTouchable: {
    padding: 26,
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
    textAlign: 'center',
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
});
