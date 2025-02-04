import x from '@src/constants/x';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Card from '../Card';
import {useFocusEffect} from '@react-navigation/native';
import {useQueries} from '@tanstack/react-query';
import {useCaches} from '@src/constants/store';
import {DfcfService} from '@src/service';
import {RealTimePrice} from '@src/constants/t';
import {produce} from 'immer';
import {Flex} from '@src/components';

interface MyProps {
  onNewStockPress: () => void;
}

const Stocks: React.FC<MyProps> = props => {
  const {onNewStockPress} = props;
  const {theme} = useCaches();
  const {cared, setCared} = useCaches();
  const [focused, setFocused] = useState(false);
  const [open, setOpen] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setFocused(true);
      return function () {
        return false;
      };
    }, []),
  );

  useEffect(() => {
    // console.log('Cared: ', cared);
    return function () {};
  }, [cared]);

  const caredQuery = useQueries({
    queries: cared.map(it => ({
      queryKey: ['caredQuery', it],
      queryFn: () => new DfcfService().selectRealtimePrice(it),
      enabled: focused,
      placeholderData: {data: null},
    })),
  });

  const onDeletePress = (index: number, code: string, name: string) => {
    Alert.alert(code, `确认删除${name}?`, [
      {text: '取消'},
      {
        text: '确认',
        onPress: () => {
          let stocks = produce(cared, draft => {
            draft.splice(index, 1);
          });
          setCared(stocks);
        },
      },
    ]);
  };

  const onMovePress = (n: number, index: number) => {
    if ((n == -1 && index == 0) || (n == 1 && index == cared.length - 1)) {
      // 越界
    } else {
      let datas = produce(cared, draft => {
        let t = draft[index];
        draft[index] = draft[index + n];
        draft[index + n] = t;
      });
      setCared(datas);
    }
  };

  return (
    <Card
      title={'我的关注'}
      moreView={
        <View style={x.Styles.rowCenter('flex-start')}>
          <TouchableOpacity
            onPress={onNewStockPress}
            activeOpacity={x.Touchable.OPACITY}>
            <Text style={{color: theme, fontSize: x.scale(14)}}>新增</Text>
          </TouchableOpacity>
        </View>
      }>
      <View>
        {caredQuery.length == 0 ? (
          <ActivityIndicator color={theme} />
        ) : (
          caredQuery
            .slice(0, open ? caredQuery.length : 3)
            .map((item, index) => {
              let it = item.data.data as RealTimePrice;
              let i = index;
              return it ? (
                <View key={i} style={styles.view}>
                  <View style={x.Styles.rowCenter()}>
                    <View style={{flex: 1}}>
                      <Text
                        style={{
                          color: '#333',
                          fontWeight: '500',
                          fontSize: x.scale(14),
                        }}>
                        {it.f58}
                      </Text>
                      <View style={{height: 4}} />
                      <View style={[x.Styles.rowCenter('space-between')]}>
                        <Text style={{fontSize: x.scale(12), color: '#666'}}>
                          {it.f107}.{it.f57}
                        </Text>
                        <Text
                          style={{
                            fontSize: x.scale(12),
                            color: x.Colors.STOCK(it.f170),
                          }}>
                          {`${x.Strings.renderUpOrDown(it.f170)}${(
                            it.f170 / 100
                          ).toFixed(2)}%`}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        width: 1,
                        marginHorizontal: 12,
                        backgroundColor: '#ccc',
                        height: x.scale(32),
                      }}
                    />
                    <View style={x.Styles.rowCenter()}>
                      <TouchableOpacity
                        activeOpacity={x.Touchable.OPACITY}
                        disabled={i == 0}
                        onPress={() => {
                          onMovePress(-1, i);
                        }}>
                        <Image
                          source={require('@src/assets/images/common/move_up.png')}
                          style={{
                            height: x.scale(18),
                            width: x.scale(18),
                            tintColor: i == 0 ? '#ccc' : theme,
                          }}
                        />
                      </TouchableOpacity>
                      <View style={{width: 12}} />
                      <TouchableOpacity
                        activeOpacity={x.Touchable.OPACITY}
                        disabled={i == cared.length - 1}
                        onPress={() => {
                          onMovePress(1, i);
                        }}>
                        <Image
                          source={require('@src/assets/images/common/move_down.png')}
                          style={{
                            height: x.scale(18),
                            width: x.scale(18),
                            tintColor: i == cared.length - 1 ? '#ccc' : theme,
                          }}
                        />
                      </TouchableOpacity>
                      <View style={{width: 12}} />
                      <TouchableOpacity
                        activeOpacity={x.Touchable.OPACITY}
                        onPress={() => {
                          onDeletePress(i, it.f57, it.f58);
                        }}>
                        <Image
                          source={require('../../assets/delete.png')}
                          style={{
                            height: x.scale(18),
                            width: x.scale(18),
                            tintColor: theme,
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ) : null;
            })
        )}
        {cared.length > 3 ? (
          <Flex style={{marginTop: 12}}>
            <TouchableOpacity
              onPress={() => {
                setOpen(!open);
              }}
              activeOpacity={x.Touchable.OPACITY}>
              <Image
                source={
                  open
                    ? require('@src/assets/images/common/expand_close.png')
                    : require('@src/assets/images/common/expand_open.png')
                }
                style={{height: 12, width: 20, tintColor: theme}}
              />
            </TouchableOpacity>
          </Flex>
        ) : null}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  view: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  text: {
    fontSize: x.scale(18),
    fontWeight: '500',
    color: '#333',
  },
});

export default Stocks;
