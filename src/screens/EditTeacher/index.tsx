import React, {useEffect, useState} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';

import {RouteProp} from '@react-navigation/native';
import {Button, Flex} from '@src/components';
import ToolBar from '@src/components/ToolBar';
import {useCaches} from '@src/constants/store';
import {SeriesSchema, Teacher} from '@src/constants/t';
import x from '@src/constants/x';
import {NextService} from '@src/service';
import {produce} from 'immer';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RootStacksParams, RootStacksProp} from '../Screens';

interface MyProps {
  navigation?: RootStacksProp;
  route?: RouteProp<RootStacksParams, 'EditTeacher'>;
}

const EditTeacher: React.FC<MyProps> = props => {
  const {navigation, route} = props;
  const {theme, setUser, selectedTeacher} = useCaches();
  const [form, setForm] = useState<Teacher>(SeriesSchema.parse({}));

  const updateForm = <K extends keyof Teacher>(key: K, value: Teacher[K]) => {
    let _form = produce(form, draft => {
      draft[key] = value;
    });
    setForm(_form);
  };

  const onSave = async () => {
    let result = await new NextService().mergeTeacher(form);
    navigation.goBack();
  };

  const loadLine = () => <View style={styles.line} />;

  const loadDetail = async () => {
    let _form = JSON.parse(JSON.stringify(form)) as Teacher;
    if (route.params?.id) {
    } else {
      _form.createTime = new Date().getTime();
      let result = await new NextService().selectUUID();
      _form.id = result.data;
    }
    _form.updateTime = new Date().getTime();
    setForm(_form);
  };

  useEffect(() => {
    loadDetail();
    return function () {};
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ToolBar
        title={`${route.params?.id ? '编辑' : '新增'}教师`}
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <View style={{height: 1, backgroundColor: '#eee'}} />
      <ScrollView bounces={false} style={{flex: 1}}>
        <View style={{padding: 15}}>
          <Flex horizontal justify="space-between">
            <Text style={styles.label}>ID</Text>
            <Text style={{color: '#666', fontSize: 14}}>{form.id}</Text>
          </Flex>
          <Flex horizontal justify="space-between">
            <Text style={styles.label}>更新时间</Text>
            <Text style={{color: '#666', fontSize: 14}}>
              {moment(form.updateTime).fromNow().replace(' ', '')}
            </Text>
          </Flex>
          <Flex horizontal justify="space-between">
            <Text style={styles.label}>创建时间</Text>
            <Text style={{color: '#666', fontSize: 14}}>
              {moment(form.updateTime).format('YYYY-MM-DD HH:mm:ss')}
            </Text>
          </Flex>
          {loadLine()}
          <Flex horizontal justify="space-between">
            <Text style={styles.label}>姓名</Text>
            <View style={{width: 12}} />
            <TextInput
              placeholder="姓名"
              style={{...styles.input, height: undefined}}
              textAlign={'right'}
              multiline
              value={form.name}
              onChangeText={t => updateForm('name', t)}
            />
          </Flex>
          {loadLine()}
          <Flex horizontal justify="space-between">
            <Text style={styles.label}>头衔</Text>
            <View style={{width: 12}} />
            <TextInput
              placeholder="头衔"
              style={{...styles.input, height: undefined}}
              textAlign={'right'}
              multiline
              value={form.title}
              onChangeText={t => updateForm('title', t)}
            />
          </Flex>
          {loadLine()}
          <Flex horizontal justify="space-between">
            <Text style={styles.label}>介绍</Text>
            <View style={{width: 12}} />
            <TextInput
              placeholder="介绍"
              style={{...styles.input, height: undefined}}
              textAlign={'right'}
              multiline
              value={form.message}
              onChangeText={t => updateForm('message', t)}
            />
          </Flex>
          {loadLine()}
          <Flex horizontal justify="space-between">
            <Text style={styles.label}>状态</Text>
            <View style={{width: 12}} />
            <Switch
              value={form.status == 1}
              onChange={t => {
                updateForm('status', -form.status + 1);
              }}
              thumbColor={form.status == 1 ? theme : '#999'}
              // style={{transform: [{scaleX: 0.8}, {scaleY: 0.8}]}}
              trackColor={{false: '#ccc', true: x.Colors.hex2Rgba(theme, 0.28)}}
            />
          </Flex>
          {loadLine()}
          <Flex horizontal justify="space-between">
            <FastImage style={styles.avatar} source={{uri: form.avatar}} />
            <View style={{width: 5}} />
            <TextInput
              placeholder="头像"
              style={{...styles.input, height: undefined}}
              textAlign={'right'}
              multiline
              value={form.avatar}
              onChangeText={t => updateForm('avatar', t)}
            />
          </Flex>
          {loadLine()}
        </View>
      </ScrollView>
      <View style={{height: 1, backgroundColor: '#ccc'}} />
      <Flex
        horizontal
        justify={'flex-end'}
        style={{
          paddingHorizontal: 15,
          paddingVertical: 10,
          backgroundColor: '#fff',
        }}>
        <Button
          title={'保存'}
          style={{
            backgroundColor: theme,
            ...styles.saveButton,
          }}
          textStyle={{color: '#fff'}}
          onPress={onSave}
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
    fontWeight: '500',
    textAlignVertical: 'center',
  },
  avatar: {
    height: 48,
    width: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  value: {
    fontSize: 14,
    color: '#666',
  },
  saveButton: {
    height: 36,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  line: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 12,
  },
  input: {
    fontSize: 16,
    lineHeight: 16,
    flex: 1,
    padding: 0,
    height: 24,
  },
});

export default EditTeacher;
