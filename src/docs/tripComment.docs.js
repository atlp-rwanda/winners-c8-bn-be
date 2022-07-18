/**
 * @openapi
 *
 * tags:
 * - name: Trip Comments
 *   description: 'Create, Get and Delete (CRUD) trip comments '
 * components:
 *   responses:
 *     Success:
 *       description: Comment(s) added successfuly!
 *     UnauthorizedError:
 *       description: Access token is missing or invalid.
 *     ForbiddenError:
 *       description: Not authorized to access the requested resourcees.
 *     ServerError:
 *       description: Server or Database error occurred
 *     NotFoundError:
 *       description: Trip not found
 *     BadRequestError:
 *       description: Invalid format or missing fields in the Location
 *   schemas:
 *     comment:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           required: true
 *         tripId:
 *           type: string
 *           required: true
 *         comment:
 *           type: string
 *           required: true
 *         
 *       example:
 *         comment: Nice trip!

 *   requestBodies:
 *     commentBody:
 *       description: A JSON object for the comment body
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             "$ref": "#/components/schemas/comment"
 * paths:
 *   "/trips/{tripId}/comments":
 *     get:
 *       security:
 *         - BearerToken: []
 *       description: It will return all comments on the trip
 *       summary: Get all comments in the database
 *       tags:
 *       - Trip Comments
 *       parameters:
 *          - in: path
 *            name: tripId
 *            schema:
 *              type: integer
 *            required: true
 *            description: Id of the trip to comment on
 * 
 *       responses:
 *         '200':
 *           description: Comments fetched successfully!
 *         '401':
 *           "$ref": "#/components/responses/UnauthorizedError"
 *         '403':
 *           "$ref": "#/components/responses/ForbiddenError"
 *         '404':
 *           "$ref": "#/components/responses/NotFoundError"
 *         '500':
 *           "$ref": "#/components/responses/ServerError"
 *   "/trips/{tripId}/comment":
 *     post:
 *       security:
 *         - BearerToken: []
 *       description: Create new trip comment
 *       summary: Create a comment to a particular trip by a trip owner or manager
 *       requestBody:
 *         "$ref": "#/components/requestBodies/commentBody"
 *       tags:
 *       - Trip Comments
 *       parameters:
 *          - in: path
 *            name: tripId
 *            schema:
 *              type: integer
 *            requireed: true
 *            description: Id of the trip to comment on
 *       responses:
 *         '201':
 *           description: Comment added successfuly!
 *         '400':
 *           "$ref": "#/components/responses/BadRequestError"
 *         '401':
 *           "$ref": "#/components/responses/UnauthorizedError"
 *         '403':
 *           "$ref": "#/components/responses/ForbiddenError"
 *         '500':
 *           "$ref": "#/components/responses/ServerError"
 *   "/trips/{tripId}/comments/{commentId}":
 *     delete:
 *       security:
 *         - BearerToken: []
 *       description: It will delete the trip comment
 *       summary: Delete a comment from the database by the owner or manager of the trip
 *       tags:
 *       - Trip Comments
 *       parameters:
 *          - in: path
 *            name: tripId
 *            schema:
 *              type: integer
 *            required: true
 *            description: The id of the trip with the comment 
 *          - in: path
 *            name: commentId
 *            schema:
 *              type: integer
 *            required: true
 *            description: The id of the comment to delete
 *      
 *       responses:
 *         '200':
 *           description: Comment deleted successfuly
 *           content-type:
 *             application/json:
 *               schema:
 *                 "$ref": "#/components/schemas/commentBody"
 *         '401':
 *           "$ref": "#/components/responses/UnauthorizedError"
 *         '403':
 *           "$ref": "#/components/responses/ForbiddenError"
 *         '404':
 *           "$ref": "#/components/responses/NotFoundError"
 *         '500':
 *           "$ref": "#/components/responses/ServerError"
 */
