import React, {useCallback, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import {useFocusEffect} from '@react-navigation/native';
import {CContinuedTradingIndexes} from '@src/constants/config';
import {useCaches} from '@src/constants/store';
import {RealTimePrice} from '@src/constants/t';
import x from '@src/constants/x';
import {DfcfService} from '@src/service';
import {useQueries, useQuery} from '@tanstack/react-query';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RootStacksProp} from '../Screens';
import Care from './components/Care';
import ContinuedTrading from './components/ContinuedTrading';
import Counts from './components/Counts';
import ETF from './components/ETF';
import Global from './components/Global';
import QuickNews from './components/QuickNews';
import Ranks from './components/Ranks';

interface MyProps {
  navigation?: RootStacksProp;
}

const Financing: React.FC<MyProps> = props => {
  const {navigation} = props;
  const {cared, global} = useCaches();
  const [focused, setFocused] = useState(false);
  const [views, setViews] = useState([]);

  useFocusEffect(
    useCallback(() => {
      setFocused(true);

      // console.log(`SHA256: ${SHA256('666666')}`);
      return function () {
        setFocused(false);
      };
    }, []),
  );

  const countsQuery = useQuery({
    enabled: focused,
    queryKey: ['countsQuery'],
    queryFn: () => new DfcfService().selectDfcfFundCounts(),
    refetchInterval: 10000,
  });

  const quickNewsQuery = useQuery({
    enabled: focused,
    queryKey: ['quickNewsQuery'],
    queryFn: () => new DfcfService().selectQuickNews(),
    refetchInterval: 10000,
  });

  const etfQuery = useQueries({
    queries: [
      '0.159649', // 国开债ETF
      '0.159972', // 5年地债ETF
      '1.511010', // 国债ETF
      '1.511020', // 活跃国债ETF
      '1.511030', // 公司债ETF
      '1.511060', // 5年地方债ETF
      '1.511090', // 30年国债ETF
      '1.511100', // 基准国债ETF
      '1.511220', // 城投债ETF
      '1.511260', // 十年国债ETF
      '1.511270', // 十年地方债ETF
      '1.511130', // 30年国债指数ETF
    ].map(it => ({
      queryKey: ['etfQuery', it],
      queryFn: () => new DfcfService().selectRealtimePrice(it),
      enabled: focused,
      refetchInterval: 10000,
      placeholderData: {data: {datas: []}},
    })),
  });

  const continuedQueries = useQueries<RealTimePrice[]>({
    queries: CContinuedTradingIndexes.map(it => ({
      queryKey: ['continuedQueries', it.value],
      enabled: focused,
      refetchInterval: 10000,
      queryFn: () => new DfcfService().selectRealtimePrice(it.value),
    })),
  });

  const caredQueries = useQueries<RealTimePrice[]>({
    queries: cared.map(it => ({
      enabled: focused,
      queryKey: ['caredQuery', it],
      refetchInterval: 10000,
      queryFn: () => new DfcfService().selectRealtimePrice(it),
    })),
  });

  const globalQueries = useQueries<RealTimePrice[]>({
    queries: global.map(it => ({
      enabled: focused,
      queryKey: ['globalQueries', it],
      refetchInterval: 10000,
      queryFn: () => new DfcfService().selectRealtimePrice(it),
    })),
  });

  // const ranksQuery = useQuery({
  //   enabled: focused,
  //   queryKey: ['fundRanksQuery'],
  //   queryFn: () => new DfcfService().selectFundRanks(),
  //   refetchInterval: 10000,
  //   placeholderData: {data: {diff: []}},
  // });

  // console.log('ranksQuery: ', ranksQuery.data.data.diff);
  const toStockDetail = (code: string) => {
    navigation.navigate('Webviewer', {
      title: code,
      url: x.Links.stockDetail(code),
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#f0f0f0', position: 'relative'}}>
      <View
        style={{height: useSafeAreaInsets().top, backgroundColor: '#fff'}}
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic" bounces={false}>
        <View style={{}}>
          <View style={{height: 1}} />
          {[
            <Counts diff={countsQuery.data?.data?.diff || []} />,
            <ETF
              datas={etfQuery
                .filter(it => it.isFetched)
                .map(it => it.data?.data)}
            />,
            <Global
              datas={globalQueries
                .filter(it => it.isFetched)
                .map(it => it.data.data)}
              onPress={fd => toStockDetail(`${fd.f107}.${fd.f57}`)}
            />,
            <ContinuedTrading
              datas={continuedQueries
                .filter(it => it.isFetched)
                .map(it => it.data?.data)}
              onPress={fd => toStockDetail(`${fd.f107}.${fd.f57}`)}
            />,
            <Care
              datas={caredQueries
                .filter(it => it.isFetched)
                .map(it => it.data.data)}
              onPress={fd => toStockDetail(`${fd.f107}.${fd.f57}`)}
            />,
            // <Ranks diff={ranksQuery.data.data.diff} />,
            <QuickNews datas={quickNewsQuery.data?.data || []} />,
          ].map((it, i) => (
            <View key={i} style={{marginVertical: 1}}>
              {it}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Financing;
