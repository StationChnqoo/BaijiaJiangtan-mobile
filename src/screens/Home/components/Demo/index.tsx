import {Flex} from '@src/components';
import {BackupJiras, BackupWallet} from '@src/constants/backup';
import {useCaches} from '@src/constants/store';
import {NextService} from '@src/service';
import {useQueryClient} from '@tanstack/react-query';
import {produce} from 'immer';
import {Button, useToast} from 'native-base';
import React, {memo, useRef} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import VideoPlayer, {type VideoPlayerRef} from 'react-native-video-player';

interface MyProps {}

const Demo: React.FC<MyProps> = memo(props => {
  const {} = props;
  const {theme, user} = useCaches();
  const queryClient = useQueryClient();
  const toast = useToast();
  const playerRef = useRef<VideoPlayerRef>(null);

  return (
    <View style={{flex: 1}}>
      <VideoPlayer
        ref={playerRef}
        // endWithThumbnail
        // thumbnail={{
        //   uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
        // }}
        // disableControlsAutoHide
        autoplay={true}
        repeat
        showDuration={true}
        disableFullscreen={Platform.OS == 'android'}
        customStyles={{
          wrapper: {backgroundColor: '#000'},
        }}
        source={{
          uri: 'https://newcntv.qcloudcdn.com/asp/hls/main/0303000a/3/default/2954241d2c084dc05f90b890b53839eb/main.m3u8?maxbr=2048',
        }}
        onError={() => {
          toast.show({description: '播放失败'});
        }}
      />
      <View style={{height: 12}} />
      <Flex style={{gap: 12}} horizontal>
        <Button
          onPress={async () => {
            let datas = [...BackupJiras.data.datas];
            for (let i = 0; i < datas.length; i++) {
              let result = await new NextService().selectUUID();
              toast.show({description: `正在还原: ${result.data}`});
              let item = produce(datas[i], draft => {
                delete draft['_id'];
                // @ts-ignore
                draft.updateTime = new Date().getTime();
                delete draft['userId'];
                draft.id = result.data;
                // @ts-ignore
                draft['people'] = JSON.stringify(draft['people']);
              });
            }
            toast.show({description: `还原完成`});
          }}>
          还原Jira数据
        </Button>
        <Button onPress={async () => {}}>还原Password数据</Button>
        <Button
          onPress={async () => {
            let datas = [...BackupWallet.datas];
            for (let i = 0; i < datas.length; i++) {
              let result = await new NextService().selectUUID();
              toast.show({description: `正在还原: ${result.data}`});
              let item = produce(datas[i], draft => {
                delete draft['_id'];
                draft.updateTime = new Date().getTime();
                draft['total'] = draft.sum;
                delete draft['userId'];
                delete draft['sum'];
                draft.id = result.data;
                // @ts-ignore
                draft['carpooling'] = JSON.stringify(draft['carpooling']);
                // @ts-ignore
                draft['unionpay'] = JSON.stringify(draft['unionpay']);
              });
              await new NextService().mergeProperty(item);
            }
            toast.show({description: `还原完成`});
          }}>
          还原Wallet数据
        </Button>
      </Flex>
    </View>
  );
});

const styles = StyleSheet.create({
  view: {
    // backgroundColor: 'white',
  },
  item: {
    backgroundColor: 'white',
    // marginVertical: 5,
    padding: 12,
  },
  note: {
    color: '#333',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'right',
    flex: 1,
  },
});

export default Demo;
