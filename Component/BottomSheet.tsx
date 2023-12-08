import {
  Pressable,
  StyleSheet,
  
  TouchableOpacity,
  View,
} from 'react-native';
import React, {forwardRef, useCallback, useMemo} from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet';
import {Button, Icon, TextInput, Text} from 'react-native-paper';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Controller, useForm} from 'react-hook-form';
import useTodoStore, { Model } from '../Store/mystore';
import uuid from 'react-native-uuid';
type CustomType = {
  title: string;
  subTitle: string;
  iconName: 'location-outline' | 'stopwatch-outline';
};

type FormData = {
  title: string;
  subTitle: string;
};

export type Ref = BottomSheetModal;

const BottomSheet = forwardRef<Ref>((props, ref) => {
  const snapPoints = useMemo(() => ['50%'], []);
  const createTodo = useTodoStore(state => state.createNewTodo);
  const renderBackDrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    [],
  );
  const {dismiss} = useBottomSheetModal();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<FormData>({
    defaultValues: {
      title: '',
      subTitle: '',
    },
  });

  const onSubmit = handleSubmit(data => {
    const id:string = uuid.v4()+'';
    createTodo({id:id, title:data.title, subTitle:data.subTitle}as Model)
    
    dismiss()
    reset()
  });

  return (
    <BottomSheetModal
      overDragResistanceFactor={0}
      backdropComponent={renderBackDrop}
      handleIndicatorStyle={{display: 'none'}}
      backgroundStyle={{backgroundColor: '#000', borderRadius: 0}}
      ref={ref}
      snapPoints={snapPoints}>
      <View style={styles.contentContainer}>
      <Text variant='bodyMedium' style={{color:'#fff', marginBottom:20}}>Please Enter your Todos</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              placeholder="First name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={{ borderRadius: 6}}
            />
          )}
          name="title"
        />
        {errors.title && <Text style={{color:'red'}}>This is required.</Text>}
        <View style={{marginBottom:20}}/>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              placeholder="SubTitle"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={{ borderRadius: 6,}}
            />
          )}
          name="subTitle"
        />
        {errors.subTitle && <Text style={{color:'red', marginBottom:20}}>This is required.</Text>}
        <View style={{marginBottom:20}}/>

        <View style={styles.bottomContainer}>
          <Button
            mode="contained"
            onPress={() => onSubmit()}
            style={{height: 50, position: 'absolute', bottom: 50, justifyContent:'center', alignItems:'center'}}>
            Upload
          </Button>
        </View>
      </View>
    </BottomSheetModal>
  );
});

export default BottomSheet;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  toggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 32,
  },
  toggleActive: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 30,
    height: 30,
    justifyContent: 'center',
    borderRadius: 20,
  },
  toggleInActive: {
    backgroundColor: Colors.white,
    paddingHorizontal: 30,
    height: 30,
    justifyContent: 'center',
    borderRadius: 20,
  },
  activeText: {
    color: Colors.white,
    fontWeight: '700',
  },
  inActiveText: {
    color: Colors.primary,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 4,
    margin: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontWeight: 'bold',
  },

  subHeader: {
    fontSize: 16,
    fontWeight: '600',
    margin: 16,
  },
  items: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingVertical: 20,
    paddingLeft: 15,
    marginHorizontal: 10,
    borderRadius: 10,
    borderColor: Colors.grey,
    borderWidth: 1,
  },
  bottomContainer: {
    flex: 1,
    height: 100,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
