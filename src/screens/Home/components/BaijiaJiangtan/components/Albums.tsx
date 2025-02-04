import {Button, Flex} from '@src/components';
import {useCaches} from '@src/constants/store';
import {StyleSheet, View} from 'react-native';

interface MyProps {
  onNewPress: () => void;
}

const Albums: React.FC<MyProps> = props => {
  const {onNewPress} = props;
  const {theme} = useCaches();
  return (
    <View>
      <Flex horizontal justify={'space-between'} style={{marginVertical: 10}}>
        <View />
        <Button
          onPress={onNewPress}
          style={{
            ...styles.button,
            backgroundColor: theme,
          }}
          textStyle={{color: '#fff', fontSize: 14}}
          title={'新增专辑'}
        />
      </Flex>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 36,
    marginHorizontal: 15,
    borderRadius: 12,
    paddingHorizontal: 12,
  },
});

export default Albums;
