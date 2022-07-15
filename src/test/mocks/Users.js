import { requester, manager } from "./roles-mocks";
import { v4 as uuidv4 } from "uuid";
const managerId = uuidv4();
export const signup = {
  firstName: "Test",
  lastName: "User",
  email: "test@gmail.com",
  password: "Simon@20000",
};
export const no_firstName = {
  firstName: "",
  lastName: "User",
  email: "testq@gmail.com",
  password: "Simon@20000",
};
export const no_lastName = {
  firstName: "Test",
  lastName: "",
  email: "test@gmail.com",
  password: "Password@2022",
};
export const no_email = {
  firstName: "Test",
  lastName: "User",
  email: "",
  password: "Password@2022",
};
export const no_password = {
  firstName: "Test",
  lastName: "User",
  email: "test@gmail.com",
  password: "",
};
export const invalid_email = {
  firstName: "Test",
  lastName: "User",
  email: "test.com",
  password: "Password@2022",
};
export const invalid_password = {
  firstName: "Test",
  lastName: "User",
  email: "test@gmail.com",
  password: "password",
};
export const adminCredentials = {
  firstName: "nyakamwe",
  lastName: "aimable",
  email: "nyakamweaimable@gmail.com",
  password: "Tester@12345",
  user_role: "013dddd7-2769-4de6-8fc3-7aa527114879",
  isVerified: true,
};
export const managerCredentials = {
	id: managerId,
	firstName: 'manager',
	lastName: 'user',
	email: 'manager@mail.com',
	password: 'Tester@12345',
	user_role: manager.id,
	isVerified: true,
};
export const unknown = {
	firstName: 'manager',
	lastName: 'user',
	email: 'manager@mail.com',
	password: 'Tester@12345',
	user_role: '6927442b-84fb-4fc3-b799-11449fa62f00',
};
export const commentor = {
  id: '7adae2f1-4d35-470d-8512-1b9634330a9e',
	firstName: 'Commentor',
	lastName: 'User',
	email: 'commentor@gmail.com',
	password: 'commentor@20000',
  user_role: "6927442b-84fb-4fc3-b799-11449fa62f52"
}
export const update_user={
	firstName: "elamu",
	lastName: "fghjkl",
	username: "johnDoe",
	phoneNumber: "0780591269",
	image: "http://res.cloudinary.com/duaym10fi/image/upload/v1656582777/winners-c8-bn-be/jx2eu9barltm0tpnyn95.jpg",
	gender: "male",
	preferredLanguage: "kinyarwanda",
	preferredCurrency: "RWF",
	department: "developers",
}
// export const managerCredentials = {
//   id: managerId,
//   firstName: "manager",
//   lastName: "user",
//   email: "manager@mail.com",
//   password: "Tester@12345",
//   user_role: manager.id,
//   isVerified: true,
// };
export const requesterCredentials = {
  firstName: "requester",
  lastName: "user",
  email: "requester@mail.com",
  password: "Tester@12345",
  user_role: requester.id,
  managerId: managerId,
  isVerified: true,
};
