const currency = (num) => {
  let number = 0;
  if (num) {
    const n = num.toString().split('.');
    n[0] = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    number = n.join('.');
  }
  return number;
};
export { currency as default };
