/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useRef, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {
  Checkbox,
  Dialog,
  Icon,
  Portal,
  Button,
  Text,
  FAB,
} from 'react-native-paper';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import useTodoStore, {Model} from './Store/mystore';

import {BottomSheetModal} from '@gorhom/bottom-sheet';
import BottomSheet from './Component/BottomSheet';
import uuid from 'react-native-uuid';
function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  type ItemProps = {
    item: {
      id: string;
      title: string;
      subTitle: string;
      isChecked: boolean;
    };
  };
  const listTodo = useTodoStore(state => state.listTodo);
  const changeChecked = useTodoStore(state => state.changeChecked);
  const deleteTodo = useTodoStore(state => state.deleteTodo);
  const deleteAllTodo = useTodoStore(state => state.deleteAllTodo);
  const [selected, setSelected] = useState<Model>();
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [isAll, setIsAll] = useState<boolean>(false);
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const openModal = () => {
    bottomSheetRef.current?.present();
    console.log('i am here');
  };

  const Item = (item: ItemProps) => {
    const {id, isChecked, title, subTitle} = item.item;

    return (
      <View style={styles.item}>
        <Checkbox
          status={isChecked ? 'checked' : 'unchecked'}
          onPress={() => {
            changeChecked({id, isChecked, title, subTitle});
            // setChecked(!checked);
          }}
        />
        <View style={styles.rowLayout}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.title}>{subTitle}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            setIsAll(false);
            setSelected({id, isChecked, title, subTitle});
            setShowDialog(true);
          }}>
          <Icon source="trash-can-outline" size={30} color="#900" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <BottomSheet ref={bottomSheetRef} />
      <Portal>
        <Dialog visible={showDialog} onDismiss={() => setShowDialog(false)}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              Are you sure you want to delete {isAll ? 'all' : 'this'} Todo
            </Text>
          </Dialog.Content>

          <Dialog.Actions>
            <Button
              onPress={() => {
                // deleteTodo(selected!)
                return setShowDialog(false);
              }}>
              Cancel
            </Button>
            <Button
              onPress={() => {
                if (isAll) {
                  deleteAllTodo();
                } else {
                  deleteTodo(selected!);
                }

                return setShowDialog(false);
              }}>
              Delete
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={styles.header}>List of things todo</Text>
        <Button
          mode="contained"
          onPress={() => {
            setIsAll(true);
            setShowDialog(true);
          }}
          style={{height: 40, marginRight: 20}}>
          Clear all
        </Button>
      </View>
     {listTodo.length != 0 ?<FlatList
        data={listTodo}
        renderItem={({item}) => <Item item={item} />}
        keyExtractor={item => item.id}
      />:  <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          <Icon source="trash-can-outline" size={30} color="#900" />
        <Text style={styles.title}>App Todos</Text>
        </View>}
      <View style={styles.fabContainer}>
        <FAB icon="plus" style={styles.fab} onPress={() => openModal()} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    flexDirection: 'row',

    padding: 16,
    marginVertical: 8,

    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    color: '#fff',
  },
  rowLayout: {
    flex: 1,
  },
  header: {
    marginTop: 30,
    marginBottom: 20,
    left: 20,
    fontSize: 18,
  },
  fab: {
    justifyContent: 'center',
    alignContent: 'center',
    bottom: 50,
  },
  fabContainer: {
    height: 100,
    width: '100%',

    alignItems: 'center',

    position: 'absolute',
    bottom: 0,
    flex: 1,
  },
});

export default App;
