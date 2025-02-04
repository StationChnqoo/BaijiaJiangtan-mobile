import {useFocusEffect} from '@react-navigation/native';
import {Flex} from '@src/components';
import {useCaches} from '@src/constants/store';
import {Password} from '@src/constants/t';
import {NextService} from '@src/service';
import {useInfiniteQuery, useQueryClient} from '@tanstack/react-query';
import moment from 'moment';
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
  onItemPress: (id: string) => void;
}

const Passwords: React.FC<MyProps> = memo(props => {
  const {onItemPress} = props;
  const {theme, user} = useCaches();
  const queryClient = useQueryClient();

  const loadDatas = async (currentPage: number) => {
    let result = await new NextService().selectPasswords({
      currentPage,
      pageSize: 10,
    });
    // datas.value = result.data.data;
    return result.data;
  };

  const passwordsQuery = useInfiniteQuery({
    initialPageParam: {currentPage: 1},
    queryKey: ['passwordsQuery'],
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
      passwordsQuery.refetch();
      return function () {};
    }, []),
  );

  const loadItem = (info: ListRenderItemInfo<Password>) => {
    const {item} = info;
    return (
      <TouchableOpacity
        style={styles.item}
        activeOpacity={0.8}
        onPress={() => {
          onItemPress(item.id);
        }}>
        <Flex horizontal justify={'space-between'}>
          <Flex horizontal>
            <Text>{{app: '📱', web: '🌏'}[item.platform]}</Text>
            <View style={{width: 4}} />
            <Text style={{fontSize: 14, color: '#999'}}>{item.id}</Text>
          </Flex>
          <View style={{width: 32}} />
          <Text style={{fontSize: 14, color: '#666'}}>
            {moment(item.createTime).format('YYYY/MM/DD')}
          </Text>
        </Flex>
        <View
          style={{height: 1, marginVertical: 10, backgroundColor: '#eee'}}
        />
        <Text style={{fontSize: 16, color: '#333'}}>{item.title}</Text>
        <View style={{height: 10}} />
        <Text
          style={{
            fontSize: 14,
            color: '#666',
          }}>
          {`链接: `}
          <Text style={{textDecorationLine: item?.link ? 'underline' : 'none'}}>
            {item.link || '--'}
          </Text>
        </Text>
        <View style={{height: 10}} />
        <Flex justify="space-between" horizontal>
          <Text style={{fontSize: 14, color: '#666'}}>
            {`密码: `}
            <Text style={{color: '#333'}}>
              {item.name} → {item.password}
            </Text>
          </Text>
        </Flex>
        <View style={{height: 10}} />
        <Text style={{fontSize: 14, color: '#666'}}>
          {`备注: `}
          <Text style={{color: '#333'}}>{item.message || '啥也没有 ~'}</Text>
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={
              passwordsQuery.isFetching &&
              passwordsQuery.data?.pages?.[0]?.page === 1
            }
            onRefresh={() => {
              queryClient.resetQueries({queryKey: ['passwordsQuery']});
              passwordsQuery.refetch();
            }}
          />
        }
        ListHeaderComponent={<View style={{height: 1}} />}
        data={passwordsQuery.data?.pages.map(it => it.records).flat() || []}
        onEndReached={() => {
          passwordsQuery.fetchNextPage();
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
});

export default Passwords;
