
import { roles } from '../../helpers/user-role';



export const fakeCredentials = {
  firstName: "Fake",
  lastname: "User",
  email: "fake@gmail.com",
  role: roles.ADMIN,
  password: "test1234",
};
export const fakeManagerCredentials = {
  firstName: "Fake",
  lastName: "User",
  email: "fake@gmail.com",
  role: roles.MANAGER,
  manager: 3,
  password: "test1234",
};
export const fakeRequesterCredentials = {
  firstName: "Fake",
  lastName: "User",
  email: "fakerequester@gmail.com",
  role: roles.REQUESTER,
  password: "test1234",
  manager: 3,
 
};
// export const roles = {
// 	ADMIN: 'admin',
// 	REQUESTER: 'requester',
// 	MANAGER: 'manager',
// 	SUPER_ADMIN: 'super-admin',
// };