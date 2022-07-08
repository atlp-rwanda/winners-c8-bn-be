module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    'Permissions',
    [
      {
        permissionName: 'view_t_request',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permissionName: 'edit_t_request',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permissionName: 'create_t_request',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permissionName: 'cancel_t_request',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permissionName: 'edit_profile',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permissionName: 'book_accomodation',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permissionName: 'view_reports',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permissionName: 'reject_reports',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permissionName: 'approve_reports',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permissionName: 'assign_requesters_to_manager',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permissionName: 'c_accomodation',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permissionName: 'd_accomodation',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permissionName: 'u_accomodation',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permissionName: 'c_location',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permissionName: 'u_location',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permissionName: 'd_location',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permissionName: 'change_user_role',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        permissionName: 'delete_user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permissionName: 'get_roles',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permissionName: 'create_roles',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permissionName: 'update_role',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permissionName: 'delete_role',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permissionName: 'get_rolepermission',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permissionName: 'create_rolepermission',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permissionName: 'update_rolepermission',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permissionName: 'delete_rolepermission',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permissionName: 'assignUsertoManager',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permissionName: 'get_users',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permissionName: 'rate_accomodations',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permissionName: 'review_accomodations',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface) => queryInterface.bulkDelete('Permissions', null, {}),
};
