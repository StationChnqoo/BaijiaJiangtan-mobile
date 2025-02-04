import {useCaches} from '@src/constants/store';
import {useQueryClient} from '@tanstack/react-query';
import {useToast} from 'native-base';
import React, {memo, useMemo, useRef, useState} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import VideoPlayer, {type VideoPlayerRef} from 'react-native-video-player';
import Tabs from '../Tabs';
import Albums from './components/Albums';
import Scholars from './components/Scholars';
import Videos from './components/Videos';

interface MyProps {
  onNewPress: () => void;
}

const BaijiaJiangtan: React.FC<MyProps> = memo(props => {
  const {onNewPress} = props;
  const {theme, user} = useCaches();
  const queryClient = useQueryClient();
  const toast = useToast();
  const playerRef = useRef<VideoPlayerRef>(null);
  const [tabIndex, setIndex] = useState(0);

  const tabs = useMemo(
    () => [
      {
        label: '专辑',
        value: 'albums',
        component: <Albums key="albums" onNewPress={onNewPress} />,
      },
      {
        label: '学者',
        value: 'scholars',
        component: <Scholars key="passwords" />,
      },
      {
        label: '原始数据',
        value: 'wallet',
        component: <Videos key="videos" />,
      },
    ],
    [],
  );

  return (
    <View style={{flex: 1}}>
      <Tabs tabs={tabs} onTabPress={setIndex} tabIndex={tabIndex} />
      <View style={{flex: 1}}>
        {tabs.map((it, i) => (
          <View
            key={i}
            style={{display: i == tabIndex ? 'flex' : 'none', flex: 1}}>
            {tabs[i].component}
          </View>
        ))}
      </View>
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

export default BaijiaJiangtan;
