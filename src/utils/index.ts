const YOUTUBE_HOST_NAME = "www.youtube.com";

export const urlValidator = (urlString: string) => {
  let url;
  try {
    url = new URL(urlString);
  } catch (e) {
    return false;
  }

  return url.protocol === "https:" || url.protocol === "https:";
};

export const replaceToEmbeddUrl = (urlString: string) => {
  const url = new URL(urlString);
  if (url.hostname === YOUTUBE_HOST_NAME) {
    const targetUrl = url.href;
    const regex = /watch\?v=(.{11})/;
    const match = targetUrl.match(regex);

    if (match) {
      const videoId = match[1];
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      return embedUrl;
    }
  }

  return url.href;
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
