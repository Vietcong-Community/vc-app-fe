export const removeURLParameter = (url: string, parameter: string) => {
  const urlParts = url.split('?');

  if (urlParts.length >= 2) {
    // Get first part, and remove from array
    const urlBase = urlParts.shift();
    // Join it back up
    const queryString = urlParts.join('?');

    const prefix = `${encodeURIComponent(parameter)}=`;
    const parts = queryString.split(/[&;]/g);

    for (let i = 0; i < parts.length; i++) {
      // Idiom for string.startsWith
      if (parts[i].lastIndexOf(prefix, 0) !== -1) {
        parts.splice(i, 1);
      }
    }

    url = `${urlBase}?${parts.join('&')}`;
  }

  return url;
};
