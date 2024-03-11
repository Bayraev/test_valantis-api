export const toYearMonthDay = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // добавляем ведущий ноль, если месяц < 10
  const day = currentDate.getDate().toString().padStart(2, '0'); // добавляем ведущий ноль, если число < 10

  return `${year}${month}${day}`;
};

// возвращает {offset: number, limit: number }
// расчет страниц с 0
export const selectOffsetByPage = (page) => {
  let offset = page * 50;
  return { offset, limit: 50 };
};

// Удаление дубликатов по ключу
export const FuncDeleteDublicatesFromArrBy = (arr, key) => {
  const uniqueProducts = {};
  const newArray = arr
    .map((element) => {
      if (!uniqueProducts[element[key]]) {
        uniqueProducts[element[key]] = true;
        return element;
      } else {
        return null;
      }
    })
    .filter((product) => product !== null);

  return newArray;
};

// Это было для фильтрации сбора фильтров с апишки...
export const funcFilterUniqueStrings = (array) => {
  const uniqueStrings = {};

  return array.filter((string) => {
    if (!uniqueStrings[string]) {
      uniqueStrings[string] = true;
      return true;
    } else {
      return false;
    }
  });
};

export const isNumeric = (value) => {
  return !isNaN(value);
};
