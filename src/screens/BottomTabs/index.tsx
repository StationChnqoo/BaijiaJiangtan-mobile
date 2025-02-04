import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {useCaches} from '@src/constants/store';
import React, {useCallback, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Home from '../Home';
import My from '../My';
import Wallet from '../Wallet';
import {useFocusEffect} from '@react-navigation/native';
import NewModal from './components/NewModal';
import Financing from '../Financing';
import {RootStacksProp} from '../Screens';

const Tab = createBottomTabNavigator();
interface MyProps {
  navigation?: RootStacksProp;
}

const BottomTabs = (props: MyProps) => {
  const {theme} = useCaches();
  const [isShowNewModal, setIsShowNewModal] = useState(false);
  const [newIntent, setNewIntent] = useState(-1);
  const {navigation} = props;

  const screens = [
    {
      name: 'Home',
      component: Home,
      icon: require('./assets/menu_home.png'),
      label: '首页',
    },
    {
      name: 'Wallet',
      component: Financing,
      icon: require('./assets/menu_pig.png'),
      label: '理财',
    },
    {
      isSpecial: true,
    },
    {
      name: 'NoteBook',
      component: Wallet,
      icon: require('./assets/menu_plan.png'),
      label: '事件',
    },
    {
      name: 'Me',
      component: My,
      icon: require('./assets/menu_me.png'),
      label: '我的',
    },
  ];

  useFocusEffect(
    useCallback(() => {
      // setIsShowNewModal(true);
      return () => {
        setIsShowNewModal(false);
        setNewIntent(-1);
      };
    }, []),
  );

  const onNewPress = () => {
    if (newIntent >= 0) {
      const routes = ['EditJira', 'EditPassword', 'EditWallet'] as const;
      navigation.navigate(routes[newIntent]);
      setIsShowNewModal(false);
      setNewIntent(-1);
    }
  };
  return (
    <View style={{flex: 1}}>
      <Tab.Navigator>
        {screens.map((it, i) =>
          it.isSpecial ? (
            <Tab.Screen
              name={'New'}
              key={i}
              component={View}
              options={{
                tabBarButton: props => (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      setIsShowNewModal(true);
                    }}>
                    <View
                      style={{...styles.specialButton, backgroundColor: theme}}>
                      <Image
                        source={require('./assets/menu_new.png')}
                        style={{
                          tintColor: '#fff',
                          height: 20,
                          width: 20,
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                ),
              }}
            />
          ) : (
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
          ),
        )}
      </Tab.Navigator>
      <NewModal
        show={isShowNewModal}
        onClose={() => {
          setIsShowNewModal(false);
        }}
        onConfirm={t => {
          setNewIntent(t);
          setIsShowNewModal(false);
        }}
        onHide={onNewPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  specialButton: {
    top: -12,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4, // Android 阴影
    shadowColor: '#000', // iOS 阴影
    shadowOffset: {width: 0, height: 0.1},
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
});
export default BottomTabs;
