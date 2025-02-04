import React from 'react';
import {StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface MyProps {
  children: React.ReactNode;
  show: boolean;
  onClose: () => void;
  onShow?: () => void;
  onHide?: () => void;
}

const BottomSheet: React.FC<MyProps> = props => {
  const {children, show, onClose, onHide, onShow} = props;

  return (
    <Modal
      animationIn={'fadeInUp'}
      animationOut={'fadeOutDown'}
      // animationInTiming={618}
      // animationOutTiming={618 * 2}
      isVisible={show}
      onBackdropPress={onClose}
      onModalShow={onShow}
      onModalHide={onHide}
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
      statusBarTranslucent={false}
      backdropOpacity={0.58}
      style={{margin: 0, padding: 0, justifyContent: 'flex-end'}}>
      {children}
      <View style={{height: useSafeAreaInsets().bottom}} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  view: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: 'white',
  },
});

export default BottomSheet;
