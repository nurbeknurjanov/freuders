import { useCallback } from 'react';

type BemModifiers = { [key: string]: boolean } | string[];

export const useBem = (block: string) =>
  useCallback(
    (element?: string, modifiers?: BemModifiers): string => {
      if (element === undefined) {
        return block;
      }

      const elementName = element === '' ? block : `${block}__${element}`;

      if (modifiers === undefined) {
        return elementName;
      }

      const modifierName = (
        Array.isArray(modifiers)
          ? modifiers
          : Object.keys(modifiers).filter(modifier => modifiers[modifier])
      )
        .map(modifier => [`${elementName}_${modifier}`])
        .join(' ');

      return [elementName, modifierName].filter(v => v).join(' ');
    },
    [block]
  );
