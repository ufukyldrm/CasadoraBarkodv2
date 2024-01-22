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
export default class BarkodScreenFirst extends Component {
  constructor(props) {
    super(props);
    this.state = {
      incbarkod: '',
      statereader: false,
      barkodread:''
    };
  }




  onBarCodeRead(res) {


 if(res=='')
 alert('Boş barkodu listeye ekleyemezsiniz!')
else
{
    this.setState({barkodread : ''})


   

      const myArray = res.split(' ');

      this.setState({
        incbarkod: res,
      });
  
      var varmi = false;

      AuthStore.barcoded.forEach(element => {
        if (element[0] == myArray[0]) varmi = true;
      });

      if (!varmi) {
        AuthStore.UpdatedBarkodList([myArray[0], myArray[1], myArray[2], '']);

        this.setState({
          incbarkod: res,
          statereader: true,
        });
      } else {
        alert(
          myArray[0] +
            ' Numaralı Barkod Daha Önceden Seçildi. Listeye Eklenmedi!',
        );
        this.setState({
          statereader: true,
        });
      }
      // Linking.openURL(e.data).catch((err) =>
      // console.error("An error occured", err)
      //   );
   
 }
  }

  render() {
    return (

      <View  style={{flex: 1,justifyContent:'center'}}>

      {
       !this.state.statereader?
       (
        <View>
      <Text  style={{textAlign:'center',    fontSize: 21}}>Barkodu Kızıl Ötesi Sensör İle Okutunuz</Text>
        <Input

                /*
                ref={element => {  
                  //Clear text after Input
                        this.attendee = element
                      }}
          */        autoFocus = {this.state.incbarkod==''?true:false}
                    placeholder="Okunan Barkod Burada Gözükür"
                    showSoftInputOnFocus={false}
                    textAlign="center"
                    onChangeText={value =>( this.setState({barkodread: value} ))}
                    value={this.state.barkodread}

                  // onChangeText={e=>alert(e)}
        />
            </View>
        
        ) :<Text>''</Text>
       }
         {!this.state.statereader ? (
    <View>
          <View> 
          <TouchableOpacity
              style={styles.buttonTouchable}
              onPress={() => {
                
                this.onBarCodeRead(this.state.barkodread)
                this.setState({barkodread : ''})

                /*
                this.searchInput = React.createRef();
                this.attendee.setNativeProps({ text: '' })
                */

              }}>
              <Text style={styles.buttonText}>Barkodu Listeye Ekle</Text>
            </TouchableOpacity>
            </View>
              <View> 
              <TouchableOpacity
                  style={styles.buttonTouchable}
                  onPress={() => {
    
   
                    this.setState({barkodread : ''})
    
                    /*
                    this.searchInput = React.createRef();
                    this.attendee.setNativeProps({ text: '' })
                    */
    
                  }}>
                  <Text style={styles.buttonTextVazgeç}>Okutulan Barkodu Sil</Text>
                </TouchableOpacity>
                </View>
       </View>
         ):<Text>''</Text>   }

        {this.state.statereader ? (
          <View style={{flex: 1}}>
            <Text style={styles.centerText}>
              Barkod Çıktısı{' '}
              <Text style={styles.textBold}>{this.state.incbarkod}</Text>
            </Text>
            <TouchableOpacity
              style={styles.buttonTouchable}
              onPress={() => {
                this.setState({
                  statereader: false,
                  incbarkod: '',
                  barkodread:''
                });
              }}>
              <Text style={styles.buttonText}>Diğer Barkoda Geç!</Text>
            </TouchableOpacity>
          </View>
        ) : (
<Text>''</Text>
        )}
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
  buttonTextVazgeç: {
    fontSize: 21,
    color: 'red',
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
