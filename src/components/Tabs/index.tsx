import {Flex} from '@src/components';
import {useCaches} from '@src/constants/store';
import x from '@src/constants/x';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface MyProps {
  tabs: {label: string; value: string}[];
  tabIndex: number;
  onTabPress: (t: number) => void;
  shadow?: boolean;
  avoidStatusBar?: boolean;
}

const Tabs: React.FC<MyProps> = props => {
  const {tabIndex, onTabPress, tabs, shadow, avoidStatusBar} = props;
  const {theme, user} = useCaches();

  return (
    <View style={{backgroundColor: '#fff', ...(shadow ? x.Styles.CARD : {})}}>
      <View style={{height: avoidStatusBar ? useSafeAreaInsets().top : 0}} />
      <Flex
        style={{gap: 15, paddingHorizontal: 15, height: 52}}
        horizontal
        justify="flex-start">
        {tabs.map((it, i) => (
          <TouchableOpacity
            key={i}
            // style={{flex: 1}}
            activeOpacity={0.9}
            onPress={() => {
              onTabPress(i);
            }}>
            <Flex>
              {/* <Text
                  style={{fontSize: 12, color: tabIndex == i ? theme : '#999'}}>
                  {it.value}
                </Text>
                <View style={{height: 4}} /> */}
              <Text
                style={{
                  fontSize: 16,
                  ...(tabIndex == i
                    ? {color: theme, fontWeight: '500'}
                    : {color: '#666', fontWeight: 'normal'}),
                }}>
                {it.label}
              </Text>
              <View style={{height: 4}} />
              <View
                style={{
                  ...styles.dot,
                  backgroundColor: tabIndex == i ? theme : 'white',
                }}
              />
            </Flex>
          </TouchableOpacity>
        ))}
      </Flex>
    </View>
  );
};

const styles = StyleSheet.create({
  dot: {
    width: 16,
    height: 3,
    borderRadius: 2,
  },
});

export default Tabs;
