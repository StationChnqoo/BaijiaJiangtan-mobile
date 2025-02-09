import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {useFocusEffect} from '@react-navigation/native';
import {Flex, Tabs} from '@src/components';
import {useCaches} from '@src/constants/store';
import {Chapter} from '@src/constants/t';
import x from '@src/constants/x';
import {NextService} from '@src/service';
import {useInfiniteQuery, useQueryClient} from '@tanstack/react-query';
import {produce} from 'immer';
import FastImage from 'react-native-fast-image';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RootStacksProp} from '../Screens';
import moment from 'moment';

interface MyProps {
  navigation?: RootStacksProp;
}

const Datas: React.FC<MyProps> = props => {
  const {navigation} = props;
  const {theme, setUser, user} = useCaches();
  const [focused, setFocused] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const queryClient = useQueryClient();

  const [tabs, setTabs] = useState(
    ['未处理', '已放弃', '往后放', '已完成'].map((it, i) => ({
      value: '--',
      label: it,
      id: `${i}`,
    })),
  );

  const loadStatusCount = async () => {
    let result = await new NextService().chapterStatusCount();
    setTabs(
      produce(tabs, draft => {
        Object.keys(result.data).map(key => {
          // console.log(key, result.data[key])
          draft[parseInt(key)].value = result.data[key];
        });
      }),
    );
  };

  const loadDatas = async (currentPage: number) => {
    let result = await new NextService().selectChaptersByStatus({
      status: tabs[tabIndex].id,
      currentPage,
      pageSize: 10,
    });
    // datas.value = result.data.data;
    return result.data;
  };

  const chaptersQuery = useInfiniteQuery({
    initialPageParam: {currentPage: 1},
    queryKey: ['chaptersQuery', tabIndex],
    retryOnMount: false,
    refetchOnMount: false,
    queryFn: params => loadDatas(params.pageParam.currentPage),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.hasNextPage
        ? {currentPage: lastPage.currentPage + 1}
        : undefined;
    },
  });

  useFocusEffect(
    useCallback(() => {
      setFocused(true);
      // console.log(`SHA256: ${SHA256('666666')}`);
      return function () {
        setFocused(false);
      };
    }, []),
  );

  useEffect(() => {
    loadStatusCount();
    queryClient.resetQueries({queryKey: ['chaptersQuery']});
    chaptersQuery.refetch();
    return function () {};
  }, [focused]);

  const loadItem = (info: ListRenderItemInfo<Chapter>) => {
    const {item} = info;
    return (
      <TouchableOpacity
        style={styles.item}
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate('EditChapter', {id: item.id});
        }}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={{height: 10}} />
        <Flex justify="space-between" horizontal>
          <FastImage
            source={{uri: item.cover}}
            style={{width: 80, height: 45, borderRadius: 5}}
          />
          <View style={{width: 10}} />
          <View style={{flex: 1, height: 45}}>
            <Text
              style={{fontSize: 12, color: '#666', lineHeight: 15}}
              numberOfLines={3}>
              {item.brief}
            </Text>
          </View>
        </Flex>
        <View style={{height: 10}} />
        <Flex horizontal justify="space-between">
          <Text style={{color: '#666', fontSize: 14}}>
            {moment(item.updateTime).fromNow().replace(' ', '')}更新
          </Text>
          <Text style={{color: '#666', fontSize: 14}}>
            {`${moment(item.createTime).format('YYYY-MM-DD HH:mm')} 创建`}
          </Text>
        </Flex>
        <View style={{height: 2}} />
        <Flex horizontal justify="space-between">
          <Text style={{color: '#999', fontSize: 14}} numberOfLines={1}>
            {`Id: ${item.id || '--'}`}
          </Text>
          <View style={{width: 24}} />
          <Text
            style={{color: '#999', fontSize: 14, flex: 1}}
            numberOfLines={1}>
            {`Series: ${item.seriesId || '--'}`}
          </Text>
        </Flex>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#f0f0f0'}}>
      <View
        style={{height: useSafeAreaInsets().top, backgroundColor: '#fff'}}
      />
      <View style={{backgroundColor: '#fff', ...x.Styles.CARD}}>
        <Tabs tabs={tabs} onTabPress={setTabIndex} tabIndex={tabIndex} />
        <View style={{paddingHorizontal: 15}}>
          <Text style={{fontSize: 14, color: '#999'}}>
            {tabs.map(it => `${it.label}/${it.value}`).join(' | ')}
          </Text>
          <View style={{height: 5}} />
        </View>
      </View>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={
              chaptersQuery.isFetching &&
              chaptersQuery.data?.pages?.[0]?.page === 1
            }
            onRefresh={() => {
              queryClient.resetQueries({queryKey: ['chaptersQuery']});
              chaptersQuery.refetch();
            }}
          />
        }
        ListHeaderComponent={<View style={{height: 1}} />}
        data={chaptersQuery.data?.pages.map(it => it.records).flat() || []}
        onEndReached={() => {
          chaptersQuery.fetchNextPage();
        }}
        renderItem={loadItem}
        keyExtractor={(it, i) => `${it.id}:${i}`}
        onEndReachedThreshold={0.1}
        removeClippedSubviews={true}
        ItemSeparatorComponent={() => <View style={{height: 4}} />}
        ListFooterComponent={
          <Flex style={{marginVertical: 12}}>
            <Text style={{fontSize: 12, color: '#999'}}>滑动到底了</Text>
          </Flex>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    position: 'relative',
    // height: x.scale(64),
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  title: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22,
  },
});

export default Datas;
