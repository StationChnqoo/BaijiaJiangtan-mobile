import {useCaches} from '@src/constants/store';
import x from '@src/constants/x';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Flex from '../Flex';

interface MyProps {
  label: string;
  onPress: () => void;
}

const MoreButton: React.FC<MyProps> = props => {
  const {label, onPress} = props;
  const {theme} = useCaches();
  return (
    <TouchableOpacity activeOpacity={x.Touchable.OPACITY} onPress={onPress}>
      <Flex horizontal>
        <Text style={{color: theme, fontSize: 16}}>{label}</Text>
        <View style={{width: 4}} />
        <Image
          source={require('@src/assets/images/common/arrow_right.png')}
          style={{height: 16, width: 16, tintColor: theme}}
        />
      </Flex>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default MoreButton;
