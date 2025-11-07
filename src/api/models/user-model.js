
const listAllUsers = () => {
  return userItems;
};

const findUserById = (id) => {
  return userItems.find((item) => item.user_id == id);
};

const addUser = (user) => {
  const { name, username, email, role, password } = user;
  const newId = userItems[0].user_id + 1;
  userItems.unshift({ user_id: newId, name, username, email, role, password });
  return { user_id: newId };
};

const updateUser = (user) => {};

const deleteUserById = (id) => {
  if (findUserById(id)) {
    for (let i = 0; i < userItems.length; i++) {
      if (findUserById(id) == userItems[i]) {
        userItems.splice(i, 1);
      }
    }
    return true;
  } else {
    return false;
  }
};

export { listAllUsers, findUserById, addUser, updateUser, deleteUserById };
