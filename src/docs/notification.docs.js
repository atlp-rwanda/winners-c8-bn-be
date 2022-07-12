/**
 * @swagger
 * paths:
 *   /user/notifications/:
 *     get:
 *       summary: get all the notifications
 *       tags:
 *         - Notification
 *       security:
 *               - BearerToken: []
 *       responses:
 *         '200':
 *           description: Successfully.
 *         '401':
 *           description: Token is invalid or expired
 *         '400':
 *           description: Bad Request
 *         '500':
 *           description: Internal server error
 *     patch:
 *       summary: mark all the notifications as read
 *       tags:
 *         - Notification
 *       security:
 *               - BearerToken: []
 *       responses:
 *         '200':
 *           description: Successfully.
 *         '401':
 *           description: Token is invalid or expired
 *         '400':
 *           description: Bad Request
 *         '500':
 *           description: Internal server error
 *   /user/notifications/{notificationId}:
 *     get:
 *       summary: get all a single notifications
 *       tags:
 *         - Notification
 *       parameters:
 *         - schema:
 *             type: string
 *           name: notificationId
 *           in: path
 *           required: true
 *       security:
 *               - BearerToken: []
 *       responses:
 *         '200':
 *           description: Successfully.
 *         '401':
 *           description: Token is invalid or expired
 *         '400':
 *           description: Bad Request
 *         '500':
 *           description: Internal server error *
 *     patch:
 *       summary: mark  single notification as ready
 *       tags:
 *         - Notification
 *       parameters:
 *         - schema:
 *             type: string
 *           name: notificationId
 *           required: true
 *           in: path
 *       security:
 *               - BearerToken: []
 *       responses:
 *         '200':
 *           description: Successfully.
 *         '401':
 *           description: Token is invalid or expired
 *         '400':
 *           description: Bad Request
 *         '500':
 *           description: Internal server error *
 *     delete:
 *       summary: delete the notification
 *       tags:
 *         - Notification
 *       parameters:
 *         - schema:
 *             type: string
 *           name: notificationId
 *           required: true
 *           in: path
 *       security:
 *               - BearerToken: []
 *       responses:
 *         '200':
 *           description: Successfully.
 *         '401':
 *           description: Token is invalid or expired
 *         '400':
 *           description: Bad Request
 *         '500':
 *           description: Internal server error *
 */
