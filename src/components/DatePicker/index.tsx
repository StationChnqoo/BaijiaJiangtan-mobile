import DateTimePicker from '@react-native-community/datetimepicker';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import BottomSheet from '../BottomSheet';
import Flex from '../Flex';
import Button from '../Button';
import {useCaches} from '@src/constants/store';

interface MyProps {
  value: Date;
  show: boolean;
  onClose: () => void;
  onConfirm: (ms: Date) => void;
}

const DatePicker: React.FC<MyProps> = props => {
  const {value, onConfirm} = props;
  const [ms, setMs] = useState(new Date());
  const {theme} = useCaches();

  return (
    <BottomSheet
      {...props}
      onShow={() => {
        setMs(value);
      }}>
      <View style={styles.view}>
        <DateTimePicker
          locale={'zh-CN'}
          display="spinner"
          value={ms}
          onChange={(event, date) => {
            setMs(date);
          }}
          mode="date"
        />
        <Flex horizontal justify={'flex-end'} style={{gap: 12}}>
          <Button
            title={'今天'}
            onPress={() => {
              setMs(new Date());
            }}
            textStyle={{fontSize: 14, color: theme}}
            style={{...styles.todayButton, borderColor: theme}}
          />
          <Button
            title={'确认'}
            onPress={() => {
              onConfirm(ms);
            }}
            textStyle={{fontSize: 14, color: '#fff'}}
            style={{...styles.saveButton, backgroundColor: theme}}
          />
        </Flex>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  view: {
    margin: 16,
    borderRadius: 16,
    backgroundColor: 'white',
    padding: 15,
  },
  todayButton: {
    borderWidth: 1,
    height: 36,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  saveButton: {
    height: 36,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
});

export default DatePicker;
