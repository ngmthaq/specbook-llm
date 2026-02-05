export const formatPath = (path: string) => {
  return path.startsWith('/') ? path.slice(1) : path;
};
