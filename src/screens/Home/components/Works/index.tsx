import {useFocusEffect} from '@react-navigation/native';
import {Flex} from '@src/components';
import {useCaches} from '@src/constants/store';
import {Jira} from '@src/constants/t';
import {NextService} from '@src/service';
import {useInfiniteQuery, useQueryClient} from '@tanstack/react-query';
import moment from 'moment';
import {useToast} from 'native-base';
import React, {memo, useCallback} from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface MyProps {
  onJiraPress: (id: string) => void;
}

const Works: React.FC<MyProps> = memo(props => {
  const {onJiraPress} = props;
  const {theme, user} = useCaches();
  const queryClient = useQueryClient();
  const toast = useToast();

  const loadDatas = async (currentPage: number) => {
    let result = await new NextService().selectJiras({
      currentPage,
      pageSize: 10,
    });
    // datas.value = result.data.data;
    return result.data;
  };

  useFocusEffect(
    useCallback(() => {
      jiraQuery.refetch();
      return function () {};
    }, []),
  );

  const jiraQuery = useInfiniteQuery({
    initialPageParam: {currentPage: 1},
    queryKey: ['jiraQuery'],
    retryOnMount: false,
    refetchOnMount: false,
    queryFn: params => loadDatas(params.pageParam.currentPage),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.hasNextPage
        ? {currentPage: lastPage.currentPage + 1}
        : undefined;
    },
  });

  // console.log('worksQuery: ', worksQuery.data.pages.map(it => it.datas).flat() || [])
  const loadItem = (info: ListRenderItemInfo<Jira>) => {
    const {item} = info;
    return (
      <TouchableOpacity
        style={styles.item}
        activeOpacity={0.8}
        onPress={() => {
          onJiraPress(item.id);
          // toast.show({});
        }}>
        <Flex horizontal justify={'space-between'}>
          <Flex horizontal style={{flex: 1}} justify={'flex-start'}>
            <Text style={{fontSize: 14, color: theme}}>版本{item.version}</Text>
            <Text> · </Text>
            <Text
              style={{fontSize: 14, color: '#999', flex: 1}}
              numberOfLines={1}>
              {item.id}
            </Text>
            <View style={{width: 32}} />
            <Text style={{fontSize: 14, color: '#333'}}>
              {moment(item.completeDate).format('YYYY/MM/DD')}
            </Text>
          </Flex>
        </Flex>
        <View
          style={{height: 1, marginVertical: 10, backgroundColor: '#eee'}}
        />
        <Text
          style={{
            fontSize: 16,
            color: '#333',
            fontWeight: '500',
            // textDecorationLine: 'underline',
          }}>
          {item.title}
        </Text>
        <View style={{height: 5}} />
        <Flex horizontal justify="space-between">
          <Text style={{fontSize: 14, color: '#666'}}>{`主要参与: `}</Text>
          <Text style={{color: '#999', fontSize: 14}}>{item.people}</Text>
        </Flex>
        <View style={{height: 10}} />
        <Flex horizontal justify="space-between">
          <Text style={{fontSize: 14, color: '#666'}}>{`备注: `}</Text>
          <Text style={styles.note}>{item.message || '啥也没有 ~'}</Text>
        </Flex>
        <View style={{height: 10}} />
        <Flex horizontal justify="space-between">
          <Text style={{fontSize: 14, color: '#666'}}>{`创建时间: `}</Text>
          <Text style={{color: '#999', fontSize: 14}}>
            {moment(item.createTime).format('YYYY/MM/DD HH:mm:ss')}
          </Text>
        </Flex>
        <View style={{height: 10}} />
        <Flex horizontal justify="space-between">
          <Text style={{fontSize: 14, color: '#666'}}>{`更新时间: `}</Text>
          <Text style={{color: '#999', fontSize: 14}}>
            {moment(item.updateTime).fromNow()}
          </Text>
        </Flex>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={
              jiraQuery.isFetching && jiraQuery.data?.pages?.[0]?.page === 1
            }
            onRefresh={() => {
              queryClient.resetQueries({queryKey: ['jiraQuery']});
              jiraQuery.refetch();
            }}
          />
        }
        ListHeaderComponent={<View style={{height: 1}} />}
        data={jiraQuery.data?.pages.map(it => it.records).flat() || []}
        onEndReached={() => {
          jiraQuery.fetchNextPage();
        }}
        renderItem={loadItem}
        removeClippedSubviews={true}
        keyExtractor={(it, i) => `${it.id}:${i}`}
        onEndReachedThreshold={0.1}
        ItemSeparatorComponent={() => <View style={{height: 4}} />}
        ListFooterComponent={
          <Flex style={{marginVertical: 12}}>
            <Text style={{fontSize: 12, color: '#999'}}>
              {jiraQuery.isFetching ? '加载中' : '到底啦'}
            </Text>
          </Flex>
        }
      />
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

export default Works;
