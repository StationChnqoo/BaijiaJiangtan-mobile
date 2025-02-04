import {useCaches} from '@src/constants/store';
import {produce} from 'immer';
import React, {memo, useEffect, useState} from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface MyProps {}

const Magics: React.FC<MyProps> = memo(props => {
  const {} = props;
  const {theme, user} = useCaches();
  const initCards = ['筷子', '勺子', '杯子'];
  const [cards, setCards] = useState([...initCards]);
  const [steps, setSteps] = useState([]);
  const [datas, setDatas] = useState([]);
  const init = () => {
    setSteps([]);
    setSteps([{label: '初始状态', value: initCards}]);
  };
  const shuffle = () => {
    setCards(
      produce(cards => {
        for (let i = 0; i < cards.length; i++) {
          let j = Math.floor(Math.random() * cards.length);
          let t = cards[i];
          cards[i] = cards[j];
          cards[j] = t;
        }
        return cards;
      }),
    );
    steps.push([...steps, {label: '洗牌', value: cards}]);
    console.log(cards);
  };

  const swapLeft = (what: string) => {
    setCards(
      produce(cards => {
        let j = cards.findIndex(it => it == what);
        if (j > 0) {
          let t = cards[j];
          cards[j] = cards[j - 1];
          cards[j - 1] = t;
        }
        return cards;
      }),
    );
    setSteps([...steps, {label: `${what}和左边交换`, value: cards}]);
  };

  const swapCup = () => {
    setCards(
      produce(cards => {
        let j = cards.findIndex(it => it == '杯子');
        if (j < 2) {
          let t = cards[j];
          cards[j] = cards[j + 1];
          cards[j + 1] = t;
        }
        return cards;
      }),
    );
    setSteps([...steps, {label: '杯子和右边交换', value: cards}]);
  };
  // console.log('worksQuery: ', worksQuery.data.pages.map(it => it.datas).flat() || [])

  const buildDatas = () => {
    for (let i = 0; i < 10; i++) {
      init();
      shuffle();
      swapLeft('筷子');
      swapCup();
      swapLeft('勺子');
      setSteps([...steps, {label: '最右边的东西', value: cards[2]}]);
      setDatas([...datas, steps]);
    }
  };

  useEffect(() => {
    buildDatas();
    return () => {};
  }, []);

  const loadItem = (info: ListRenderItemInfo<any>) => {
    const {item} = info;
    return (
      <View style={styles.item}>
        {item.steps.map((it, i) => (
          <View key={i}>
            <Text style={{fontSize: 14, color: '#666'}}>
              {`${it.label}: `}
              <Text style={{color: '#333'}}>{it.value}</Text>
            </Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={datas}
        renderItem={loadItem}
        ItemSeparatorComponent={() => <View style={{height: 10}} />}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  view: {
    // backgroundColor: 'white',
    borderRadius: 8,
  },
  item: {
    borderRadius: 8,
    backgroundColor: 'white',
    marginHorizontal: 12,
    // marginVertical: 5,
    padding: 8,
  },
});

export default Magics;
