import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, devtools, persist} from 'zustand/middleware';
import {User, UserSchema} from './t';

interface States {
  user: User;
  setUser: (user: User) => void;
  bears: number;
  increase: (by: number) => void;
  theme: string;
  setTheme: (theme: string) => void;
  isDidiao: boolean;
  setIsDidiao: (isDidiao: boolean) => void;
  cared: string[];
  setCared: (cared: string[]) => void;
  global: string[];
  setGlobal: (global: string[]) => void;
  clear: () => void;
  token: string;
  setToken: (t: string) => void;
  quit: () => void;
}

const initialState = {
  bears: 0,
  theme: '#987001',
  isDidiao: false,
  cared: ['100.NDX', '105.SQQQ', '0.300996'],
  global: ['1.000001', '0.399006', '100.NDX', '100.N225'],
  user: UserSchema.parse({}),
  token: '',
};

const useCaches = create<States>()(
  devtools(
    persist(
      set => ({
        ...initialState,
        increase: by => set(state => ({bears: state.bears + by})),
        setTheme: theme => set({theme}),
        setIsDidiao: isDidiao => set({isDidiao}),
        setCared: cared => set({cared}),
        setUser: user => set({user}),
        setGlobal: global => set({global}),
        setToken: token => set({token}),
        quit: () => {
          set({token: '', user: UserSchema.parse({})});
        },
        /** 初始化默认状态 */
        clear: () => {
          set(initialState);
        },
      }),
      {
        storage: createJSONStorage(() => AsyncStorage),
        name: 'useCaches.ts',
        /** 白名单 */
        partialize: state => ({
          bears: state.bears,
          theme: state.theme,
          isDidiao: state.isDidiao,
          cared: state.cared,
          user: state.user,
          global: state.global,
          token: state.token,
        }),
      },
    ),
  ),
);

export {useCaches};
