import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {useCaches} from '@src/constants/store';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Financing from '../Financing';
import Home from '../Home';
import My from '../My';
import {RootStacksProp} from '../Screens';
import Wallet from '../Wallet';

const Tab = createBottomTabNavigator();
interface MyProps {
  navigation?: RootStacksProp;
}

const BottomTabs = (props: MyProps) => {
  const {theme} = useCaches();
  const {navigation} = props;

  const screens = [
    {
      name: 'home',
      component: Home,
      icon: require('./assets/menu_home.png'),
      label: '首页',
    },
    {
      name: 'archive',
      component: Financing,
      icon: require('./assets/menu_cctv.png'),
      label: '归档',
    },
    {
      name: 'datas',
      component: Wallet,
      icon: require('./assets/menu_datas.png'),
      label: '数据',
    },
    {
      name: 'me',
      component: My,
      icon: require('./assets/menu_me.png'),
      label: '我的',
    },
  ];

  return (
    <View style={{flex: 1}}>
      <Tab.Navigator>
        {screens.map((it, i) => (
          <Tab.Screen
            name={it.name}
            key={i}
            component={it.component}
            options={{
              headerShown: false,
              tabBarLabel: it.label,
              tabBarActiveTintColor: theme,
              tabBarIcon: ({color}) => (
                <Image
                  source={it.icon}
                  style={{height: 24, width: 24, tintColor: color}}
                />
              ),
            }}
          />
        ))}
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({});
export default BottomTabs;
