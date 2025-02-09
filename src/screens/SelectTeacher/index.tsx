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
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import x from '@src/constants/x';

interface MyProps {
  navigation?: RootStacksProp;
  route?: RouteProp<RootStacksParams, 'SelectTeacher'>;
}

const SelectTeacher: React.FC<MyProps> = props => {
  const {navigation, route} = props;
  const {theme, setUser, selectedTeacher, setSelectedTeacher} = useCaches();
  const [datas, setDatas] = useState<Series[]>([]);
  const [focused, setFocused] = useState(false);

  const toast = useToast();

  const loadDatas = async () => {
    let result = await new NextService().selectTeachers();
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

  const loadItem = (info: ListRenderItemInfo<Teacher>) => {
    const {item} = info;
    return (
      <TouchableOpacity
        style={{
          ...styles.item,
          borderColor: selectedTeacher.id == item.id ? theme : '#ccc',
        }}
        activeOpacity={0.8}
        onPress={() => {
          setSelectedTeacher(item);
        }}>
        <Flex justify="space-between" horizontal>
          <FastImage
            source={{uri: item.avatar}}
            style={{width: 48, height: 48, borderRadius: 24}}
          />
          <View style={{width: 10}} />
          <View style={{flex: 1, height: 44, justifyContent: 'space-around'}}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.title}>{item.title}</Text>
          </View>
        </Flex>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: x.Color.PAGE}}>
      <ToolBar
        title={'选择教师'}
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <View style={{height: 1, backgroundColor: '#eee'}} />
      <FlatList
        style={{flex: 1}}
        data={datas}
        renderItem={loadItem}
        extraData={selectedTeacher}
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
            navigation.navigate('EditTeacher');
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
  name: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  title: {
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

export default SelectTeacher;
