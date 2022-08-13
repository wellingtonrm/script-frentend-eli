import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import api from '../service/api';
import { AppDispatch, AppThunk } from './store'
var pessoas: any = []

export const gets = createAsyncThunk('store/get', async (arg, { getState }) => {
  const state: any = getState();
  try {
    var options = {
      method: 'GET',
      url: 'http://localhost:5000/ler.php',
      headers: { 'Content-Type': 'application/json' },
    };

    const res = await axios.request(options);
    const { data } = res;
    return data
  } catch (error: any) {
    console.log(error.message)
  }
})


export const posts = createAsyncThunk('store/post', async (arg, { getState }) => {
  const state: any = getState();
  try {
    var options = {
      method: 'POST',
      url: 'http://localhost:5000/gravar.php',
      headers: { 'Content-Type': 'application/json' },
      data: state.data
    };

    const res = await axios.request(options);
    const { data } = res;
    console.log(data)
    alert("Adicionado com sucesso")
  } catch (error: any) {
    console.log(error.message)
  }
})

let initialState: any = {
  pessoas: pessoas,
}

export const jsonStore = createSlice({
  name: 'pessoas',
  initialState,
  reducers: {
    datas: (state, { payload }) => {
      if (payload == "") {
        state.pessoas = pessoas

      } else {
        state.pessoas = payload
      }
    },
    incluir: (state, { payload }) => {
      console.log(state.pessoas.length)
      switch (state.pessoas.length != 0) {
        case true:
          const existe = state.pessoas.find((pessoas: any, index: number) => pessoas.nome === payload)
          console.log(!existe)
          switch (!existe) {
            case true:
              let pessoa = {
                nome: payload,
                filhos: []
              }
              state.pessoas.push(pessoa)
              break;
            case false:
              alert("Essa pessoa já exsite")
              break;
          }
          break;
        case false:
          let pessoa = {
            nome: payload,
            filhos: []
          }
          state.pessoas.push(pessoa)
          break;

      }

    },
    deletePai: (state, { payload }) => {
      const { pai, index } = payload;
      state.pessoas.forEach((item: any, index: number) => {
        switch (item.nome) {
          case pai:
            state.pessoas.splice(index, 1);
            break;
        }
      })
      console.log(payload)
    },
    incluirFilhos: (state, { payload }) => {

      state.pessoas.forEach((item: any, index: number) => {
        if (item.nome === payload.pai.nome) {

          item.filhos.push(payload.filho)
        }
      });
    },
    deleteFilho: (state, { payload }) => {
      const { pai, indexFilho } = payload;
      state.pessoas.forEach((item: any, index: number) => {
        switch (item.nome) {
          case pai:
            item.filhos.splice(indexFilho, 1);

            break;
        }
      })
    },




  },
  extraReducers: (builder) => {
    builder.addCase(posts.fulfilled, (state, action) => { })
    builder.addCase(gets.fulfilled, (state, action) => {
    })
  },
})

// Action creators are generated for each case reducer function
export const { datas, incluir, incluirFilhos, deletePai, deleteFilho } = jsonStore.actions
export default jsonStore.reducer

