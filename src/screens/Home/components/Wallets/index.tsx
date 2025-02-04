import {useFocusEffect} from '@react-navigation/native';
import {Flex} from '@src/components';
import {useCaches} from '@src/constants/store';
import {PaginationProps, Property} from '@src/constants/t';
import WalletService from '@src/service/WalletService';
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {produce} from 'immer';
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
import PropertyChart from './components/PropertyChart';
import {NextService} from '@src/service';

interface MyProps {
  onItemPress: (id: string) => void;
}

const Wallets: React.FC<MyProps> = memo(props => {
  const {onItemPress} = props;
  const {theme, user, token} = useCaches();
  const queryClient = useQueryClient();

  const loadDatas = async (params: PaginationProps) => {
    let result = await new NextService().selectProperties(params);
    return result.data;
  };

  const propertiesQuery = useInfiniteQuery({
    initialPageParam: {currentPage: 1},
    queryKey: ['propertiesQuery'],
    retryOnMount: false,
    refetchOnMount: false,
    queryFn: params =>
      loadDatas({currentPage: params.pageParam.currentPage, pageSize: 10}),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.hasNextPage
        ? {currentPage: lastPage.currentPage + 1, pageSize: 10}
        : undefined;
    },
  });

  const propertyQuery = useQuery({
    queryKey: ['propertyQuery'],
    enabled: token ? true : false,
    queryFn: () =>
      new NextService().selectProperties({currentPage: 1, pageSize: 52}),
  });

  useFocusEffect(
    useCallback(() => {
      propertiesQuery.refetch();
      propertyQuery.refetch();
      return function () {};
    }, []),
  );

  const loadItem = (info: ListRenderItemInfo<Property>) => {
    const {item} = info;
    const maps = {
      wechat: '微信',
      alipay: '支付宝',
      unionpay: '银联',
      cash: '现金',
      carpooling: '顺风车',
      eastmoney: '股票',
      housefund: '公积金',
    };
    return (
      <TouchableOpacity
        style={styles.item}
        activeOpacity={0.8}
        onPress={() => {
          onItemPress(item.id);
        }}>
        <Flex horizontal justify={'space-between'}>
          <Flex horizontal>
            <Text style={{fontSize: 16, color: '#333'}}>
              {moment(item.settleDate).format('YYYY年ww周').replace(' ', '')}
            </Text>
            {/* <Text style={{fontSize: 14, color: '#999'}}>{item.id}</Text> */}
          </Flex>
          <Text style={{color: theme, fontSize: 16}}>
            {parseFloat(item.total).toFixed(2)}K
          </Text>
        </Flex>
        <View
          style={{height: 1, marginVertical: 10, backgroundColor: '#eee'}}
        />
        <Flex
          horizontal
          style={{flexWrap: 'wrap', gap: 10}}
          justify={'flex-start'}>
          {Object.keys(maps).map((it, i) => (
            <Flex horizontal justify="flex-start" key={i}>
              <Text
                style={{fontSize: 14, color: '#333'}}>{`${maps[it]}: `}</Text>
              <Text style={{fontSize: 14, color: '#999'}}>{`${
                Array.isArray(item[it])
                  ? `[${item[it].map(t => `${t}K`).join(' , ')}]`
                  : `${item[it]}K`
              }`}</Text>
            </Flex>
          ))}
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
              propertiesQuery.isFetching &&
              propertiesQuery.data?.pages?.[0]?.page === 1
            }
            onRefresh={() => {
              queryClient.resetQueries({queryKey: ['propertiesQuery']});
              propertyQuery.refetch();
              propertiesQuery.refetch();
            }}
          />
        }
        ListHeaderComponent={
          <PropertyChart datas={propertyQuery.data?.data?.records || []} />
        }
        data={propertiesQuery.data?.pages.map(it => it.records).flat() || []}
        onEndReached={() => {
          propertiesQuery.fetchNextPage();
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

export default Wallets;
