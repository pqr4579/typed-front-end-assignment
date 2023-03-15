import { atom } from "recoil";

export const toast = atom<string | null>({
  default: null,
  key: "toast",
});
