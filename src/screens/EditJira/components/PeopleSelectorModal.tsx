import {BottomSheet, Button, Flex} from '@src/components';
import {useCaches} from '@src/constants/store';
import x from '@src/constants/x';
import {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface MyProps {
  show: boolean;
  onClose: () => void;
  onHide: () => void;
  onConfirm: (t: string) => void;
}

const PeopleSelectorModal = (props: MyProps) => {
  const {onHide, onConfirm} = props;
  const {theme} = useCaches();
  const [text, setText] = useState('');
  const [names, setNames] = useState<string[]>([]);

  const onShow = async () => {
    setText('');
  };

  useEffect(() => {
    return function () {};
  }, []);

  return (
    <BottomSheet {...props} onShow={onShow}>
      <View
        style={{
          ...styles.views,
        }}>
        <Text style={{color: '#333', fontWeight: '500', fontSize: 16}}>
          请选择参与人员
        </Text>
        <View style={{height: 12}} />
        <TextInput
          style={styles.input}
          placeholder={'请输入参与人员'}
          underlineColorAndroid={'transparent'}
          onChangeText={setText}
          value={text}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{height: 10}} />
          <Flex
            horizontal
            style={{flexWrap: 'wrap', justifyContent: 'flex-start', gap: 10}}>
            {(text ? names.filter(it => it.indexOf(text) >= 0) : names).map(
              it => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  key={it}
                  style={styles.tag}
                  onPress={() => {
                    setText(it);
                  }}>
                  <Text style={{color: '#333', fontSize: 14}}>{it}</Text>
                </TouchableOpacity>
              ),
            )}
          </Flex>
        </ScrollView>
        <Flex horizontal justify={'flex-end'}>
          <Button
            disabled={text.length == 0}
            style={{...styles.saveButton, backgroundColor: theme}}
            textStyle={{color: '#fff'}}
            onPress={() => {
              onConfirm(text);
            }}
            title={'保存'}
          />
        </Flex>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  views: {
    height: x.WIDTH * 0.618,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 16,
    margin: 24,
  },
  saveButton: {
    height: 36,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  input: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    height: 36,
    paddingVertical: 0,
    paddingHorizontal: 5,
    fontSize: 16,
  },
  tag: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
export default PeopleSelectorModal;
