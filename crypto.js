export const encryption = (password) => {
  let arr = password.split("");
  let newArr = [];
arr.forEach(element => {
    let n = element+'xyz';
    newArr.push(n);
});
  return newArr.join("");
};
//return newArray.join("");