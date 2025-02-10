import React, {useState} from 'react';
import {Image, StyleSheet, TextInput, View} from 'react-native';

import {Button, Flex} from '@src/components';
import ToolBar from '@src/components/ToolBar';
import {useCaches} from '@src/constants/store';
import x from '@src/constants/x';
import {NextService} from '@src/service';
import {RootStacksProp} from '../Screens';

interface MyProps {
  navigation?: RootStacksProp;
}

const Login: React.FC<MyProps> = props => {
  const {navigation} = props;
  const {theme, setUser, setToken} = useCaches();
  const [hidePassword, setHidePassword] = useState(true);
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');

  const submit = async () => {
    if (mobile && password) {
      let result = await new NextService().selectLogin(mobile, password);
      if (result?.data) {
        setToken(result.data);
        console.log('Token: ', result.data);
        navigation.goBack();
      } else {
      }
    } else {
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ToolBar
        title={'登录'}
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <View style={{height: 1, backgroundColor: '#eee'}} />
      <View style={{padding: 16}}>
        <Flex justify="space-between" horizontal style={styles.view}>
          <Image
            source={require('@src/assets/images/login/code.png')}
            style={{tintColor: theme, ...styles.icon}}
          />
          <View style={{width: 1, height: 24, backgroundColor: '#ccc'}} />
          <Flex
            horizontal
            style={{paddingHorizontal: 12, flex: 1}}
            justify={'space-between'}>
            <TextInput
              style={styles.input}
              placeholder={'手机号'}
              numberOfLines={1}
              onChangeText={setMobile}
              value={mobile}
              underlineColorAndroid={'transparent'}
            />
          </Flex>
        </Flex>
        <View
          style={{height: 1, marginVertical: 16, backgroundColor: '#ccc'}}
        />
        <Flex justify="space-between" horizontal style={styles.view}>
          <Image
            source={require('@src/assets/images/login/password.png')}
            style={{tintColor: theme, ...styles.icon}}
          />
          <View style={{width: 1, height: 24, backgroundColor: '#ccc'}} />
          <Flex
            horizontal
            style={{paddingHorizontal: 12, flex: 1}}
            justify={'space-between'}>
            <TextInput
              style={styles.input}
              placeholder={'密码'}
              numberOfLines={1}
              // textContentType={'password'}
              value={password}
              onChangeText={setPassword}
              underlineColorAndroid={'transparent'}
            />
          </Flex>
        </Flex>
        <View
          style={{height: 1, marginVertical: 16, backgroundColor: '#ccc'}}
        />
        <Flex horizontal justify="flex-end">
          <Button
            style={{
              height: 44,
              backgroundColor: theme,
              borderRadius: 12,
              paddingHorizontal: 24,
            }}
            textStyle={{fontSize: 16, color: '#fff'}}
            title={'登录'}
            onPress={submit}
          />
        </Flex>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {},
  icon: {
    height: x.scale(20),
    width: x.scale(20),
    marginHorizontal: 12,
  },
  action: {
    height: 18,
    width: 18,
    tintColor: '#666',
  },
  input: {
    fontSize: 16,
    paddingVertical: 0,
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    height: 32,
    textAlign: 'right',
  },
});

export default Login;
