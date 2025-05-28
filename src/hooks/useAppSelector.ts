// src/hooks/useAppSelector.ts
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import type { RootState } from '../app/store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
