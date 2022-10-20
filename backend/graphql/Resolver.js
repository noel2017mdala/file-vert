const { createUser, login } = require("../DB/Model/UserModel");
const data = [
  {
    firstName: "Abel",
    lastName: "Mdala",
    uid: 1,
    email: "noelmdala1017@gmail.com",
    contact: "997216715",
  },
];

const rootResolver = {
  getUser: ({ id }) => {
    return data.find((user) => user.uid == id);
  },

  getUsers: () => {
    return data;
  },

  createUser: ({ input }) => {
    if (input) {
      return createUser(input);
    }
    return {
      status: false,
      message: "Failed to create user",
    };
  },

  userLogin: ({ email, password }) => {
    if (email && password) {
      return login({ email, password });
    }
  },
};

module.exports = rootResolver;
