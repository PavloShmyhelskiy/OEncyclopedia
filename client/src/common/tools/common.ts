import type { Argument } from 'classnames'
import classnamesBase from 'classnames'
import { overrideTailwindClasses } from 'tailwind-override'

export type WithOptional<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>

export const range = (n: number) => [...Array.from({ length: n }).keys()]

export const capitalizeFirstLetter = <T extends string = string>(
  string: string,
): T => {
  return (string.charAt(0).toUpperCase() + string.slice(1)) as T
}

export const keyToUrl = (args: any): string => args.filter(Boolean).join('/')

export const classnames = (...args: Argument[]) =>
  overrideTailwindClasses(classnamesBase(...args))
