import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {useFocusEffect} from '@react-navigation/native';
import {useCaches} from '@src/constants/store';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RootStacksProp} from '../Screens';
import {Tabs} from '@src/components';
import x from '@src/constants/x';
import {NextService} from '@src/service';
import {produce} from 'immer';

interface MyProps {
  navigation?: RootStacksProp;
}

const Datas: React.FC<MyProps> = props => {
  const {navigation} = props;
  const {theme, setUser, user} = useCaches();
  const [focused, setFocused] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  const [tabs, setTabs] = useState([
    {label: '已放弃', value: '--', id: '-1'},
    {label: '未处理', value: '--', id: '0'},
    {label: '待考虑', value: '--', id: '1'},
    {label: '已完成', value: '--', id: '2'},
  ]);

  const loadStatusCount = async () => {
    let result = await new NextService().chapterStatusCount();
    setTabs(
      produce(tabs, draft => {
        Object.keys(result.data).map(key => {
         // console.log(key, result.data[key])
         let index = draft.findIndex((it) => it.id == key);
         draft[index].value = result.data[key]
        });
      }),
    );
  };

  useFocusEffect(
    useCallback(() => {
      setFocused(true);
      // console.log(`SHA256: ${SHA256('666666')}`);
      return function () {
        setFocused(false);
      };
    }, []),
  );

  useEffect(() => {
    loadStatusCount();
    return function () {};
  }, [focused]);

  return (
    <View style={{flex: 1, backgroundColor: '#f0f0f0'}}>
      <View
        style={{height: useSafeAreaInsets().top, backgroundColor: '#fff'}}
      />
      <View style={{backgroundColor: '#fff', ...x.Styles.CARD}}>
        <Tabs tabs={tabs} onTabPress={setTabIndex} tabIndex={tabIndex} />
        <View style={{paddingHorizontal: 15}}>
          <Text style={{fontSize: 14, color: '#999'}}>
            {tabs.map(it => `${it.label}/${it.value}`).join(' | ')}
          </Text>
          <View style={{height: 5}} />
        </View>
      </View>
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
});

export default Datas;
