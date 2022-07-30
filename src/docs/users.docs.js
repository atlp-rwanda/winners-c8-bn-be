/**
 * @openapi
* /users:
 *   get:
 *       security:
 *          - BearerToken: []
 *       tags: [User]
 *       summary: This is returns all users of application
 *       description: Super admin allowed to view all users of the application!
 *
 *       responses:
 *           200:
 *               description: Successfully users retrieved!
 *           401:
 *              description: Unauthorized | only admin
 *           404:
 *               description: Yet no User to show!
 *           500:
 *               description: Internal server error!
 *
 * /users/assignRole:
 *  patch:
 *      tags: [Role]
 *      security:
 *          - BearerToken: []
 *      summary: Only Super Admin can assign new role to the application's user.
 *      description:  Only logged in super administrator can assign new role to the user!
 *      requestBody:
 *          description: Assign New Role
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                          roleId:
 *                              type: string
 *      responses:
 *           200:
 *              description: successfully user role updated!
 *           401:
 *              description: Unauthorized | only admin
 *           404:
 *              description: Not found
 *           500:
 *              description: internal server error
 *
 *
 *
 * /users/roles:
 *   get:
 *       security:
 *          - BearerToken: []
 *       tags: [Role]
 *       summary: This is returns all role of application
 *       description: Super admin allowed to view all roles of the application!
 *
 *       responses:
 *           200:
 *               description: Successfully role retrieved!
 *           401:
 *              description: Unauthorized | only admin
 *           404:
 *               description: Yet no Role to show!
 *           500:
 *               description: Internal server error!
 *
 * /users/assignManager:
 *  patch:
 *      tags: [Role]
 *      security:
 *          - BearerToken: []
 *      summary: Only Super Admin can assign new manager to the application's user.
 *      description:  Only logged in super administrator can assign new manager to the user!
 *      requestBody:
 *          description: Assign manager to user
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                          managerId:
 *                              type: string
 *      responses:
 *           200:
 *              description: successfully user's manager updated!
 *           401:
 *              description: Unauthorized | only admin
 *           404:
 *              description: Not found
 *           500:
 *              description: internal server error
 *
 * /users/managers:
 *   get:
 *       security:
 *          - BearerToken: []
 *       tags: [Role]
 *       summary: This is returns all managers of application
 *       description: Super admin allowed to view all managers of the application!
 *
 *       responses:
 *           200:
 *               description: All managers retrieved Successfully !
 *           401:
 *              description: Unauthorized | only admin
 *           404:
 *               description: Yet no Role to show!
 *           500:
 *               description: Internal server error!
 */
