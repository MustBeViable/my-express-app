const cats = [
  {
    cat_id: 9592,
    cat_name: 'Frank',
    weight: 11,
    owner: 3609,
    filename: 'f3dbafakjsdfhg4',
    birthdate: '2021-10-12',
  },
  {
    cat_id: 9590,
    cat_name: 'Mittens',
    weight: 8,
    owner: 3602,
    filename: 'f3dasdfkjsdfhgasdf',
    birthdate: '2021-10-12',
  },
  {
    cat_id: 123,
    name: "kissa1",
    birthdate: "01.01.2001",
    weight: 69,
    owner: "Hessu",
    image: "https://loremflickr.com/320/240/cat)",
  },
  {
    cat_id: 124,
    name: "kissa2",
    birthdate: "02.02.2021",
    weight: 67,
    owner: "Ressu",
    image: "https://loremflickr.com/320/240/cat3)",
  }
];

const listAllCats = () => {
  return cats;
};

const findCatById = (id) => {
  return cats.find((item) => item.cat_id == id);
};

const addCat = (cat) => {
  const {cat_name, weight, owner, filename, birthdate} = cat;
  const newId = cats[0].cat_id + 1;
  cats.unshift({cat_id: newId, cat_name, weight, owner, filename, birthdate});
  return {cat_id: newId};
};

const updateCat = (cat) => {
    
}

const deleteCatById = (id) => {
    if (findCatById(id)) {
        for (let i = 0; i<cats.length; i++) {
            if (findCatById(id)==cats[i]) {
                cats.splice(i, 1)
            }
        }
        return true;
    } else {
        return false;
    }
}

export {listAllCats, findCatById, addCat, deleteCatById};
