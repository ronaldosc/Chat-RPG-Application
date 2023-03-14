export const encodeURL = (URLPaths: (string | number | undefined | null)[]) => {
  const paths = URLPaths.map((path) =>
    String(path).replace(/[/]/g, '&sol;').replace(/[?]/g, '&quest;'),
  ).join('/');
  return `/${paths}`;
};

export const decodeURL = (url: string | undefined) => {
  const path = url?.replace(/&sol;/g, '/').replace(/&quest;/g, '?');
  return `${path}`;
};
