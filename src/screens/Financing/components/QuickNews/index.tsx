import {Flex} from '@src/components';
import {useCaches} from '@src/constants/store';
import x from '@src/constants/x';
import moment from 'moment';
import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface Item {
  title: string;
  code: string;
  showTime: string;
  url: string;
  mediaName: string;
  npDst: string;
}
interface MyProps {
  datas: Item[];
}

const QuickNews: React.FC<MyProps> = props => {
  const {datas} = props;
  const {theme} = useCaches();

  return (
    <View style={styles.view}>
      <Text style={{fontSize: x.scale(16), color: '#333', fontWeight: '500'}}>
        7x24快讯
      </Text>
      <View style={{height: 6}} />
      {datas.length == 0 ? (
        <ActivityIndicator color={theme} />
      ) : (
        <View>
          {datas.map((it, i) => (
            <TouchableOpacity key={i} activeOpacity={0.8} onPress={() => {}}>
              <Flex
                justify={'space-between'}
                horizontal
                style={{marginVertical: 4}}>
                <Text
                  style={{flex: 1, color: '#333', fontSize: x.scale(14)}}
                  numberOfLines={1}>
                  {it.title}
                </Text>
                <View style={{width: 12}} />
                <Text style={{color: '#999', fontSize: x.scale(12)}}>
                  {moment(it.showTime).format('HH:mm')}
                </Text>
              </Flex>
            </TouchableOpacity>
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
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  viewCounts: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewProgressBar: {
    height: 4,
    borderRadius: 2,
    marginHorizontal: 2,
  },
  textTitle: {
    fontSize: x.scale(16),
    fontWeight: '500',
    color: '#333',
  },
});

export default QuickNews;
