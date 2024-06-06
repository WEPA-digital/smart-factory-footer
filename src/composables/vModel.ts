import { computed, toRaw } from "vue";

export function useVModel<T>(props: any, emit: any, name = "modelValue") {
  return computed<T>({
    get: () => {
      return structuredClone<T>(toRaw(props[name]));
    },
    set: value => {
      emit(`update:${name}`, structuredClone<T>(toRaw(value)));
    },
  });
}
