import {BottomSheet, Button, Flex} from '@src/components';
import {useCaches} from '@src/constants/store';
import x from '@src/constants/x';
import {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface MyProps {
  show: boolean;
  onClose: () => void;
  onHide: () => void;
  onConfirm: (index: number) => void;
}

const NewModal = (props: MyProps) => {
  const {show, onClose, onHide, onConfirm} = props;
  const {theme} = useCaches();

  const menus = [
    {icon: require('./assets/jira.png'), label: 'Jira'},
    {icon: require('./assets/lock.png'), label: '密码'},
    {icon: require('./assets/wallet.png'), label: '钱包'},
    {icon: require('./assets/mark.png'), label: '记事'},
  ];
  const [index, setIndex] = useState(0);

  return (
    <BottomSheet {...props}>
      <View
        style={{
          ...styles.view,
          // marginBottom: Platform.select({
          //   ios: useSafeAreaInsets().bottom,
          //   android: 16,
          // }),
        }}>
        <Text style={{color: '#333', fontSize: x.scale(16), fontWeight: '500'}}>
          请选择
        </Text>
        <View style={{height: 12}} />
        <Flex horizontal style={{gap: 12}}>
          {menus.map((it, i) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setIndex(i);
              }}
              key={i}
              style={{
                ...styles.botton,
                borderColor: index == i ? theme : '#ccc',
              }}>
              <Image
                style={{
                  height: x.scale(18),
                  width: x.scale(18),
                  tintColor: index == i ? theme : '#666',
                }}
                source={it.icon}
              />
              <View style={{width: 6}} />
              <Text
                style={{
                  fontSize: x.scale(12),
                  color: i == index ? theme : '#999',
                }}>
                {it.label}
              </Text>
            </TouchableOpacity>
          ))}
        </Flex>
        <View style={{height: 24}} />
        <Flex justify={'flex-end'} horizontal>
          <Button
            style={{
              height: x.scale(32),
              backgroundColor: theme,
              borderRadius: 15,
              paddingHorizontal: 12,
            }}
            textStyle={{fontSize: x.scale(14), color: '#fff'}}
            title={'下一步'}
            onPress={() => {
              onConfirm(index);
            }}
          />
        </Flex>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 15,
    margin: 24,
  },
  botton: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 10,
    borderColor: '#ccc',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
});
export default NewModal;
