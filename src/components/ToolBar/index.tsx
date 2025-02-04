import x from '@src/constants/x';
import {RootStacksProp} from '@src/screens/Screens';
import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface MyProps {
  navigation?: RootStacksProp;
  title: String;
  onBackPress?: () => void;
}

const IMAGE_SIZE = 16;

const ToolBar: React.FC<MyProps> = props => {
  const {title, onBackPress} = props;
  return (
    <View style={{backgroundColor: '#fff', ...x.Styles.CARD}}>
      <View
        style={{
          backgroundColor: '#fff',
          height: Platform.select({ios: useSafeAreaInsets().top, android: 0}),
        }}
      />
      {/* <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'#fff'}
        translucent={false}
      /> */}
      <View style={styles.views}>
        <TouchableOpacity
          activeOpacity={0.9}
          hitSlop={{
            top: 12,
            bottom: 12,
            left: 12,
            right: 12,
          }}
          onPress={() => {
            onBackPress?.();
          }}>
          <Image
            source={require('@src/assets/images/common/arrow_left.png')}
            style={{height: IMAGE_SIZE, width: IMAGE_SIZE, tintColor: '#666'}}
          />
        </TouchableOpacity>
        <Text style={{fontSize: 16, color: '#333', fontWeight: '500'}}>
          {title}
        </Text>
        <View style={{width: IMAGE_SIZE}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  views: {
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex',
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    height: 52,
    backgroundColor: '#fff',
  },
});

export default ToolBar;
