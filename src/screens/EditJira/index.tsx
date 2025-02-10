import React, {useEffect, useState} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import {RouteProp} from '@react-navigation/native';
import {Button, DeleteableTags, Flex, MoreButton, Star} from '@src/components';
import ToolBar from '@src/components/ToolBar';
import {useCaches} from '@src/constants/store';
import {Jira, JiraSchema} from '@src/constants/t';
import {NextService} from '@src/service';
import {produce} from 'immer';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RootStacksParams, RootStacksProp} from '../Screens';
import PeopleSelectorModal from './components/PeopleSelectorModal';

interface MyProps {
  navigation?: RootStacksProp;
  route?: RouteProp<RootStacksParams, 'EditJira'>;
}

const EditJira: React.FC<MyProps> = props => {
  const {navigation, route} = props;
  const {theme, setUser} = useCaches();
  const [form, setForm] = useState<Jira>(JiraSchema.parse({}));
  const [open, setOpen] = useState(false);
  const [timePicker, setTimePicker] = useState(false);

  const updateForm = <K extends keyof Jira>(key: K, value: Jira[K]) => {
    let _form = produce(form, draft => {
      draft[key] = value;
    });
    setForm(_form);
  };

  const onPeopleAppend = (t: string) => {
    updateForm('people', [...form.people, t]);
    setOpen(false);
  };

  const onPeopleDelete = (index: number) => {
    updateForm(
      'people',
      produce(form.people, draft => {
        draft.splice(index, 1);
      }),
    );
  };

  const onDelete = async () => {
    Alert.alert('提示', '删除后不可恢复，请谨慎操作', [
      {text: '取消', onPress: () => {}},
      {
        text: '确定',
        onPress: async () => {
          navigation.goBack();
        },
      },
    ]);
  };

  const onSave = async () => {
    let jira = produce(form, draft => {
      // @ts-ignore
      draft.people = JSON.stringify(draft.people);
    });
    navigation.goBack();
  };

  const loadLine = () => <View style={styles.line} />;

  const loadJira = async () => {
    let _form = JSON.parse(JSON.stringify(form)) as Jira;
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
    loadJira();
    return function () {};
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ToolBar
        title={`${route.params?.id ? '编辑' : '新增'}Jira`}
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
            <Text style={styles.label}>版本号</Text>
            <TextInput
              placeholder="版本号"
              style={styles.input}
              textAlign={'right'}
              multiline
              value={form.version}
              onChangeText={t => updateForm('version', t)}
            />
          </Flex>
          {loadLine()}
          <Flex horizontal justify="space-between" align="flex-end">
            <Text style={styles.label}>复杂度</Text>
            <Star
              value={form?.complexity}
              onPress={t => {
                updateForm('complexity', t);
              }}
            />
          </Flex>
          {loadLine()}
          <Flex horizontal justify="space-between" align="flex-end">
            <Text style={styles.label}>Jira简介</Text>
            <TextInput
              placeholder="Jira简介"
              style={{...styles.input, height: undefined}}
              textAlign={'right'}
              multiline
              value={form.title}
              onChangeText={t => updateForm('title', t)}
            />
          </Flex>
          {loadLine()}
          <Flex horizontal justify="space-between" align="flex-end">
            <Text style={styles.label}>Jira备注</Text>
            <TextInput
              placeholder="Jira备注"
              style={{...styles.input, height: undefined}}
              textAlign={'right'}
              multiline
              value={form.message}
              onChangeText={t => updateForm('message', t)}
            />
          </Flex>
          {loadLine()}
          <Flex horizontal justify="space-between" align="flex-end">
            <Text style={styles.label}>完成日期</Text>
            <MoreButton
              onPress={() => {
                setTimePicker(true);
              }}
              label={
                form.completeDate
                  ? moment(form.completeDate).format('YYYY/MM/DD')
                  : '请选择'
              }
            />
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
          <Flex horizontal justify="space-between" align="flex-end">
            <Text style={styles.label}>参与人员</Text>
            <MoreButton
              onPress={() => {
                setOpen(true);
              }}
              label={
                form.people.length > 0
                  ? `已选${form.people.length}人`
                  : '请选择'
              }
            />
          </Flex>
          <View style={{height: 5}} />
          <DeleteableTags
            datas={form.people}
            onDelete={index => {
              onPeopleDelete(index);
            }}
          />
        </View>
      </ScrollView>
      <View style={{height: 1, backgroundColor: '#ccc'}} />
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
      <PeopleSelectorModal
        show={open}
        onClose={() => {
          setOpen(false);
        }}
        onHide={() => {}}
        onConfirm={onPeopleAppend}
      />
      <DateTimePickerModal
        date={new Date(form.completeDate)}
        isVisible={timePicker}
        locale={'zh-CN'}
        mode="date"
        onConfirm={ms => {
          setTimePicker(false);
          updateForm('completeDate', new Date(ms).getTime());
        }}
        onCancel={() => {
          setTimePicker(false);
        }}
        confirmTextIOS={'确认'}
        cancelTextIOS={'取消'}
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
  input: {
    fontSize: 16,
    lineHeight: 16,
    flex: 1,
    padding: 0,
    height: 24,
  },
});

export default EditJira;
