/**
 * @openapi
 *
 * tags:
 * - name: Trip Requests
 *   description: 'Create, Read, Update and Delete (CRUD) trip requests '
 * components:
 *   responses:
 *     Success:
 *       description: Successfully got the trip request(s)
 *     UnauthorizedError:
 *       description: Access token is missing or invalid.
 *     ForbiddenError:
 *       description: Not authorized to carry the action.
 *     ServerError:
 *       description: Server or Database error occurred
 *     NotFoundError:
 *       description: No such trip request found
 *     BadRequestError:
 *       description: Invalid format or missing fields in the trip request
 *   schemas:
 *     tripRequest:
 *       type: object
 *       properties:
 *         departureId:
 *           type: integer
 *           required: true
 *         destinationsId:
 *           type: array
 *           required: true
 *         travelReason:
 *           type: string
 *           required: true
 *         accommodationId:
 *           type: integer
 *           required: true
 *         dateOfDeparture:
 *           type: string
 *           required: true
 *         dateOfReturn:
 *           type: string
 *       example:
 *         departureId: 1
 *         destinationsId: 2
 *         travelReason: Tour destination
 *         accommodationId: 1
 *         dateOfDeparture: '2022-07-17'
 *         dateOfReturn: '2022-07-17'
 *   requestBodies:
 *     tripRequestBody:
 *       description: A JSON object for the trip request body
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             "$ref": "#/components/schemas/tripRequest"
 * paths:
 *   "/trips":
 *     get:
 *       security:
 *         - BearerToken: []
 *       description: It will return all trip requests owned by the user signed in.
 *       summary: It will retun all the trip requests which are owned by the user who signed in
 *         or if the user is a direct manager of the trip request owner.
 *       tags:
 *       - Trip Requests
 *       responses:
 *         '200':
 *           description: All trip requests owned by the user signed in
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
 *       description: It will create a single or multi city trip request for the user who signed in
 *       requestBody:
 *         "$ref": "#/components/requestBodies/tripRequestBody"
 *       tags:
 *       - Trip Requests
 *       responses:
 *         '201':
 *           description: The trip request is successfully created.
 *         '400':
 *           "$ref": "#/components/responses/BadRequestError"
 *         '401':
 *           "$ref": "#/components/responses/UnauthorizedError"
 *         '403':
 *           "$ref": "#/components/responses/ForbiddenError"
 *         '500':
 *           "$ref": "#/components/responses/ServerError"
 *   "/trips/{tripId}":
 *     get:
 *       security:
 *         - BearerToken: []
 *       description: It will return all trip requests owned by the user who signed in.
 *       summary: It will get the trip request with the given trip id in the path, if
 *         the trip request exists and if the user who logged in is  the owner or the direct manager
 *         of the owner.
 *       tags:
 *       - Trip Requests
 *       parameters:
 *       - schema:
 *           type: integer
 *         name: tripId
 *         in: path
 *         required: true
 *         description: id of the trip request
 *       responses:
 *         '200':
 *           description: The trip request was successfully got with the given trip id.
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
 *       description: It will update a trip request which has the trip id provided in
 *         path;
 *       summary: Updates a trip request for the trip id provided in path provided that
 *         the user logged in is the owner of the trip request and trip request has a
 *         status of "pending".
 *       requestBody:
 *         "$ref": "#/components/requestBodies/tripRequestBody"
 *       tags:
 *       - Trip Requests
 *       parameters:
 *       - schema:
 *           type: integer
 *         name: tripId
 *         in: path
 *         required: true
 *         description: id of the trip request
 *       responses:
 *         '201':
 *           description: Succefully updated trip request.
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
 *       description: It will update a trip request which has the trip id provided in
 *         path.
 *       summary: Deletes the trip request for the trip id provided in path provided
 *         that the user logged in is the owner of the trip request and trip request
 *         has a status of "pending".
 *       tags:
 *       - Trip Requests
 *       parameters:
 *       - schema:
 *           type: integer
 *         name: tripId
 *         in: path
 *         required: true
 *         description: id of the trip request
 *       responses:
 *         '201':
 *           description: All trip requests owned by the user signed in
 *         '401':
 *           "$ref": "#/components/responses/UnauthorizedError"
 *         '403':
 *           "$ref": "#/components/responses/ForbiddenError"
 *         '404':
 *           "$ref": "#/components/responses/NotFoundError"
 *         '500':
 *           "$ref": "#/components/responses/ServerError"
 *   "/trips/{tripId}/status":
 *     put:
 *       security:
 *         - BearerToken: []
 *       description: It will update a trip request which has the trip id provided in
 *         path;
 *       summary: Updates a trip request for the trip id provided in path provided that
 *         the user logged in is the owner of the trip request and trip request has a
 *         status of "pending".
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                  type: string
 *                  enum:
 *                   - Approved
 *                   - Rejected
 *       tags:
 *       - Trip Requests
 *       parameters:
 *       - schema:
 *           type: integer
 *         name: tripId
 *         in: path
 *         required: true
 *         description: id of the trip request
 *       responses:
 *         '200':
 *           description: The trip request status has been approved.
 *         '401':
 *           "$ref": "#/components/responses/UnauthorizedError"
 *         '403':
 *           "$ref": "#/components/responses/ForbiddenError"
 *         '404':
 *           "$ref": "#/components/responses/NotFoundError"
 *         '500':
 *           "$ref": "#/components/responses/ServerError"
 *
 *   "/trips/search":
 *     get:
 *       security:
 *         - BearerToken: []
 *       description: search for a trip request
 *       summary: It will return all trip request matching the given search parameters
 *       tags:
 *         - Trip Requests
 *       parameters:
 *         - in: query
 *           name: owner_id
 *           required: false
 *           description: Id for the owner of the trip request
 *         - in: query
 *           type: string
 *           name: destination
 *           required: false
 *           description: Name of destination for the trip request
 *         - in: query
 *           type: string
 *           name: departure
 *           required: false
 *           description: Name of departure for the trip request
 *         - in: query
 *           type: string
 *           name: departure_date
 *           required: false
 *           description: Date of departure for the trip request
 *         - in: query
 *           type: string
 *           name: status
 *           required: false
 *           description: Status of the trip request
 *           schema:
 *              type: string
 *              enum: [approved, pending, denied]
 *         - in: query
 *           type: string
 *           name: type
 *           required: false
 *           schema:
 *              type: string
 *              enum: [oneway, return]
 *           description: Type of trip request
 *       responses:
 *         '200':
 *           description: The trip request was successfully got with the given trip id.
 *         '401':
 *           "$ref": "#/components/responses/UnauthorizedError"
 *         '403':
 *           "$ref": "#/components/responses/ForbiddenError"
 *         '404':
 *           "$ref": "#/components/responses/NotFoundError"
 *         '500':
 *           "$ref": "#/components/responses/ServerError"
 */
