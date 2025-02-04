import React, {memo, useMemo} from 'react';
import {
  ActivityIndicator,
  processColor,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {useCaches} from '@src/constants/store';
import {Property} from '@src/constants/t';
import x from '@src/constants/x';
import {RootStacksProp} from '@src/screens/Screens';
import {LineChart} from 'react-native-charts-wrapper';
import {produce} from 'immer';
import {BooksTemplates} from '@src/constants/config';
import _ from 'lodash';

interface MyProps {
  navigation?: RootStacksProp;
  datas: Property[];
}

const PropertyChart: React.FC<MyProps> = memo(props => {
  const {navigation, datas} = props;
  const {theme, setUser} = useCaches();

  const buildGroupDatas = (label: string, key: keyof Property) => {
    const colors = _.shuffle(BooksTemplates);
    let r = Math.floor(colors.length * Math.random());
    return {
      label,
      values: datas
        .sort((a, b) => a.settleDate - b.settleDate)
        .map(it => ({
          y:
            typeof it[key] == 'string' && Array.isArray(JSON.parse(it[key]))
              ? JSON.parse(it[key])
                  .map(t => parseFloat(t))
                  .reduce((s, t) => {
                    return s + t;
                  }, 0)
              : it[key],
        })),
      config: {
        color: processColor(colors[r].value),
        circleColor: processColor(colors[r].value),
      },
    };
  };

  return (
    <View style={styles.view}>
      <View style={{height: 12}} />
      <Text style={styles.title}>个人资产净值</Text>
      <View style={{height: 10}} />
      {datas.length == 0 ? (
        <ActivityIndicator color={theme} />
      ) : (
        <LineChart
          dragEnabled={false}
          scaleEnabled={false}
          touchEnabled={false}
          style={{width: '100%', height: x.WIDTH * 0.618}}
          data={{
            dataSets: [
              buildGroupDatas('总资产', 'total'),
              buildGroupDatas('股票', 'eastmoney'),
              buildGroupDatas('银联', 'cash'),
              buildGroupDatas('支付宝', 'alipay'),
            ],
          }}
        />
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  view: {
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});

export default PropertyChart;
