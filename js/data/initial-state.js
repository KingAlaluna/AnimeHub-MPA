import {
  h, 
  render,
  createContext,
  Fragment
} from 'https://esm.sh/preact@10.20.1';


import { 
  useState,
  useEffect,
  useContext,
} from 'https://esm.sh/preact@10.20.1/hooks';


export const GlobalContext = createContext();

export const Fr = Fragment;
export const e = h; 
export const c = useContext;
export const f = useEffect;
export const s = () => c(GlobalContext);
