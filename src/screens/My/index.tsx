import React, {useCallback, useEffect, useState} from 'react';
import {Alert, ScrollView, StyleSheet, View} from 'react-native';

import {useCaches} from '@src/constants/store';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RootStacksProp} from '../Screens';
import Global from './components/Global';
import Profile from './components/Profile';
import Setting from './components/Setting';
import Stocks from './components/Stocks';
import {NextService} from '@src/service';
import {useFocusEffect} from '@react-navigation/native';

interface MyProps {
  navigation?: RootStacksProp;
}

const My: React.FC<MyProps> = props => {
  const {navigation} = props;
  const {setUser, token, setToken, quit} = useCaches();
  const [focused, setFocused] = useState(true);

  const loadUser = async () => {
    let result = await new NextService().selectUser();
    if (result?.data) {
      setUser(result.data);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setFocused(true);
      return function () {
        setFocused(false);
      };
    }, []),
  );

  useEffect(() => {
    if (focused) {
      loadUser();
    }
    return function () {};
  }, [focused]);

  const onLoginPress = (logined: boolean) => {
    if (logined) {
      Alert.alert('提示', '确认要退出登录吗？', [
        {text: '取消'},
        {
          text: '确认',
          onPress: () => {
            quit();
            setTimeout(() => {
              navigation.navigate('Login');
            }, 1000);
          },
        },
      ]);
    } else {
      navigation.navigate('Login');
    }
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{height: useSafeAreaInsets().top, backgroundColor: '#fff'}}
      />
      <ScrollView>
        <View style={{flex: 1}}>
          <View style={{height: 6}} />
          {[
            <Profile onLoginPress={onLoginPress} />,
            <Stocks
              onNewStockPress={() => {
                navigation.navigate('ChooseStock');
              }}
            />,
            <Global
              onPress={() => {
                navigation.navigate('ChooseGlobal');
              }}
            />,
            // <Color />,
            <Setting />,
          ].map((it, i) => (
            <View key={i} style={{marginVertical: 6}}>
              {it}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default My;
