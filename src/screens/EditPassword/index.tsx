import React, {useEffect, useState} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {RouteProp} from '@react-navigation/native';
import {Button, Flex} from '@src/components';
import ToolBar from '@src/components/ToolBar';
import {useCaches} from '@src/constants/store';
import {Jira, Password, PasswordSchema} from '@src/constants/t';
import {NextService} from '@src/service';
import {produce} from 'immer';
import moment from 'moment';
import {Divider, useToast} from 'native-base';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RootStacksParams, RootStacksProp} from '../Screens';

interface MyProps {
  navigation?: RootStacksProp;
  route?: RouteProp<RootStacksParams, 'EditJira'>;
}

const EditJira: React.FC<MyProps> = props => {
  const {navigation, route} = props;
  const {theme, setUser} = useCaches();
  const [form, setForm] = useState<Password>(PasswordSchema.parse({}));

  const Platforms = [
    {label: '🌏 Web', value: 'web'},
    {label: '📱 App', value: 'app'},
  ];
  const toast = useToast();

  const updateForm = <K extends keyof Password>(key: K, value: Password[K]) => {
    let _form = produce(form, draft => {
      draft[key] = value;
    });
    setForm(_form);
  };

  const onDelete = async () => {
    Alert.alert('提示', '删除后不可恢复，请谨慎操作。', [
      {text: '取消', onPress: () => {}},
      {
        text: '确定',
        onPress: async () => {
          const result = await new NextService().deletePassword(form.id);
          toast.show({description: '删除成功'});
          navigation.goBack();
        },
      },
    ]);
  };

  const onSave = async () => {
    await new NextService().mergePassword(form);
    toast.show({description: '操作成功'});
    navigation.goBack();
  };

  const loadLine = (n?: string) => <View style={{...styles.line}} />;

  const loadPassword = async () => {
    let _form = JSON.parse(JSON.stringify(form)) as Jira;
    if (route.params?.id) {
      let result = await new NextService().selectPassword(route.params.id);
      _form = result.data;
    } else {
      _form.createTime = new Date().getTime();
      let result = await new NextService().selectUUID();
      _form.id = result.data;
    }
    _form.updateTime = new Date().getTime();
    setForm(_form);
  };

  useEffect(() => {
    loadPassword();
    return function () {};
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ToolBar
        title={`${route.params?.id ? '编辑' : '新增'}密码`}
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <View style={{height: 1, backgroundColor: '#eee'}} />
      <ScrollView bounces={false} style={{flex: 1}}>
        <View style={{padding: 15}}>
          <Flex horizontal justify="space-between" align="flex-end">
            <Text style={styles.label}>ID</Text>
            <Text style={{color: '#666', fontSize: 16}}>{form.id}</Text>
          </Flex>
          {loadLine()}
          <Flex horizontal justify="space-between" align="flex-end">
            <Text style={styles.label}>标题</Text>
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
          <Flex horizontal justify="space-between" align="flex-end">
            <Text style={styles.label}>账号</Text>
            <TextInput
              placeholder="账号"
              style={{...styles.input, height: undefined}}
              textAlign={'right'}
              multiline
              value={form.name}
              onChangeText={t => updateForm('name', t)}
            />
          </Flex>
          {loadLine()}
          <Flex horizontal justify="space-between" align="flex-end">
            <Text style={styles.label}>密码</Text>
            <TextInput
              placeholder="密码"
              style={{...styles.input, height: undefined}}
              textAlign={'right'}
              multiline
              value={form.password}
              onChangeText={t => updateForm('password', t)}
            />
          </Flex>
          {loadLine()}
          <Flex horizontal justify="space-between" align="flex-end">
            <Text style={styles.label}>描述</Text>
            <TextInput
              placeholder="描述"
              style={{...styles.input, height: undefined}}
              textAlign={'right'}
              multiline
              value={form.message}
              onChangeText={t => updateForm('message', t)}
            />
          </Flex>
          {loadLine()}
          <Flex horizontal justify="space-between" align="flex-end">
            <Text style={styles.label}>链接</Text>
            <TextInput
              placeholder="链接"
              style={{...styles.input, height: undefined}}
              textAlign={'right'}
              multiline
              value={form.link}
              onChangeText={t => updateForm('link', t)}
            />
          </Flex>
          {loadLine()}
          <Flex horizontal justify="space-between" align="flex-end">
            <Text style={styles.label}>平台</Text>
            <Flex style={{gap: 10}} horizontal>
              {Platforms.map((it, i) => (
                <TouchableOpacity
                  key={i}
                  activeOpacity={0.8}
                  onPress={() => {
                    updateForm('platform', it.value);
                  }}>
                  <Flex
                    horizontal
                    style={{
                      ...styles.tag,
                      borderColor: it.value == form.platform ? theme : '#fff',
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: it.value == form.platform ? theme : '#666',
                      }}>
                      {it.label}
                    </Text>
                  </Flex>
                </TouchableOpacity>
              ))}
            </Flex>
          </Flex>
          {loadLine()}
          <Flex horizontal justify="space-between" align="flex-end">
            <Text style={styles.label}>创建时间</Text>
            <Text style={{color: '#333', fontSize: 16}}>
              {moment(form.createTime).format('YYYY-MM-DD HH:mm:ss')}
            </Text>
          </Flex>
          {loadLine()}
          <Flex horizontal justify="space-between" align="flex-end">
            <Text style={styles.label}>修改时间</Text>
            <Text style={{color: '#333', fontSize: 16}}>
              {moment(form.updateTime).fromNow()}
            </Text>
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
          title={'删除'}
          style={{
            borderColor: theme,
            ...styles.deleteButton,
          }}
          textStyle={{color: theme}}
          onPress={onDelete}
        />
        <View style={{width: 16}} />
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
    textAlignVertical: 'center',
  },
  value: {
    fontSize: 14,
    color: '#666',
  },
  deleteButton: {
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
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    marginTop: 5,
  },
  tag: {
    borderRadius: 10,
    height: 32,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 4,
  },
  input: {
    fontSize: 16,
    lineHeight: 16,
    flex: 1,
    padding: 0,
    height: 24,
  },
});

export default EditJira;
