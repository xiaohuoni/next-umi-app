
import { Reducer } from 'redux';
import { query } from '@/services/api';
import { Effect } from '@/models/connect';

export interface ListModelState {
  name: string;
}

export interface ListModelType {
  namespace: 'list';
  state: ListModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save: Reducer<ListModelState>;
  };
}


const ListModel: ListModelType = {
  namespace: 'list',

  state: {
    name: '',
  },

  effects: {
    *query({ payload }, { call, put }) {
      const data = yield call(query, payload);
      console.log(data)
      yield put({
        type: 'save',
        payload: { name: data.text },
      });
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default ListModel;
