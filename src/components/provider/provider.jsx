'use client'
import { store } from '@/redux/store'
import React from 'react'
import { Provider } from 'react-redux'
import { RecoilRoot } from 'recoil'

export const ProviderComp = ({children}) => {
  return (
    <RecoilRoot>
    <Provider store={store}>
      {children}
    </Provider>
    </RecoilRoot>
  )
}
