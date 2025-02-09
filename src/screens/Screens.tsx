import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import * as React from 'react';
// 这个地方用Path alias，@/App会报错
import App from '../../App';
import BottomTabs from './BottomTabs';
import EditChapter from './EditChapter';
import EditJira from './EditJira';
import EditSeries from './EditSeries';
import Login from './Login';
import SelectSeries from './SelectSeries';
import Webviewer from './Webviewer';
import SelectTeacher from './SelectTeacher';
import EditTeacher from './EditTeacher';

export type RootStacksParams = {
  App: undefined;
  HelloWorld: {id: string};
  Welcome: undefined;
  BottomTabs: undefined;
  Webviewer: {title: string; url: string};
  Login: undefined;
  EditJira: {id?: string};
  SelectSeries: undefined;
  EditWallet: {id?: string};
  EditSeries: {id?: string};
  EditChapter: {id?: string};
  EditTeacher: {id?: string};
  SelectTeacher: undefined;
};

const RootStack = createNativeStackNavigator<RootStacksParams>();

export type RootStacksProp = NativeStackNavigationProp<RootStacksParams>;

export default function Stacks() {
  const navigator = useNavigationContainerRef();
  // useFlipper(navigator);
  return (
    <NavigationContainer ref={navigator}>
      <RootStack.Navigator
        screenOptions={{
          animation: 'slide_from_right',
          headerShown: false,
          animationDuration: 618,
        }}>
        <RootStack.Screen name="BottomTabs" component={BottomTabs} />
        <RootStack.Screen name="App" component={App} />
        <RootStack.Screen name="Webviewer" component={Webviewer} />
        <RootStack.Screen name="Login" component={Login} />
        <RootStack.Screen name="EditJira" component={EditJira} />
        <RootStack.Screen name="SelectSeries" component={SelectSeries} />
        <RootStack.Screen name="EditSeries" component={EditSeries} />
        <RootStack.Screen name="EditChapter" component={EditChapter} />
        <RootStack.Screen name="EditTeacher" component={EditTeacher} />
        <RootStack.Screen name="SelectTeacher" component={SelectTeacher} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
