import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {useFocusEffect} from '@react-navigation/native';
import {useCaches} from '@src/constants/store';
import {RootStacksProp} from '../Screens';
import BaijiaJiangtan from './components/BaijiaJiangtan';
import Demo from './components/Demo';
import Passwords from './components/Passwords';
import Tabs from './components/Tabs';
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
      {
        label: '百家讲坛',
        value: 'bjjt',
        component: (
          <BaijiaJiangtan
            onNewPress={() => {
              navigation.navigate('EditAlbum');
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
      <Tabs
        onTabPress={setTab}
        tabIndex={tab}
        tabs={tabs}
        avoidStatusBar
        shadow
      />
      <View style={{flex: 1}}>
        {tabs.map((it, i) => (
          <View key={i} style={{display: i == tab ? 'flex' : 'none', flex: 1}}>
            {tabs[i].component}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Home;
