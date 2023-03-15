import { atom } from "recoil";

export interface Resource {
  type: "url" | "image";
  resource: string;
  name: string;
  created_at: any;
}

const defaultResources = {};

export const resources = atom<{ [key: string]: Resource }>({
  default: {
    "https://www.robinwieruch.de/react-libraries/": {
      type: "url",
      resource: "https://www.robinwieruch.de/react-libraries/",
      name: "https://www.robinwieruch.de/react-libraries/",
      created_at: new Date().getTime(),
    },
    "https://typed.blog/how-to-write-a-better-research-paper-faster/": {
      type: "url",
      resource:
        "https://typed.blog/how-to-write-a-better-research-paper-faster/",
      name: "https://typed.blog/how-to-write-a-better-research-paper-faster/",
      created_at: new Date().getTime() + 10000,
    },
  },
  key: "resources",
});
