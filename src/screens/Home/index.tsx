import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {useFocusEffect} from '@react-navigation/native';
import {Tabs} from '@src/components';
import {useCaches} from '@src/constants/store';
import {RootStacksProp} from '../Screens';
import Demo from './components/Demo';
import Passwords from './components/Passwords';
import Wallets from './components/Wallets';
import Works from './components/Works';

interface MyProps {
  navigation?: RootStacksProp;
}

const Home: React.FC<MyProps> = props => {
  const {navigation} = props;
  const {cared, global} = useCaches();
  const [focused, setFocused] = useState(false);
  const [views, setViews] = useState([]);
  const [tab, setTab] = useState(0);

  useFocusEffect(
    useCallback(() => {
      setFocused(true);
      // console.log(`SHA256: ${SHA256('666666')}`);
      return function () {
        setFocused(false);
      };
    }, []),
  );

  const tabs = useMemo(
    () => [
      {
        label: '工作',
        value: 'jira',
        component: (
          <Works
            key="works"
            onJiraPress={id => {
              navigation.navigate('EditJira', {id});
            }}
          />
        ),
      },
      {
        label: '密码',
        value: 'password',
        component: (
          <Passwords
            key="passwords"
            onItemPress={id => {
              navigation.navigate('EditPassword', {id});
            }}
          />
        ),
      },
      {
        label: '钱包',
        value: 'wallet',
        component: (
          <Wallets
            key="wallets"
            onItemPress={id => {
              navigation.navigate('EditWallet', {id});
            }}
          />
        ),
      },
      {label: '测试', value: 'demo', component: __DEV__ ? <Demo /> : <View />},
    ],
    [],
  );

  return (
    <View style={{flex: 1, backgroundColor: '#f0f0f0', position: 'relative'}}>
      
    </View>
  );
};

const styles = StyleSheet.create({});

export default Home;
