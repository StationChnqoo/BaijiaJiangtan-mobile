import {RealTimePrice} from '@src/constants/t';
import x from '@src/constants/x';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';

interface MyProps {
  datas: RealTimePrice[];
  show: boolean;
  onClosePress: () => void;
}

const ETFDetailModal: React.FC<MyProps> = props => {
  const {datas, show, onClosePress} = props;
  const myColor = (n: number) => {
    let color = n > 0 ? x.Color.RED : n < 0 ? x.Color.GREEN : '#999';
    return color;
  };

  return (
    <Modal
      animationIn={'fadeInUp'}
      // animationOut={'zoomOut'}
      animationInTiming={618}
      animationOutTiming={618}
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
      isVisible={show}
      onBackdropPress={onClosePress}>
      <View style={styles.view}>
        <View style={styles.items}>
          {[...datas]
            .sort((a, b) => a?.f170 - b?.f170)
            .map((it, i) => (
              <View key={i} style={styles.item}>
                <Text style={{fontSize: x.scale(14), color: '#333'}}>
                  {it?.f58}：
                </Text>
                <View style={{width: 4}} />
                <Text style={{fontSize: x.scale(14), color: myColor(it?.f170)}}>
                  {it?.f170 || 0}🥚
                </Text>
              </View>
            ))}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  view: {
    borderRadius: 12,
    backgroundColor: 'white',
    padding: x.scale(12),
  },
  items: {
    // flexDirection: 'row',
    backgroundColor: 'white',
    // flexWrap: 'wrap',
    // justifyContent: 'space-between',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 2,
    marginVertical: 4,
    justifyContent: 'space-between',
  },
});

export default ETFDetailModal;
