import {Flex} from '@src/components';
import {useCaches} from '@src/constants/store';
import x from '@src/constants/x';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface MyProps {}

const ProfileBar: React.FC<MyProps> = props => {
  const {} = props;
  const {theme, user} = useCaches();

  const sideSize = {height: x.scale(48), width: x.scale(48)};
  return (
    <View style={{backgroundColor: '#fff', ...x.Styles.CARD}}>
      <View style={{height: useSafeAreaInsets().top}} />
      <Flex
        justify={'space-between'}
        horizontal
        style={{paddingHorizontal: 16, paddingVertical: 4}}>
        <Flex align={'flex-start'} style={{flex: 1}}>
          <Text
            style={{color: '#000', fontSize: x.scale(20)}}>
            你好，{user.name}
          </Text>
          <View style={{height: 5}} />
          <Text style={{color: '#999', fontSize: x.scale(12)}}>
            这是Bookkeeping陪你走过的第1天
          </Text>
        </Flex>
        <Flex style={{}} horizontal>
          <TouchableOpacity>
            <Image
              source={require('@src/assets/images/home/ring.png')}
              style={{
                height: x.scale(20),
                width: x.scale(20),
                tintColor: theme,
              }}
            />
          </TouchableOpacity>
          <View style={{width: 12}} />
          <FastImage
            source={{uri: user.avatar}}
            style={{...sideSize, borderRadius: x.scale(24)}}
          />
        </Flex>
      </Flex>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    // backgroundColor: 'white',
    borderRadius: 8,
  },
  viewGroup: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 6,
  },
  textGroupTitle: {
    fontSize: x.scale(16),
    fontWeight: '500',
    color: '#333',
    paddingHorizontal: 12,
  },
  viewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 2,
    marginVertical: 2,
    paddingHorizontal: 8,
    marginHorizontal: 4,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  textItemName: {
    fontSize: x.scale(14),
    flex: 1,
  },
});

export default ProfileBar;
