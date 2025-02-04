import React from 'react';
import {
  Image,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import x from '@src/constants/x';
import Card from '../Card';
import {RootStacksProp} from '@src/screens/Screens';
import {useCaches} from '@src/constants/store';

interface MyProps {
  navigation?: RootStacksProp;
  onPress: () => void;
}

const Global: React.FC<MyProps> = props => {
  const {global} = useCaches();
  const {onPress} = props;

  return (
    <Card title={'自选指数'}>
      <View style={{height: 6}} />
      <TouchableOpacity
        style={x.Styles.rowCenter('space-between')}
        onPress={onPress}
        activeOpacity={x.Touchable.OPACITY}>
        <Text
          style={{
            fontSize: x.scale(14),
            color: '#333',
          }}>{`已选${global.length}个指数`}</Text>
        <Image
          source={require('@src/assets/images/common/arrow_right.png')}
          style={{height: x.scale(16), width: x.scale(16), tintColor: '#999'}}
        />
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({});

export default Global;
