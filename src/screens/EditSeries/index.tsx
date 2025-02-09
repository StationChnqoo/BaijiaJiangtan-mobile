import React, {useCallback, useEffect, useState} from 'react';
import {Alert, StyleSheet, Switch, Text, TextInput, View} from 'react-native';

import {RouteProp, useFocusEffect} from '@react-navigation/native';
import {Button, Flex, MoreButton} from '@src/components';
import ToolBar from '@src/components/ToolBar';
import {useCaches} from '@src/constants/store';
import {Series, SeriesSchema} from '@src/constants/t';
import x from '@src/constants/x';
import {produce} from 'immer';
import moment from 'moment';
import {Divider, ScrollView, useToast} from 'native-base';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RootStacksParams, RootStacksProp} from '../Screens';
import {NextService} from '@src/service';
import FastImage from 'react-native-fast-image';

interface MyProps {
  navigation?: RootStacksProp;
  route?: RouteProp<RootStacksParams, 'EditSeries'>;
}

const EditSeries: React.FC<MyProps> = props => {
  const {navigation, route} = props;
  const {theme, setUser, selectedTeacher} = useCaches();
  const [form, setForm] = useState<Series>(SeriesSchema.parse({}));
  const [focused, setFocused] = useState(false);
  const toast = useToast();

  const updateForm = <K extends keyof Series>(key: K, value: Series[K]) => {
    let _form = produce(form, draft => {
      draft[key] = value;
    });
    setForm(_form);
  };

  const onSave = async () => {
    new NextService().mergeSeries(form);
    toast.show({description: '操作成功'});
    navigation.goBack();
  };

  const loadLine = () => <View style={styles.line} />;

  const loadDetail = async () => {
    let _form = JSON.parse(JSON.stringify(form)) as Series;
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

  useFocusEffect(
    useCallback(() => {
      setFocused(true);
      return function () {
        setFocused(false);
      };
    }, []),
  );

  useEffect(() => {
    updateForm('teacherId', selectedTeacher.id);
    return function () {};
  }, [selectedTeacher, focused]);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ToolBar
        title={`${route.params?.id ? '编辑' : '新增'}系列`}
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
          <View>
            <Flex horizontal justify="space-between">
              <Text style={styles.label}>教师</Text>
              <MoreButton
                label={form.teacherId || '请选择'}
                onPress={() => {
                  navigation.navigate('SelectTeacher');
                }}
              />
            </Flex>
            {form.teacherId ? (
              <Text style={{color: '#999', marginTop: 5, fontSize: 12}}>
                {JSON.stringify(selectedTeacher)}
              </Text>
            ) : null}
          </View>
          {loadLine()}
          <Flex horizontal justify="space-between">
            <Text style={styles.label}>标题</Text>
            <View style={{width: 12}} />
            <TextInput
              placeholder="标题"
              style={{...styles.input, height: undefined}}
              textAlign={'right'}
              multiline
              value={form.title}
              onChangeText={t => updateForm('title', t)}
            />
          </Flex>
          {loadLine()}
          <Flex horizontal justify="space-between">
            <Text style={styles.label}>简介</Text>
            <View style={{width: 12}} />
            <TextInput
              placeholder="简介"
              style={{...styles.input, height: undefined}}
              textAlign={'right'}
              multiline
              value={form.brief}
              onChangeText={t => updateForm('brief', t)}
            />
          </Flex>
          {loadLine()}
          <Flex horizontal justify="space-between">
            <Text style={styles.label}>备注</Text>
            <View style={{width: 12}} />
            <TextInput
              placeholder="备注"
              style={{...styles.input, height: undefined}}
              textAlign={'right'}
              multiline
              value={form.message}
              onChangeText={t => updateForm('message', t)}
            />
          </Flex>
          {loadLine()}
          <Flex horizontal justify="space-between">
            <Text style={styles.label}>年份</Text>
            <View style={{width: 12}} />
            <TextInput
              placeholder="年份"
              style={{...styles.input, height: undefined}}
              textAlign={'right'}
              multiline
              value={`${form.debut}`}
              onChangeText={t => updateForm('debut', parseInt(t))}
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
            <FastImage style={styles.cover} source={{uri: form.cover}} />
            <View style={{width: 5}} />
            <TextInput
              placeholder="封面"
              style={{...styles.input, height: undefined}}
              textAlign={'right'}
              multiline
              value={form.cover}
              onChangeText={t => updateForm('cover', t)}
            />
          </Flex>
          {loadLine()}
        </View>
      </ScrollView>
      <Divider />
      <Flex
        horizontal
        justify={'flex-end'}
        style={{paddingHorizontal: 15, paddingVertical: 10}}>
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
  cover: {
    height: 80,
    width: 60,
    borderRadius: 5,
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

export default EditSeries;
