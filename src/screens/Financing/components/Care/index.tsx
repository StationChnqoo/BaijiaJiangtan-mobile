import {Flex} from '@src/components';
import {Fonts} from '@src/constants/config';
import {useCaches} from '@src/constants/store';
import {RealTimePrice} from '@src/constants/t';
import x from '@src/constants/x';
import moment from 'moment';

import React, {memo, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface MyProps {
  datas: RealTimePrice[];
  onPress: (fd: RealTimePrice) => void;
}

const Care: React.FC<MyProps> = memo(props => {
  const {datas, onPress} = props;
  const {theme, isDidiao} = useCaches();

  return (
    <View style={{position: 'relative', ...styles.view}}>
      <View style={{}}>
        {datas.length == 0 ? (
          <ActivityIndicator color={theme} />
        ) : (
          datas.map((it, i) => (
            <TouchableOpacity
              activeOpacity={0.8}
              key={i}
              style={{backgroundColor: 'white', paddingHorizontal: 16}}
              onPress={() => {
                onPress(it);
              }}>
              <Flex horizontal justify={'space-between'}>
                <View style={{flex: 1, justifyContent: 'space-between'}}>
                  <Text
                    style={{
                      fontSize: x.scale(14),
                      color: '#333',
                      fontWeight: '500',
                    }}
                    numberOfLines={1}>
                    {isDidiao ? '=。=' : `${it.f57} | ${it.f58}`}
                  </Text>
                  <View style={{height: 5}} />
                  <Text style={{color: '#999', fontSize: x.scale(12)}}>
                    {`${moment(it.f86 * 1000)
                      .fromNow()
                      .replace(' ', '')} | ${moment(it.f86 * 1000).format(
                      'YYYY/MM/DD HH:mm',
                    )}`}
                  </Text>
                  <View style={{height: 5}} />
                  <Flex horizontal justify={'space-between'} align={'baseline'}>
                    <Text
                      style={{
                        fontFamily: Fonts.digital,
                        fontSize: 36,
                        color: x.Colors.STOCK(it.f170),
                      }}>
                      {(it.f43 / Math.pow(10, it.f59)).toFixed(2)}
                    </Text>
                    <Text
                      style={{
                        fontSize: x.scale(14),
                        color: x.Colors.STOCK(it.f170),
                      }}>
                      {(it.f170 / 100).toFixed(2)}%
                      {x.Strings.renderUpOrDown(it.f170)}
                    </Text>
                  </Flex>
                </View>
                <View style={{width: 12}} />
                <Image
                  key={`${i}:${Math.ceil(new Date().getTime() / 10000)}`}
                  style={{height:x.scale(68), width: x.scale(122)}}
                  source={{
                    uri: `https://webquotepic.eastmoney.com/GetPic.aspx?nid=${
                      it.f107
                    }.${it.f57}&imageType=RTOPSH&_${Math.ceil(
                      new Date().getTime() / 10000,
                    )}`,
                  }}
                />
              </Flex>
              {i == datas.length - 1 ? null : (
                <View
                  style={{
                    height: 1,
                    backgroundColor: '#ddd',
                    marginVertical: 4,
                  }}
                />
              )}
            </TouchableOpacity>
          ))
        )}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  view: {
    backgroundColor: 'white',
    // borderRadius: 12,
    paddingVertical: 12,
  },
  stock: {
    paddingVertical: x.scale(8),
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
    // marginTop: 6,
    // borderWidth: 1,
    // borderColor: '#ccc',
    height: x.scale(56),
    justifyContent: 'space-between',
  },
  viewCounts: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewProgressBar: {
    height: 4,
    borderRadius: 2,
    marginHorizontal: 2,
  },
  dots: {
    position: 'absolute',
    right: 0,
    top: 0,
    // borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.58)',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: x.scale(10),
    borderBottomLeftRadius: x.scale(10),
    height: x.scale(20),
    width: x.scale(36),
  },
});

export default Care;
