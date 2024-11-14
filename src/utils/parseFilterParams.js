const parseType = (value) => {
  const types = ['home', 'work', 'personal'];
  if (types.includes(value)) {
    return value;
  }

  return undefined;
};

const parseIsFavourite = (value) => {
  if (value === 'true' || value === 'false') {
    return value;
  }
  return undefined;
};

export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;

  const parsedType = parseType(type);
  const parsedIsFavourite = parseIsFavourite(isFavourite);

  return {
    type: parsedType,
    isFavourite: parsedIsFavourite,
  };
};