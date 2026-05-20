const BASE_URL = (import.meta as { env?: { BASE_URL?: string } }).env?.BASE_URL || '/nahida-gallery/';

export const getImagePath = (path: string): string => {
  if (path.startsWith('/')) {
    return encodeURI(`${BASE_URL}${path.slice(1)}`);
  }
  return encodeURI(`${BASE_URL}${path}`);
};