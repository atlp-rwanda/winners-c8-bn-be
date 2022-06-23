import models from "../../database/models";
const { User } = { ...models };
import Protection from "../../middlewares/hash";
const { hashPassword } = Protection;

const userSeeder = async () => {
  const users = User.bulkCreate([
    // {
    //   id: 1,
    //   name: "John Doe",
    //   email: "john.doe@test.com",
    //   password: hashPassword("Password@123"),
    //   user_role: "manager",
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    //   isVerified: true,
    // },
    {
      fistname: "John",
      lastname: "Doe",
      email: "jane.doe@test.com",
      password: hashPassword("Password@123"),
      createdAt: new Date(),
      updatedAt: new Date(),
      isVerified: true,
    },
    {
      firstname: "Jacob",
      lastname: "Doe",
      email: "jacob.doe@test.com",
      password: hashPassword("Password@123"),
      createdAt: new Date(),
      updatedAt: new Date(),
      isVerified: true,
    },
  ]);

  return users;
};

export default userSeeder;
