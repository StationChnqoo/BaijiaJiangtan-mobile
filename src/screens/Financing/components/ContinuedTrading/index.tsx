import {ZDView} from '@src/components';
import {CContinuedTradingIndexes} from '@src/constants/config';
import {useCaches} from '@src/constants/store';
import {RealTimePrice} from '@src/constants/t';
import x from '@src/constants/x';
import moment from 'moment';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

interface MyProps {
  datas: RealTimePrice[];
  onPress: (item: RealTimePrice) => void;
}

const ContinuedTrading = (props: MyProps) => {
  const {datas, onPress} = props;
  const {theme, isDidiao} = useCaches();

  // console.log(datas);
  return (
    <View style={{backgroundColor: 'white', paddingVertical: 6}}>
      {datas.length == 0 ? (
        <ActivityIndicator color={theme} />
      ) : (
        datas.map((data, index) => (
          <Animatable.View
            key={index}
            useNativeDriver
            delay={index * 361}
            animation={['slideInLeft', 'slideInRight'][index % 2]}>
            <TouchableOpacity
              key={index}
              style={{paddingHorizontal: 10}}
              activeOpacity={0.8}
              onPress={() => {
                onPress(data);
              }}>
              <ZDView value={data?.f169} style={styles.view}>
                <View style={[x.Styles.rowCenter('space-between')]}>
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                      alignItems: 'center',
                    }}>
                    <Image
                      source={CContinuedTradingIndexes[index].icon}
                      style={{
                        height: x.scale(16),
                        width: x.scale(16),
                        tintColor: theme,
                      }}
                    />
                    <View style={{width: 6}} />
                    <Text
                      style={{
                        fontSize: x.scale(14),
                        color: '#333',
                        flex: 1,
                      }}
                      numberOfLines={1}>
                      {isDidiao
                        ? '=。='
                        : `${CContinuedTradingIndexes[index].label}`}
                    </Text>
                  </View>
                  <View style={{width: 12}} />
                  <View style={x.Styles.rowCenter('flex-start')}>
                    <Text
                      style={{
                        color: x.Colors.STOCK(data?.f169),
                        fontSize: x.scale(14),
                      }}>
                      {(index == datas.length - 1
                        ? 100 / (data?.f60 / 10000)
                        : data?.f60 / Math.pow(10, data.f59)
                      ).toFixed(data.f59)}
                    </Text>
                    <Text style={{color: '#999', marginHorizontal: 2}}>
                      {' '}
                      |{' '}
                    </Text>
                    <Text
                      style={{
                        color: x.Colors.STOCK(data?.f170),
                        fontSize: x.scale(14),
                      }}>
                      {(data?.f170 / 100).toFixed(2)}%
                      {x.Strings.renderUpOrDown(data?.f170)}
                    </Text>
                    <Text style={{color: '#999', marginHorizontal: 2}}>
                      {' '}
                      |{' '}
                    </Text>
                    <Text style={{fontSize: x.scale(12), color: '#999'}}>
                      {moment(data?.f86 * 1000)
                        .fromNow()
                        .replace(' ', '')}
                    </Text>
                  </View>
                </View>
              </ZDView>
            </TouchableOpacity>
          </Animatable.View>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: 'white',
    // borderRadius: 4,
    paddingVertical: x.scale(6),
    paddingHorizontal: 6,
  },
  title: {
    color: '#333',
    fontSize: x.scale(16),
    fontWeight: '500',
    paddingHorizontal: 12,
    paddingVertical: x.scale(6),
  },
});

export default ContinuedTrading;
