const getPrice = (value: any) => {
  if (typeof value !== 'undefined') {
    return parseFloat(value.toString());
  }
  return value;
};

export default getPrice;
