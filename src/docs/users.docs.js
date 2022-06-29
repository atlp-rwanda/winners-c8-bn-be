/**
 * @openapi
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
 */