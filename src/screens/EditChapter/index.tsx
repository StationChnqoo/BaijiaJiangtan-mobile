import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';

import {RouteProp} from '@react-navigation/native';
import {Button, Flex, MoreButton} from '@src/components';
import ToolBar from '@src/components/ToolBar';
import {useCaches} from '@src/constants/store';
import {Chapter, ChapterSchema} from '@src/constants/t';
import x from '@src/constants/x';
import {NextService} from '@src/service';
import {produce} from 'immer';
import moment from 'moment';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Video from 'react-native-video';
import {RootStacksParams, RootStacksProp} from '../Screens';
import FastImage from 'react-native-fast-image';
import VideoPlayer, {type VideoPlayerRef} from 'react-native-video-player';

interface MyProps {
  navigation?: RootStacksProp;
  route?: RouteProp<RootStacksParams, 'EditJira'>;
}

const EditChapter: React.FC<MyProps> = props => {
  const {navigation, route} = props;
  const {theme, setUser, selectedSeries} = useCaches();
  const [form, setForm] = useState<Chapter>(ChapterSchema.parse({}));
  const [series, setSeries] = useState();
  const playerRef = useRef<VideoPlayerRef>(null);

  const updateForm = <K extends keyof Chapter>(key: K, value: Chapter[K]) => {
    let _form = produce(form, draft => {
      draft[key] = value;
    });
    setForm(_form);
  };

  const onSave = async () => {
    await new NextService().mergeChapter(form);
    navigation.goBack();
  };

  const loadLine = (n?: string) => <View style={{...styles.line}} />;

  const loadDetail = async () => {
    let _form = JSON.parse(JSON.stringify(form)) as Chapter;
    if (route.params?.id) {
      let result = await new NextService().selectChapter(route.params.id);
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
    loadDetail();
    return function () {};
  }, []);

  useEffect(() => {
    updateForm('seriesId', selectedSeries.id);
    return function () {};
  }, [selectedSeries]);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ToolBar
        title={'编辑章节'}
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <View style={{height: 1, backgroundColor: '#eee'}} />
      <ScrollView bounces={false} style={{flex: 1}}>
        {form.m3u8 ? (
          <VideoPlayer
            ref={playerRef}
            // disableControlsAutoHide
            autoplay={true}
            showDuration={true}
            disableFullscreen={Platform.OS == 'android'}
            customStyles={{
              wrapper: {
                backgroundColor: '#000',
                height: (x.WIDTH * 9) / 16,
                width: x.WIDTH,
              },
              videoWrapper: {},
            }}
            source={{
              // uri: 'https://newcntv.qcloudcdn.com/asp/hls/main/0303000a/3/default/2954241d2c084dc05f90b890b53839eb/main.m3u8?maxbr=2048',
              uri: form.m3u8,
            }}
            onError={() => {}}
          />
        ) : (
          <ActivityIndicator size={32} />
        )}

        <View style={{padding: 15}}>
          <Flex horizontal justify="space-between">
            <Text style={styles.label}>ID</Text>
            <Text style={{color: '#666', fontSize: 14}}>{form.id}</Text>
          </Flex>
          <Flex horizontal justify="space-between">
            <Text style={styles.label}>CCTV-GUID</Text>
            <Text style={{color: '#666', fontSize: 14}}>
              {form.cctvGuid || '--'}
            </Text>
          </Flex>
          <Flex horizontal justify="space-between">
            <Text style={styles.label}>CCTV-ID</Text>
            <Text style={{color: '#666', fontSize: 14}}>
              {form.cctvId || '--'}
            </Text>
          </Flex>
          <Flex horizontal justify="space-between">
            <Text style={styles.label}>时长</Text>
            <Text style={{color: '#666', fontSize: 14}}>{form.duration}</Text>
          </Flex>
          <Flex horizontal justify="space-between">
            <Text style={styles.label}>上映时间</Text>
            <Text style={{color: '#666', fontSize: 14}}>
              {moment(form.focusTime).format('YYYY-MM-DD HH:mm:ss')}
            </Text>
          </Flex>
          <Flex horizontal justify="space-between">
            <Text style={styles.label}>修改时间</Text>
            <Text style={{color: '#666', fontSize: 14}}>
              {moment(form.updateTime).fromNow().replace(' ', '')}
            </Text>
          </Flex>
          <Flex horizontal justify="space-between">
            <Text style={styles.label}>添加时间</Text>
            <Text style={{color: '#666', fontSize: 14}}>
              {moment(form.createTime).format('YYYY-MM-DD HH:mm:ss')}
            </Text>
          </Flex>
          {loadLine()}
          <View>
            <Flex horizontal justify="space-between">
              <Text style={styles.label}>系列</Text>
              <MoreButton
                label={form.seriesId || '请选择'}
                onPress={() => {
                  navigation.navigate('SelectSeries');
                }}
              />
            </Flex>
            {form.seriesId ? (
              <Text style={{color: '#999', marginTop: 5, fontSize: 12}}>
                {JSON.stringify(selectedSeries)}
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
          <Flex horizontal justify="space-between" align="flex-end">
            <Text style={styles.label}>备注</Text>
            <View style={{width: 24}} />
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
            <FastImage source={{uri: form.cover}} style={styles.cover} />
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
          <Flex horizontal justify="space-between">
            <Text style={styles.label}>剧情</Text>
            <View style={{width: 12}} />
            <TextInput
              placeholder="剧情"
              style={{...styles.input, height: undefined}}
              textAlign={'right'}
              multiline
              value={form.brief}
              onChangeText={t => updateForm('brief', t)}
            />
          </Flex>
          {loadLine()}
          <Flex horizontal justify="space-between" align="flex-end">
            <Text style={styles.label}>链接</Text>
            <View style={{width: 12}} />
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
          <Flex horizontal justify="space-between">
            <Text style={styles.label}>状态</Text>
            <View style={{width: 12}} />
            <Flex style={{gap: 10}} horizontal>
              {['未处理', '已放弃', '往后放', '已完成'].map((it, i) => (
                <TouchableOpacity
                  key={i}
                  activeOpacity={0.8}
                  style={{
                    ...styles.tag,
                    borderColor: form.status == i ? theme : '#999',
                  }}
                  onPress={() => {
                    updateForm('status', i);
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: form.status == i ? theme : '#999',
                    }}>
                    {it}
                  </Text>
                </TouchableOpacity>
              ))}
            </Flex>
          </Flex>
        </View>
      </ScrollView>
      <View style={{height: 1, backgroundColor: '#ccc'}} />
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
    textAlignVertical: 'center',
    fontWeight: '500',
  },
  value: {
    fontSize: 14,
    color: '#666',
  },
  playButton: {
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
    marginVertical: 12,
  },
  cover: {
    width: 96,
    height: 54,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#999',
  },
  input: {
    fontSize: 16,
    lineHeight: 20,
    flex: 1,
    padding: 0,
    height: 24,
    color: '#333',
  },
  tag: {
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
});

export default EditChapter;
