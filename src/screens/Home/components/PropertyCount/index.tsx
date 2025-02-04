import {Flex} from '@src/components';
import {Fonts} from '@src/constants/config';
import {useCaches} from '@src/constants/store';
import x from '@src/constants/x';
import React, {memo} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import MiniLineChart from './components/MiniLineChart';

interface MyProps {}

const PropertyCount: React.FC<MyProps> = memo(props => {
  const {} = props;
  const {theme, user} = useCaches();

  const sideSize = {height: x.scale(48), width: x.scale(48)};
  // const money = [
  //   '643.30',
  //   '642.70',
  //   '645.60',
  //   '655.50',
  //   '661.00',
  //   '659.90',
  // ].map(it => parseFloat(it));
  const money = Array.from({length: 52}, (_, i) => Math.random() * i);
  const rateBasedLastMonth =
    Math.random() * 100 * (Math.random() < 0.5 ? -1 : 1);
  return (
    <View
      style={{
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 12,
      }}>
      <Flex align={'flex-end'} justify={'space-between'} horizontal>
        <Flex align={'flex-start'} style={{}}>
          <Text style={{color: '#999', fontSize: x.scale(12)}}>总资产</Text>
          <View style={{height: 10}} />
          <Flex horizontal align={'baseline'}>
            <Text
              style={{
                color: x.Color.RED,
                fontSize: x.scale(36),
                fontFamily: Fonts.digital,
              }}>
              {money.pop().toFixed(2)}
            </Text>
            <Text style={{color: '#333', fontSize: x.scale(14)}}>K</Text>
          </Flex>
          <View style={{height: 10}} />
          <Text style={{color: '#333', fontSize: x.scale(14)}}>
            本月总支出：
            <Text style={{color: x.Color.RED}}>
              {(Math.random() * 1024).toFixed(2)}K
            </Text>
          </Text>
          <View style={{height: 5}} />
          <Text style={{color: '#333', fontSize: x.scale(14)}}>
            同比上个月：
            <Text style={{color: x.Colors.STOCK(rateBasedLastMonth)}}>
              {rateBasedLastMonth.toFixed(2)}%
              {x.Strings.renderUpOrDown(rateBasedLastMonth)}
            </Text>
          </Text>
        </Flex>
        <View style={{width: 24}} />
        <MiniLineChart datas={money} />
      </Flex>
    </View>
  );
});

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

export default PropertyCount;
