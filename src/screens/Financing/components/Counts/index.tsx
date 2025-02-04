import {RealtimeCount} from '@src/constants/t';
import x from '@src/constants/x';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface MyProps {
  diff: RealtimeCount[];
}

const Counts: React.FC<MyProps> = props => {
  const {diff} = props;
  const [datas, setDatas] = useState(Array(3).fill(1));
  const [sum, setSum] = useState(1);

  useEffect(() => {
    if (diff.length > 0) {
      let _datas = [
        diff[0].f104 + diff[1].f104,
        diff[0].f105 + diff[1].f105,
        diff[0].f106 + diff[1].f106,
      ];
      setDatas(_datas);
      setSum(_datas.reduce((count, it) => count + it) || 1);
    }
    return function () {};
  }, [diff]);

  const myPercent = (n: number) => n / sum;

  return (
    <View style={styles.view}>
      <Text style={{fontSize: x.scale(16), fontWeight: '500', color: '#333'}}>
        A股市场
      </Text>
      <View style={{height: 6}} />
      <View style={styles.viewCounts}>
        {datas.map((it, index) => (
          <Text
            key={index}
            style={{
              fontSize: x.scale(14),
              color: [x.Color.RED, x.Color.GREEN, '#999'][index],
            }}>{`${it}家${['↑', '↓', ''][index]} ${myPercent(it * 100).toFixed(
            2,
          )}%`}</Text>
        ))}
      </View>
      <View style={{height: 10}} />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {datas.map((it, index) => (
          <View
            key={index}
            style={[
              styles.viewProgressBar,
              {
                backgroundColor: [x.Color.RED, x.Color.GREEN, '#999'][index],
                flex: myPercent(it),
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: 'white',
    // borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  viewCounts: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewProgressBar: {
    height: 6,
    borderRadius: 3,
    marginHorizontal: 2,
  },
});

export default Counts;
