import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import moment from 'moment';
import 'moment/locale/zh-cn';
import React, {useEffect} from 'react';
import {AppRegistry, NativeModules, Platform, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import 'react-native-reanimated';
import {name as appName} from './app.json';
import Screens from './src/screens/Screens';
import Config from 'react-native-config';

const queryClient = new QueryClient();

const BaijiaJiangtan = () => {

  useEffect(() => {
    moment.locale('zh-cn');
    if (Platform.OS == 'android') {
      console.log('react-native-config: ', Config);
      // toast.show({ description: JSON.stringify(Config) })
    }

    return function () {};
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView>
        <View style={{flex: 1}}>
          <Screens />
        </View>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
};

AppRegistry.registerComponent(appName, () => BaijiaJiangtan);
