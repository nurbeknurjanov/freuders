'use client';
import { useRef, MutableRefObject } from 'react';
import { useAppSelector } from 'store/hooks';
import { common } from 'store';

export function useHydratedClient(): MutableRefObject<boolean> {
  const isHydratedToClient = useAppSelector(
    common.hydrate.selector.isHydratedToClient
  );

  const isHydratedToClientRef = useRef(isHydratedToClient);
  isHydratedToClientRef.current = isHydratedToClient;

  return isHydratedToClientRef;
}
