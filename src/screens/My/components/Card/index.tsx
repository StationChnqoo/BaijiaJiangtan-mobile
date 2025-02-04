import x from '@src/constants/x';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface MyProps {
  children: React.ReactNode;
  title: string;
  moreView?: React.JSX.Element;
}

const Card: React.FC<MyProps> = props => {
  const [tab, setTab] = useState(0);
  const {children, title, moreView} = props;

  return (
    <View style={styles.view}>
      <View style={x.Styles.rowCenter('space-between')}>
        <Text style={styles.text}>{title}</Text>
        {moreView}
      </View>
      <View style={{height: 4}} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
});

export default Card;
