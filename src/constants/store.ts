import {create} from 'zustand';
import {
  createJSONStorage,
  devtools,
  persist,
  StateStorage,
} from 'zustand/middleware';
import {MMKV} from 'react-native-mmkv';

import {
  Series,
  SeriesSchema,
  Teacher,
  TeacherSchema,
  User,
  UserSchema,
} from './t';

const mmkv = new MMKV({
  id: 'useMMKV',
  encryptionKey: 'net.cctv3.bookkeeping',
});
const mmkvStorage: StateStorage = {
  setItem: (key, value) => mmkv.set(key, value),
  getItem: key => mmkv.getString(key) || null,
  removeItem: key => mmkv.delete(key),
};

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
  /** 表单 */
  selectedSeries: Series;
  setSelectedSeries: (s: Series) => void;
  selectedTeacher: Teacher;
  setSelectedTeacher: (t: Teacher) => void;
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
  selectedSeries: SeriesSchema.parse({}),
  selectedTeacher: TeacherSchema.parse({}),
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
        setSelectedSeries: selectedSeries => set({selectedSeries}),
        setSelectedTeacher: selectedTeacher => set({selectedTeacher}),
        quit: () => {
          set({token: '', user: UserSchema.parse({})});
        },
        /** 初始化默认状态 */
        clear: () => {
          set(initialState);
        },
      }),
      {
        // storage: createJSONStorage(() => AsyncStorage),
        storage: createJSONStorage(() => mmkvStorage),
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
