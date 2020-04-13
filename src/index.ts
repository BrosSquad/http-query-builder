function formatValue(value: boolean | string | number): string {
  if (value === null || value === undefined) return '';
  if (value === true) return '1';
  if (value === false) return '0';
  if (typeof value === 'number') return value.toString();
  return value;
}

function buildQuery(query: object | Array<any>, tempKey: string | null): Array<string> {
  return Object.keys(query).reduce((acc, key) => {
    if (query[key] === null || query[key] === undefined) {
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
  query: object | Array<any> | null | undefined,
  separator: string = '&',
): string {

  if (typeof query !== 'object' && query !== undefined && Array.isArray(query) === false) {
    throw new Error('Query type can only by array or object');
  }

  if (!query) {
    return '';
  }

  return buildQuery(query, null)
    .join(separator)
    .replace(/[!'()*]/g, '');
}

export default httpBuildQuery;
