export const storeToLocalStorage = (fieldName, data) => {
  const listInJson = JSON.stringify(data);
  localStorage.setItem(fieldName, listInJson);
};

export const getFromLocalStorage = async (fieldName) => {
  const data = JSON.parse(localStorage.getItem(fieldName));
  return data;
};