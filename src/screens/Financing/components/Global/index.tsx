import {Flex} from '@src/components';
import {useCaches} from '@src/constants/store';
import {RealTimePrice} from '@src/constants/t';
import x from '@src/constants/x';
import moment from 'moment';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

interface MyProps {
  datas: RealTimePrice[];
  onPress: (fd: RealTimePrice) => void;
}

const Global: React.FC<MyProps> = props => {
  const {datas, onPress} = props;
  const {isDidiao, theme} = useCaches();
  const [currentIndex, setCurrentIndex] = useState(0);
  const size = {width: x.WIDTH, height: x.scale(56)};

  return (
    <View
      style={{
        ...size,
        ...styles.view,
      }}>
      {datas.length == 0 ? (
        <Flex style={{flex: 1}}>
          <ActivityIndicator color={theme} />
        </Flex>
      ) : (
        <Carousel
          style={{padding: 0, margin: 0}}
          {...size}
          autoPlay={true}
          scrollAnimationDuration={618}
          autoPlayInterval={618}
          vertical={true}
          data={datas.filter(it => (it?.f57 ? true : false))}
          onSnapToItem={setCurrentIndex}
          snapEnabled={true}
          renderItem={({item, index}) => {
            let stock = datas[index];
            return (
              <TouchableOpacity
                style={styles.stock}
                key={index}
                activeOpacity={x.Touchable.OPACITY}
                onPress={() => {
                  onPress(stock);
                }}>
                <Flex horizontal justify={'flex-start'}>
                  <Text
                    style={{
                      color: '#333',
                      fontWeight: '500',
                      fontSize: x.scale(14),
                    }}>
                    {isDidiao ? '=。=' : `${stock?.f58}`}
                  </Text>
                  <View style={{width: 5}} />
                  <Text style={{color: '#999', fontSize: x.scale(14)}}>
                    [{`${stock.f107}.${stock.f57}`}]
                  </Text>
                </Flex>
                <View style={{height: 4}} />
                <View style={[x.Styles.rowCenter('space-between')]}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{fontSize: x.scale(14), color: '#333'}}>
                      {`${(stock.f43 / Math.pow(10, stock.f59)).toFixed(
                        stock.f59,
                      )}`}
                    </Text>
                    <Text style={{marginHorizontal: 6, color: '#999'}}>|</Text>
                    <Text
                      style={{
                        fontSize: x.scale(14),
                        color: x.Colors.STOCK(stock.f170),
                      }}>
                      {`${(stock.f170 / 100).toFixed(
                        2,
                      )}%${x.Strings.renderUpOrDown(stock.f170)}`}
                    </Text>
                  </View>
                  <Text style={{fontSize: x.scale(12), color: '#999'}}>
                    {moment(stock.f86 * 1000).format('YYYY-MM-DD HH:mm:ss')}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
      <View style={styles.dots}>
        <Text style={{fontSize: x.scale(12), color: 'white'}}>
          {currentIndex + 1}/{datas.length}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    position: 'relative',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  stock: {
    paddingVertical: x.scale(8),
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    // marginTop: 6,
    // borderWidth: 1,
    // borderColor: '#ccc',
    height: x.scale(56),
    justifyContent: 'space-between',
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
  dots: {
    position: 'absolute',
    right: 16,
    top: 4,
    // borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.58)',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: x.scale(5),
    borderBottomLeftRadius: x.scale(5),
    height: x.scale(20),
    width: x.scale(36),
  },
});

export default Global;
