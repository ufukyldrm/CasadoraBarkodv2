import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
  Image,
  Alert,
  Linking,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  SocialIcon,
  Icon,
  Text,
  Button,
  Header as HeaderRNE,
  HeaderProps,
  Overlay,
  Input,
} from 'react-native-elements';
import {Observer, observer} from 'mobx-react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {
  Table,
  Row,
  Rows,
  TableWrapper,
  Cell,
} from 'react-native-table-component';
import AuthStore from '../Stores/AuthStore';
import SelectDropdown from 'react-native-select-dropdown';
import TcpSocket from 'react-native-tcp-socket';

const hareketler = ['Depo', 'Müşteri', 'Fuar'];

const PlaygroundNavigate = () => {
  let navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{marginLeft: 10, flexDirection: 'row'}}
      onPress={() => navigation.navigate('barkod')}>
      <Icon type="font-awesome-5" name="qrcode" color="green" />
      <Text style={{color: 'green'}} h5>
        Barkod
      </Text>
    </TouchableOpacity>
  );
};

@observer
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Id', 'Kucuker Kod', 'Model', 'Sil'],
      tableData: AuthStore.barcoded,
      overlaystatus: false,
      overlaysiparisstatus: false,
      hareketcesidi: '',
      siparisno: '',
      adet: 0,
    };
  }

  sendwifikurallardata = barkodhareketlist => {
    let buffertext = '';
    //this.setState({bufferimage: ''});

    let options = {port: 8888, host: '192.168.40.4', timeout: 1000};

    const client = TcpSocket.createConnection(options, () => {
      // Write on the socket

      client.write(
        'cassainsertbarkodhareket' + JSON.stringify(barkodhareketlist),
      );
      //  alert(JSON.stringify(barkodhareketlist));
      setTimeout(function () {
        client.destroy();
      }, 1000);

      // Close socket
    });

    client.on('data', data => {
      if (data != 'veri geldi') {
        //  MainStore.ClearKurallar();

        console.log('message was received2 ' + data.length);

        buffertext = buffertext + data;
      }
    });

    client.on('error', function (error) {
      console.log(error);
    });

    client.on('close', function () {
      console.log('message was received2 ' + buffertext);

      if (buffertext.includes('yapilaniskaydedildi')) {
        AuthStore.ClearBarkodList();

        // alert('Barkod Hareket İşlemi Tamamlandı!');

        if (buffertext.includes('-')) {
          alert(buffertext.replace('yapilaniskaydedildi', ''));
        } else if (buffertext.includes('zet')) {
          alert(
            'Bu sipariş numarası sistemde kayıtlı değil. Lütfen ana programın sipariş bölümüne girip listeyi güncelleyiniz!',
          );
        } else if (buffertext.includes('tez')) {
          alert('Barkod hareketi tamamlanmıştır. Siparişler doğrudur.');
        } else {
          if (barkodhareketlist[0].hareketadi == 'Müşteri') {
            alert(
              'Bu siparişteki ürünler seçilen ürünlerle aynı değil, lütfen barkodlardaki ürün ile siparişteki ürünleri kontrol ediniz!!.',
            );
          } else alert('Barkod hareketleri tanımlanmıştır.');
        }
      } else {
        alert(
          'Barkod Hareketleri Kaydedilemedi!! Bir Bağlantı Problemi Var, tekrar deneyiniz2!',
        );
      }

      // const obj = JSON.parse(buffertext);

      //  alert(JSON.stringify(obj.yapilanis));

      //  alert(obj.yapilanis[0].firmadi);
      //  this.setState({model: obj.yapilanis[0].firmadi});
      console.log('Connection closed!');
    });
  };

  _alertIndex(index) {
    //Alert.alert(`This is row ${index + 1}`);
    AuthStore.DeleteItemFromBarkodList(index + 1);
  }

  ///barkodları gönderme butonu
  toggleOverlay = () => {
    if (this.state.hareketcesidi != '') {
      var list = [];

      AuthStore.barcoded.map((t, index) =>
        list.push({
          barkodid: t[0],
          kucukerkod: t[1],
          model: t[2],
          hareketadi: this.state.hareketcesidi,
          siparisno: '',
          adet: this.state.adet,
        }),
      );
      this.sendwifikurallardata(list, this);

      //AuthStore.SetHareket(list);  internet iptal

      this.setState({
        siparisno: '',
        hareketcesidi: '',
        overlaystatus: !this.state.overlaystatus,
      });
    } else alert('Bir Hareket Seçmeden Barkodları Aktaramazsınız!');
  };
  toggleSiparisOverlay = () => {
    if (this.state.hareketcesidi != '') {
      var list = [];

      AuthStore.barcoded.map((t, index) =>
        list.push({
          barkodid: t[0],
          kucukerkod: t[1],
          model: t[2],
          hareketadi: this.state.hareketcesidi,
          siparisno: this.state.siparisno,
          adet: 1,
        }),
      );

      this.sendwifikurallardata(list, this);
      //AuthStore.SetHareket(list);  internet iptal

      this.setState({
        siparisno: '',
        hareketcesidi: '',
        overlaystatus: !this.state.overlaystatus,
        overlaysiparisstatus: !this.state.overlaysiparisstatus,
      });
    } else alert('Bir Hareket Seçmeden Barkodları Aktaramazsınız!');
  };

  toggleOverlayBackdrop = () => {
    this.setState({
      overlaystatus: !this.state.overlaystatus,
      siparisno: '',
      hareketcesidi: '',
    });
  };
  toggleSiparisOverlayBackdrop = () => {
    this.setState({
      overlaysiparisstatus: !this.state.overlaysiparisstatus,
      siparisno: '',
      hareketcesidi: '',
    });
  };

  render() {
    const element = (data, index) => (
      <TouchableOpacity onPress={() => this._alertIndex(index)}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>Sil</Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <SafeAreaProvider>
        <Overlay
          isVisible={this.state.overlaystatus}
          onBackdropPress={this.toggleOverlayBackdrop}>
          <Text style={styles.textSecondary}>Hareket Seç</Text>

          <View>
            <SelectDropdown
              defaultButtonText="Hareket Türü Seçiniz"
              data={hareketler}
              onSelect={(selectedItem, index) => {
                this.setState({hareketcesidi: selectedItem});
                if (selectedItem == 'Müşteri') {
                  this.setState({overlaysiparisstatus: true});
                } else this.setState({overlaysiparisstatus: false});
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem;
              }}
            />
            {this.state.hareketcesidi != '' ? (
              <View>
                <Text style={styles.textSecondary}>Barkod Sayısı</Text>
                <View>
                  <Input
                    placeholder="1"
                    keyboardType="numeric"
                    textAlign="center"
                    onChangeText={value => this.setState({adet: value})}
                  />
                </View>
              </View>
            ) : (
              <Text></Text>
            )}

            <Text>.</Text>
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
          </View>
        </Overlay>
        <Overlay
          isVisible={this.state.overlaysiparisstatus}
          onBackdropPress={this.toggleSiparisOverlayBackdrop}>
          <Text style={styles.textSecondary}>
            Müşterinin Sipariş Numarasını Yazınız.
          </Text>
          <View>
            <Input
              placeholder="Sipariş No"
              onChangeText={value => this.setState({siparisno: value})}
            />
          </View>
          <View>
            <Text>.</Text>
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
              title="Barkodları Gönder ve Siparisleri Kontrol Et"
              onPress={this.toggleSiparisOverlay}
            />
          </View>
        </Overlay>

        <HeaderRNE
          backgroundColor={'white'}
          borderColor={'black'}
          containerStyle={{
            borderBottomColor: '#85106a',
            borderBottomWidth: 1,
          }}
          leftComponent={{
            icon: 'menu',
            color: '#fff',
          }}
          rightComponent={
            <View style={styles.headerRight}>
              <PlaygroundNavigate></PlaygroundNavigate>
            </View>
          }
          centerComponent={{
            text: 'Casadora Baby',
            style: styles.heading,
          }}
        />
        <ScrollView style={styles.container}>
          <Table borderStyle={{borderColor: 'transparent'}}>
            <Row
              data={this.state.tableHead}
              style={styles.head}
              textStyle={styles.text}
            />
            {AuthStore.barcoded.map((rowData, index) => (
              <TableWrapper key={index} style={styles.row}>
                {rowData.map((cellData, cellIndex) => (
                  <Cell
                    key={cellIndex}
                    data={cellIndex === 3 ? element(cellData, index) : cellData}
                    textStyle={styles.text}
                  />
                ))}
              </TableWrapper>
            ))}
          </Table>
          {AuthStore.barcoded.length != 0 ? (
            <Button
              icon={<Icon name="arrow-right" size={40} color="white" />}
              iconRight
              title="Ürünleri Aktar"
              loading={false}
              loadingProps={{size: 'small', color: 'white'}}
              buttonStyle={{
                backgroundColor: 'green',
                borderRadius: 5,
              }}
              titleStyle={{fontWeight: 'bold', fontSize: 15}}
              containerStyle={{
                flex: 1,
              }}
              onPress={() => {
                this.setState({
                  overlaystatus: !this.state.overlaystatus,
                });
              }}
            />
          ) : (
            <View></View>
          )}
        </ScrollView>
      </SafeAreaProvider>
    );
  }
}

export default observer(HomeScreen);
const styles = StyleSheet.create({
  loadinghat: {
    borderColor: 'red',

    justifyContent: 'flex-end',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#397af8',
    marginBottom: 20,
    width: '100%',
  },
  heading: {
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
  },

  subheaderText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerRight: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
    color: 'black',
  },

  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  head: {height: 40, backgroundColor: 'azure'},
  text: {margin: 6, textAlign: 'center', alignItems: 'center'},
  row: {flexDirection: 'row', backgroundColor: 'white'},
  btn: {width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2},
  btnText: {textAlign: 'center', color: '#fff'},
});
