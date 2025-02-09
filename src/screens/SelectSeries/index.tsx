import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {RouteProp, useFocusEffect} from '@react-navigation/native';
import {Button, Flex} from '@src/components';
import ToolBar from '@src/components/ToolBar';
import {useCaches} from '@src/constants/store';
import {Divider, useToast} from 'native-base';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RootStacksParams, RootStacksProp} from '../Screens';
import {Series, Teacher} from '@src/constants/t';
import {NextService} from '@src/service';
import x from '@src/constants/x';

interface MyProps {
  navigation?: RootStacksProp;
  route?: RouteProp<RootStacksParams, 'SelectTeacher'>;
}

const SelectSeries: React.FC<MyProps> = props => {
  const {navigation, route} = props;
  const {theme, setUser, selectedSeries, setSelectedSeries} = useCaches();
  const [datas, setDatas] = useState<Series[]>([]);
  const [focused, setFocused] = useState(false);

  const toast = useToast();

  const loadDatas = async () => {
    let result = await new NextService().selectSerieses();
    setDatas(result.data);
  };

  useFocusEffect(
    useCallback(() => {
      setFocused(true);
      return function () {
        setFocused(false);
      };
    }, []),
  );

  useEffect(() => {
    if (focused) {
      loadDatas();
    }
    return function () {};
  }, [focused]);

  const loadItem = (info: ListRenderItemInfo<Series>) => {
    const {item} = info;
    return (
      <TouchableOpacity
        style={{
          ...styles.item,
          borderColor: selectedSeries.id == item.id ? theme : '#ccc',
        }}
        activeOpacity={0.8}
        onPress={() => {
          setSelectedSeries(item);
        }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.brief}>{item.brief}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: x.Color.PAGE}}>
      <ToolBar
        title={'选择系列'}
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <View style={{height: 1, backgroundColor: '#eee'}} />
      <FlatList
        style={{flex: 1}}
        data={datas}
        renderItem={loadItem}
        extraData={SelectSeries}
        keyExtractor={item => item.id}
        ListHeaderComponent={<View style={{height: 5}} />}
        ItemSeparatorComponent={() => <View style={{height: 5}} />}
      />
      <Divider />
      <Flex
        horizontal
        justify={'flex-end'}
        style={{paddingHorizontal: 15, paddingVertical: 10}}>
        <Button
          title={'新建'}
          style={{
            borderColor: theme,
            ...styles.newButton,
          }}
          textStyle={{color: theme}}
          onPress={() => {
            navigation.navigate('EditSeries');
          }}
        />
      </Flex>
      <View
        style={{height: useSafeAreaInsets().bottom, backgroundColor: 'white'}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    textAlignVertical: 'center',
  },
  value: {
    fontSize: 14,
    color: '#666',
  },
  item: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginHorizontal: 12,
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  brief: {
    fontSize: 14,
    color: '#666',
  },
  newButton: {
    height: 36,
    borderWidth: 1,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  saveButton: {
    height: 36,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  line: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 15,
  },
});

export default SelectSeries;
