/**
 * @openapi
 *
 * tags:
 * - name: Locations
 *   description: 'Create, Read, Update and Delete (CRUD) locations '
 * components:
 *   responses:
 *     Success:
 *       description: Successfully got location(s)
 *     UnauthorizedError:
 *       description: Access token is missing or invalid.
 *     ForbiddenError:
 *       description: Not authorized to carry the action.
 *     ServerError:
 *       description: Server or Database error occurred
 *     NotFoundError:
 *       description: No such location found
 *     BadRequestError:
 *       description: Invalid format or missing fields in the Location
 *   schemas:
 *     location:
 *       type: object
 *       properties:
 *         country:
 *           type: string
 *           required: true
 *         state:
 *           type: string
 *           required: false
 *         province:
 *           type: string
 *           required: false
 *         city:
 *           type: string
 *           required: true
 *         
 *       example:
 *         country: Rwanda
 *         province: Kigali
 *         city: Kigali City

 *   requestBodies:
 *     locationBody:
 *       description: A JSON object for the location body
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             "$ref": "#/components/schemas/location"
 * paths:
 *   "/locations":
 *     get:
 *       security:
 *         - BearerToken: []
 *       description: It will return all locations
 *
 *       tags:
 *       - Locations
 *       responses:
 *         '200':
 *           description: All Locations
 *         '401':
 *           "$ref": "#/components/responses/UnauthorizedError"
 *         '403':
 *           "$ref": "#/components/responses/ForbiddenError"
 *         '404':
 *           "$ref": "#/components/responses/NotFoundError"
 *         '500':
 *           "$ref": "#/components/responses/ServerError"
 *     post:
 *       security:
 *         - BearerToken: []
 *       description: Create new Location
 *       requestBody:
 *         "$ref": "#/components/requestBodies/locationBody"
 *       tags:
 *       - Locations
 *       responses:
 *         '201':
 *           description: The Location is successfully created.
 *         '400':
 *           "$ref": "#/components/responses/BadRequestError"
 *         '401':
 *           "$ref": "#/components/responses/UnauthorizedError"
 *         '403':
 *           "$ref": "#/components/responses/ForbiddenError"
 *         '500':
 *           "$ref": "#/components/responses/ServerError"
 *   "/locations/{locationId}":
 *     get:
 *       security:
 *         - BearerToken: []
 *       description: It will return  Location
 *       tags:
 *       - Locations
 *       parameters:
 *       - schema:
 *           type: integer
 *         name: locationId
 *         in: path
 *         required: true
 *         description: id of the location
 *       responses:
 *         '200':
 *           description: The location was successfully got with the given location id.
 *           content-type:
 *             application/json:
 *               schema:
 *                 "$ref": "#/components/schemas/locationResponse"
 *         '401':
 *           "$ref": "#/components/responses/UnauthorizedError"
 *         '403':
 *           "$ref": "#/components/responses/ForbiddenError"
 *         '404':
 *           "$ref": "#/components/responses/NotFoundError"
 *         '500':
 *           "$ref": "#/components/responses/ServerError"
 *     put:
 *       security:
 *         - BearerToken: []
 *       description: It will update a location which has the location id provided in
 *         path;
 * 
 *       requestBody:
 *         "$ref": "#/components/requestBodies/locationBody"
 *       tags:
 *       - Locations
 *       parameters:
 *       - schema:
 *           type: integer
 *         name: locationId
 *         in: path
 *         required: true
 *         description: id of the location
 *       responses:
 *         '201':
 *           description: Succefully updated location.
 *         '400':
 *           "$ref": "#/components/responses/BadRequestError"
 *         '401':
 *           "$ref": "#/components/responses/UnauthorizedError"
 *         '403':
 *           "$ref": "#/components/responses/ForbiddenError"
 *         '404':
 *           "$ref": "#/components/responses/NotFoundError"
 *         '500':
 *           "$ref": "#/components/responses/ServerError"
 *     delete:
 *       security:
 *         - BearerToken: []
 *       description: It will delete a location which has the  id provided in
 *         path.
 *       tags:
 *       - Locations
 *       parameters:
 *       - schema:
 *           type: integer
 *         name: locationId
 *         in: path
 *         required: true
 *         description: id of the location
 *       responses:
 *         '201':
 *           description: Succefully deleted location
 *           content-type:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   "$ref": "#/components/schemas/locationResponse"
 *         '401':
 *           "$ref": "#/components/responses/UnauthorizedError"
 *         '403':
 *           "$ref": "#/components/responses/ForbiddenError"
 *         '404':
 *           "$ref": "#/components/responses/NotFoundError"
 *         '500':
 *           "$ref": "#/components/responses/ServerError"
 */
