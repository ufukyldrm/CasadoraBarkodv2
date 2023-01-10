import React, {Component} from 'react';
import {View, Text, LogBox} from 'react-native';
import LoginPage from './Screens/BarkodScreenSecond';
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
function LoginScreen() {
  return <LoginPage></LoginPage>;
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
          <Stack.Screen name="barkod" component={LoginScreen} />
          <Stack.Screen name="anasayfa" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default observer(App);
