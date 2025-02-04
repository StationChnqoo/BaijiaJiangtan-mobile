import React, {useCallback, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {useFocusEffect} from '@react-navigation/native';
import {Flex} from '@src/components';
import {BooksTemplates} from '@src/constants/config';
import {useCaches} from '@src/constants/store';
import x from '@src/constants/x';
import {NextService} from '@src/service';
import {useQuery} from '@tanstack/react-query';
import moment from 'moment';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RootStacksProp} from '../Screens';

interface MyProps {
  navigation?: RootStacksProp;
}

const Wallet: React.FC<MyProps> = props => {
  const {navigation} = props;
  const {theme, setUser, user} = useCaches();
  const [focused, setFocused] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setFocused(true);
      // console.log(`SHA256: ${SHA256('666666')}`);
      return function () {
        setFocused(false);
      };
    }, []),
  );

  // console.log(propertyQuery.data?.data?.datas);
  // let datas = propertyQuery.data?.data?.datas || [];
  return (
    <View style={{flex: 1, backgroundColor: '#f0f0f0'}}>
      <View
        style={{height: useSafeAreaInsets().top, backgroundColor: '#fff'}}
      />
      <ScrollView
        style={{paddingHorizontal: 12}}
        contentInsetAdjustmentBehavior="automatic"
        bounces={false}>
        <View style={{height: 12}} />
        <View style={{borderRadius: 12, marginVertical: 6}}>
          {BooksTemplates.map((it, i) => (
            <TouchableOpacity
              key={i}
              style={{...styles.item, borderColor: '#ccc'}}
              onPress={() => {}}
              activeOpacity={0.8}>
              <Flex style={{alignItems: 'flex-start'}}>
                <Flex style={{...styles.badge, backgroundColor: it.value}}>
                  <Text style={styles.label} numberOfLines={1}>
                    {it.label}
                  </Text>
                </Flex>
                <Text
                  style={{
                    fontSize: x.scale(16),
                    color: '#333',
                    fontWeight: '500',
                  }}>
                  你是真的6啊兄弟
                </Text>
              </Flex>
              <View style={{height: 10}} />
              <Flex horizontal justify={'space-between'}>
                <Flex horizontal>
                  <Text style={{color: theme, fontSize: x.scale(14)}}>
                    {Math.ceil(Math.random() * 1024)}笔
                  </Text>
                  <Text style={{color: '#999'}}> | </Text>
                  <Text style={{color: '#666', fontSize: x.scale(14)}}>
                    {(Math.random() * 1024).toFixed(2)}元
                  </Text>
                </Flex>
                <Text style={{color: '#333', fontSize: x.scale(12)}}>
                  {/* 创建：{moment().format('YYYY-MM-DD HH:mm')} */}
                  {moment().fromNow().replace(' ', '')}更新
                </Text>
              </Flex>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    borderRadius: 15,
    borderWidth: 1,
    position: 'relative',
    // height: x.scale(64),
    backgroundColor: '#fff',
    marginVertical: 2,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  badge: {
    position: 'absolute',
    right: -12,
    top: -8,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 6,
  },
  label: {
    fontSize: x.scale(12),
    color: '#fff',
  },
});

export default Wallet;
