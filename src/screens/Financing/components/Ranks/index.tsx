import {Flex} from '@src/components';
import {useCaches} from '@src/constants/store';
import {RealtimeCount} from '@src/constants/t';
import x from '@src/constants/x';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

interface MyProps {
  diff: any[];
}

const Ranks: React.FC<MyProps> = props => {
  const {diff} = props;
  const {theme} = useCaches();

  useEffect(() => {
    return function () {};
  }, [diff]);

  return (
    <View style={styles.view}>
      {diff.length == 0 ? (
        <ActivityIndicator color={theme} />
      ) : (
        <View style={styles.items}>
          {diff
            .sort((a, b) => Math.abs(b.f3) - Math.abs(a.f3))
            .map((it, i) => (
              <Flex
                key={i}
                style={{
                  ...styles.itemContainer,
                  backgroundColor: x.Colors.hex2Rgba(
                    x.Colors.STOCK(it.f3),
                    Math.abs(
                      it.f3 / Math.max(...diff.map(it => Math.abs(it.f3))),
                    ),
                  ),
                }}>
                <Text
                  style={{
                    fontSize: x.scale(16),
                    color: 'white',
                    fontWeight: '500',
                  }}>
                  {it.f3}%
                </Text>
                <View style={{height: 4}} />
                <Text
                  style={{fontSize: x.scale(12), color: 'white'}}
                  numberOfLines={1}>
                  {it.f14}
                </Text>
              </Flex>
            ))}
        </View>
      )}
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
  items: {
    flexDirection: 'row',
    gap: 4,
    flexWrap: 'wrap',
  },
  itemContainer: {
    paddingVertical: 6,
    paddingHorizontal: 2,
    width: (x.WIDTH - 32 - 12) / 4,
    borderRadius: 4,
    // height: (x.WIDTH - 32) / 5 - 2,
  },
});

export default Ranks;
