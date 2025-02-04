import ToolBar from '@src/components/ToolBar';

import {RouteProp} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import {useCaches} from '@src/constants/store';
import {RootStacksParams, RootStacksProp} from '../Screens';

interface MyProps {
  navigation?: RootStacksProp;
  route?: RouteProp<RootStacksParams, 'Webviewer'>;
}

const Webviewer: React.FC<MyProps> = props => {
  const {navigation, route} = props;
  const {theme} = useCaches();
  const [progress, setProgress] = useState(0);
  const [isShowProgressBar, setIsShowProgressBar] = useState(false);

  // useFocusEffect(useCallback(() => {}, [sound]));

  return (
    <View style={{flex: 1}}>
      <ToolBar
        title={route.params.title}
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.view}>
        <WebView
          source={{uri: route.params.url}}
          style={{flex: 1}}
          allowFileAccess={false}
          automaticallyAdjustContentInsets={true}
          allowsBackForwardNavigationGestures={false}
          cacheEnabled={false}
          scalesPageToFit={true}
          geolocationEnabled={false}
          javaScriptEnabled={true}
          onLoadProgress={e => {
            setProgress(e.nativeEvent.progress);
          }}
          onLoadStart={() => setIsShowProgressBar(true)}
          onLoadEnd={() => setIsShowProgressBar(false)}
          pullToRefreshEnabled={false}
          javaScriptCanOpenWindowsAutomatically={false}
          setDisplayZoomControls={false}
        />
      </View>
      <View style={{height: useSafeAreaInsets().bottom}} />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
  },
});

export default Webviewer;
