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
import {Button, DeleteableTags, Flex, MoreButton} from '@src/components';
import InputDialog from '@src/components/InputDialog';
import ToolBar from '@src/components/ToolBar';
import {useCaches} from '@src/constants/store';
import {Property, PropertySchema} from '@src/constants/t';
import {NextService} from '@src/service';
import {produce} from 'immer';
import moment from 'moment';
import {Divider, useToast} from 'native-base';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RootStacksParams, RootStacksProp} from '../Screens';

interface MyProps {
  navigation?: RootStacksProp;
  route?: RouteProp<RootStacksParams, 'EditJira'>;
}

const EditWallet: React.FC<MyProps> = props => {
  const {navigation, route} = props;
  const {theme, setUser} = useCaches();
  const [form, setForm] = useState<Property>(PropertySchema.parse({}));
  const [timePicker, setTimePicker] = useState(false);

  const [inputerDialog, setInputerDialog] = useState({
    title: '提示',
    message: '',
    key: '',
    show: false,
    value: '',
  });
  const maps = {
    wechat: '微信',
    alipay: '支付宝',
    unionpay: '银联',
    cash: '现金',
    carpooling: '顺风车',
    eastmoney: '股票',
    housefund: '公积金',
  };
  const toast = useToast();

  const updateForm = <K extends keyof Property>(key: K, value: Property[K]) => {
    let _form = produce(form, draft => {
      draft[key] = value;
    });
    setForm(_form);
  };

  useEffect(() => {
    const calculateSelectedSum = () => {
      let s: number = Object.keys(maps).reduce((total, key) => {
        const value = form[key];
        if (Array.isArray(value)) {
          // 如果是数组，累加数组内的数值
          return (
            total +
            value.reduce((sum, item) => sum + (parseFloat(item || '0') || 0), 0)
          );
        } else if (!isNaN(value)) {
          // 如果是数字字符串或数字，累加
          return total + parseFloat(value);
        }
        return total; // 非数值跳过
      }, 0);
      return s.toFixed(2);
    };
    setForm(
      produce(form, draft => {
        draft.total = calculateSelectedSum();
      }),
    );
    return function () {};
  }, [form]);

  const onDelete = async () => {
    Alert.alert('提示', '删除后不可恢复，请谨慎操作', [
      {text: '取消', onPress: () => {}},
      {
        text: '确定',
        onPress: async () => {
          const result = await new NextService().deleteProperty(form.id);
          toast.show({description: '删除成功'});
          navigation.goBack();
        },
      },
    ]);
  };

  const deleteTag = (key: string, index: number) => {
    let _form = produce(form, draft => {
      draft[key].splice(index, 1);
    });
    setForm(_form);
  };

  const onSave = async () => {
    let _form = produce(form, draft => {
      // @ts-ignore
      draft.carpooling = JSON.stringify(draft.carpooling);
      // @ts-ignore
      draft.unionpay = JSON.stringify(draft.unionpay);
    });
    await new NextService().mergeProperty(_form);
    toast.show({description: '操作成功'});
    navigation.goBack();
  };

  const loadLine = (n?: string) => <View style={{...styles.line}} />;

  const loadWallet = async () => {
    let _form = JSON.parse(JSON.stringify(form)) as Property;
    if (route.params?.id) {
      let result = await new NextService().selectProperty(route.params.id);
      _form = result.data;
      // @ts-ignore
      _form.unionpay = JSON.parse(_form.unionpay);
      // @ts-ignore
      _form.carpooling = JSON.parse(_form.carpooling);
    } else {
      _form.createTime = new Date().getTime();
      let result = await new NextService().selectUUID();
      _form.id = result.data;
    }
    _form.updateTime = new Date().getTime();
    setForm(_form);
  };

  const closeInputerDialog = () => {
    setInputerDialog(
      produce(inputerDialog, draft => {
        draft.show = false;
      }),
    );
  };

  const onAppend = async (s: string) => {
    let _form = produce(form, draft => {
      draft[inputerDialog.key] = [...draft[inputerDialog.key], s];
    });
    closeInputerDialog();
    setForm(_form);
  };

  useEffect(() => {
    loadWallet();
    return function () {};
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ToolBar
        title={`${route.params?.id ? '编辑' : '新增'}钱包`}
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
          {Object.keys(maps).map((it, i) => (
            <View key={i}>
              {Array.isArray(form[it]) ? (
                <View>
                  <Flex horizontal justify="space-between" align="flex-end">
                    <Text style={styles.label}>{maps[it]}</Text>
                    <MoreButton
                      onPress={() => {
                        setInputerDialog(
                          produce(inputerDialog, draft => {
                            draft.key = it;
                            draft.message = `请输入${maps[it]}`;
                            draft.show = true;
                          }),
                        );
                      }}
                      label={
                        form[it].length > 0
                          ? `已填写${form[it].length}项`
                          : '请填写'
                      }
                    />
                  </Flex>
                  {form[it].length > 0 && (
                    <View style={{marginTop: 5}}>
                      <DeleteableTags
                        datas={form[it]}
                        onDelete={index => {
                          deleteTag(it, index);
                        }}
                      />
                    </View>
                  )}
                </View>
              ) : (
                <Flex horizontal justify="space-between" align="flex-end">
                  <Text style={styles.label}>{maps[it]}</Text>
                  <TextInput
                    placeholder={maps[it] + ' / k'}
                    style={{...styles.input, height: undefined}}
                    textAlign={'right'}
                    multiline
                    value={`${form[it]}`}
                    // @ts-ignore
                    onChangeText={t => updateForm(it, t)}
                  />
                </Flex>
              )}
              {loadLine()}
            </View>
          ))}
          <Flex horizontal justify="space-between" align="flex-end">
            <Text style={styles.label}>创建时间</Text>
            <Text style={{color: '#333', fontSize: 16}}>
              {moment(form.createTime).format('YYYY-MM-DD HH:mm:ss')}
            </Text>
          </Flex>
          {loadLine()}
          <Flex horizontal justify="space-between" align="flex-end">
            <Text style={styles.label}>清算日期</Text>
            <MoreButton
              onPress={() => {
                setTimePicker(true);
              }}
              label={
                form.settleDate
                  ? moment(form.settleDate).format('YYYY年ww周')
                  : '请选择'
              }
            />
          </Flex>
          {loadLine()}
        </View>
      </ScrollView>
      <Divider />
      <Flex
        horizontal
        justify={'space-between'}
        style={{paddingHorizontal: 15, paddingVertical: 10}}>
        <Text style={{color: '#ff5252', fontSize: 18}}>{form.total}K</Text>
        <Flex horizontal justify={'flex-start'}>
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
      </Flex>
      <View
        style={{height: useSafeAreaInsets().bottom, backgroundColor: 'white'}}
      />
      <DateTimePickerModal
        date={new Date(form.settleDate)}
        isVisible={timePicker}
        locale={'zh-CN'}
        mode="date"
        onConfirm={ms => {
          setTimePicker(false);
          updateForm('settleDate', new Date(ms).getTime());
        }}
        onCancel={() => {
          setTimePicker(false);
        }}
        confirmTextIOS={'确认'}
        cancelTextIOS={'取消'}
      />
      <InputDialog
        onClose={closeInputerDialog}
        {...inputerDialog}
        onConfirm={onAppend}
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

export default EditWallet;
