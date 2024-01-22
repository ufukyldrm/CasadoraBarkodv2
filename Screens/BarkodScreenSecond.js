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
export default class BarkodScreenSecond extends Component {
  constructor(props) {
    super(props);
    this.state = {
      incbarkod: '',
      statereader: false,
    };
  }

  onBarCodeRead(res) {


   
    if (
      1440 / 2 + 200 >
        (Number(res.bounds.origin[1].y) + Number(res.bounds.origin[2].y)) / 2 &&
      1440 / 2 - 200 <
        (Number(res.bounds.origin[1].y) + Number(res.bounds.origin[2].y)) / 2 &&
      1920 / 2 + 200 >
        (Number(res.bounds.origin[0].x) + Number(res.bounds.origin[1].x)) / 2 &&
      1920 / 2 - 200 <
        (Number(res.bounds.origin[0].x) + Number(res.bounds.origin[1].x)) / 2 &&
      !this.state.statereader
    ) {
      const myArray = res.data.split(' ');

      this.setState({
        incbarkod: res.data,
      });
      /*
    AuthStore.UpdatedBarkodList({
      barkodid: myArray[0],
      kucukerkod: myArray[1],
      model: myArray[2],
      hareketkodu: "",
    });
*/
      var varmi = false;

      AuthStore.barcoded.forEach(element => {
        if (element[0] == myArray[0]) varmi = true;
      });

      if (!varmi) {
        AuthStore.UpdatedBarkodList([myArray[0], myArray[1], myArray[2], '']);

        this.setState({
          incbarkod: res.data,
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

      <View style={{flex: 1}}>
        <BarcodeScanner
          Title={''}
          hintPictureGalleryText={''}
          hintScanText={'Barkodu biraz uzaktan kare içine alınız.'}
          onBarCodeRead={data => this.onBarCodeRead(data)}
          isEnableDiscernPicture={true}
          isEnableScanBorder={false}
          scanBoxSize={200}
        />
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
