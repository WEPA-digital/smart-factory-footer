export type UISelectItem<T> = {
  id: string;
  text: string;
  value: T;
  disabled?: boolean;
};

export function makeSelectItem<T>(value: any): UISelectItem<T> {
  return {
    id: value.toString(),
    text: value.toString(),
    value: value,
  };
}
