function formatValue(value: boolean | string | number | null | undefined) {
  if (value === null || value === undefined) return '';
  if (value === true) return '1';
  if (value === false) return '0';
  if (typeof value === 'number') return value.toString();
  return value;
}

function buildQuery(
  query: object | Array<any> | string | null | undefined,
  tempKey: string | null,
) {
  return Object.keys(query).reduce((acc, key) => {
    if (!query[key]) {
      return acc;
    }

    const formattedKey = tempKey ? tempKey + '[' + key + ']' : key;

    if (typeof query[key] === 'object') {
      acc.push(...buildQuery(query[key], formattedKey));
    } else {
      acc.push(formattedKey + '=' + formatValue(query[key]));
    }

    return acc;
  }, []);
}

function httpBuildQuery(
  query: object | Array<any> | string | null | undefined,
  separator: string = '&',
) {
  if (!query) {
    return '';
  }

  return buildQuery(query, null)
    .join(separator)
    .replace(/[!'()*]/g, '');
}

export default httpBuildQuery;
