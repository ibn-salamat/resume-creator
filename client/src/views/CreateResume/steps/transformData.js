export function transformData(input) {
  let filter = (objects, h = {}) =>
    objects.filter((object) => !h[object.id] && (h[object.id] = true));

  let keys = Object.keys(input),
    _workList = [],
    _educationList = [],
    _contactsList = [];

  keys.map((key) => {
    if (key.includes("%%%_")) {
      if (key.includes("work")) {
        _workList.push(key);
      } else if (key.includes("education")) {
        _educationList.push(key);
      } else if (key.includes("contact")) {
        _contactsList.push(key);
      }
    }
  });

  function transformField(inputArr, ...fields) {
    const outputArray = [];
    inputArr.map((item) => {
      const id = item.split("_")[2];
      let obj = { id };

      keys.map((key) => {
        if (key.includes(id)) {
          fields.map((field) => {
            if (key.includes(field)) {
              obj[field] = input[key];
              delete input[key];
            }
          });
        }
      });

      outputArray.push(obj);
    });

    return filter(outputArray);
  }

  const work = transformField(_workList, "Position", "Place", "StartDate", "EndDate");
  const education = transformField(
    _educationList,
    "Profession",
    "Place",
    "StartDate",
    "EndDate"
  );
  const contacts = transformField(_contactsList, "Title", "Value");

  input.contacts = toLowerCase(contacts);
  input.education = toLowerCase(education);
  input.work = toLowerCase(work);

  return input;
}

function toLowerCase(array) {
  let newArr = [];
  array.map((item) => {
    let keys = Object.keys(item);
    let values = Object.values(item);
    let obj = {};
    for (let i = 0; i < keys.length; i++) {
      let keyValue = keys[i];
      let lowerKeyValue = keyValue.charAt(0).toLocaleLowerCase() + keyValue.slice(1);
      obj[lowerKeyValue] = values[i];
    }
    newArr.push(obj);
  });

  return newArr;
}
