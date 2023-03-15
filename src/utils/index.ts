export const urlValidator = (urlString: string) => {
  let url;
  try {
    url = new URL(urlString);
  } catch (e) {
    return false;
  }

  return url.protocol === "https:" || url.protocol === "https:";
};

export const replaceToEmbededUrl = (urlString: string) => {
  return "embeded";
};

const delay = () => {
  const minDelayTime = 300;
  const maxDelayTime = 1000;

  const delayTime = Math.floor(
    Math.random() * (maxDelayTime - minDelayTime) + minDelayTime
  );

  return new Promise((resolve) => setTimeout(resolve, delayTime));
};

export const isSuccess = async () => {
  await delay();
  return Math.random() < 0.8;
};
