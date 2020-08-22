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

  input.contacts = contacts;
  input.education = education;
  input.work = work;

  return input;
}
