import {create} from 'zustand';

import { persist, createJSONStorage } from 'zustand/middleware'
import zustandStorage from './mmkvStorage';
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Love',
    subTitle: 'i am supposed to go to the market today',
    isChecked: false,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Market',
    subTitle: 'He is here on my side, that y i am happy',
    isChecked: false,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Lord help',
    subTitle: 'Please help me through the season',
    isChecked: true,
  },
];
export type Model = {
  id: string;
  title: string;
  subTitle: string;
  isChecked: boolean;
};

interface TodoState {
  listTodo: Array<Model>;
  createNewTodo: (model: Model) => void;
  changeChecked: (model: Model) => void;
  deleteTodo: (model: Model) => void;
  deleteAllTodo: () => void;
}
const useTodoStore = create<TodoState>()(persist((set, get) => ({
  listTodo: [],
  createNewTodo: model =>
    set(state => ({listTodo: [...state.listTodo, model]})),
  deleteAllTodo: () => set(state => ({listTodo: []})),
  changeChecked: model =>
    set(state => {
      const newList = state.listTodo.map(e => {
        if (model.id === e.id) {
          return {...e, isChecked: !e.isChecked};
        }
        return e;
      });
      return {listTodo: [...newList]};
    }),
  deleteTodo: model =>
    set(state => {
      const newList = state.listTodo.filter(function (item) {
        return item.id !== model.id;
      });
      console.log(newList);
      return {listTodo: [...newList]};
    }),
}),  {
    name: 'todo-storage', // name of the item in the storage (must be unique)
    storage: createJSONStorage(() => zustandStorage), // (optional) by default, 'localStorage' is used
  },));

export default useTodoStore;
