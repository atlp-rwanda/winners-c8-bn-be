/**
 * 
 * @openapi
 * /users/chats:
 *   get:
 *       tags: [Chat]
 *       summary: This is returns all past public chats to the user.
 *       description: Online users allowed to view all public chats!
 *       responses:
 *           200:
 *               description: Successfully chats retrieved!
 *           401:
 *              description: Unauthorized | only admin
 *           500:
 *               description: Internal server error!
 *
 */
