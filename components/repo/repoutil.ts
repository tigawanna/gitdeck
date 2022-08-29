export const authedurl = (url: string, token: string) => {
  return url.slice(0, 8) + token + "@" + url.slice(8);
};
