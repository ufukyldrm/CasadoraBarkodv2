import React, {Component} from 'react';
import {View, Text, LogBox} from 'react-native';
import BarkodScreenSecond from './Screens/BarkodScreenSecond';
import BarkodScreenFirst from './Screens/BarkodScreenFirst';
import BarkodScreenTemp from './Screens/BarkodScreenTemp';
import HomesPage from './Screens/HomeScreen';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {observer} from 'mobx-react';
const Stack = createStackNavigator();
console.disableYellowBox = true;
function HomeScreen({navigation}) {
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      //    alert("anasayfa")
      // The screen is focused
      // Call any action
    });
  }, [navigation]);

  return <HomesPage></HomesPage>;
}
function XrayBarkod() {
  return <BarkodScreenFirst></BarkodScreenFirst>;
}
function CameraBarkod() {
  return <BarkodScreenSecond></BarkodScreenSecond>;
}
function TempBarkod() {
  return <BarkodScreenTemp></BarkodScreenTemp>;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="anasayfa"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="temp" component={TempBarkod} />
          <Stack.Screen name="barkod2" component={CameraBarkod} />
          <Stack.Screen name="barkod" component={XrayBarkod} />
          <Stack.Screen name="anasayfa" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default observer(App);
