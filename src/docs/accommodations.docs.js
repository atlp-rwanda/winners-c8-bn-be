/**
 * @openapi
 * tags:
 *   - name: accommodations
 *   - name: accommodation_rooms
 * paths:
 *   /accommodations/:
 *     post:
 *       tags:
 *         - accommodations
 *       summary: add a new accommodation facility
 *       requestBody:
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: Kigali Hostels
 *                 description:
 *                   type: string
 *                   example: this is a good house, I swear.
 *                 location_id:
 *                   type: integer
 *                   example: "2"
 *                 accommodation_image:
 *                   type: string
 *                   format: binary
 *                 latitude:
 *                   type: number
 *                   example: "15.234"
 *                 longitude:
 *                   type: string
 *                   example: "-100"
 *       security:
 *         - BearerToken: []
 *       responses:
 *         "201":
 *           description: Successful response
 *           content:
 *             application/json: {}
 *         "400":
 *           description: Bad request (validation)
 *           content:
 *             application/json: {}
 *         "401":
 *           description: Unauthorized (something wrong with auth token)
 *           content:
 *             application/json: {}
 *         "403":
 *           description: Forbidden (user not allowed to do this)
 *           content:
 *             application/json: {}
 *         "500":
 *           description: Internal server error
 *           content:
 *             application/json: {}
 *     get:
 *       tags:
 *         - accommodations
 *       summary: fetch accommodations (all)
 *       security:
 *         - BearerToken: []
 *       responses:
 *         "200":
 *           description: Successful response
 *           content:
 *             application/json: {}
 *         "401":
 *           description: Unauthorized (something wrong with auth token)
 *           content:
 *             application/json: {}
 *         "500":
 *           description: Internal server error
 *           content:
 *             application/json: {}
 *   "/accommodations/{accommodationID}/":
 *     patch:
 *       tags:
 *         - accommodations
 *       summary: patches an accommodation entry (use form data & can add an image file)
 *       parameters:
 *         - name: accommodationID
 *           in: path
 *           description: specifies the id of the accommodation facility
 *           required: true
 *           schema:
 *             type: string
 *       requestBody:
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: New Home
 *                 description:
 *                   type: string
 *                   example: A large laboratory for humanity
 *                 location_id:
 *                   type: integer
 *                   example: "3"
 *                 accommodation_image:
 *                   type: string
 *                   format: binary
 *                 latitude:
 *                   type: string
 *                   example: "-20"
 *                 longitude:
 *                   type: integer
 *                   example: "123"
 *       security:
 *         - BearerToken: []
 *       responses:
 *         "201":
 *           description: Successful response
 *           content:
 *             application/json: {}
 *         "400":
 *           description: Bad request (validation)
 *           content:
 *             application/json: {}
 *         "401":
 *           description: Unauthorized (something wrong with auth token)
 *           content:
 *             application/json: {}
 *         "403":
 *           description: Forbidden (user not allowed to do this)
 *           content:
 *             application/json: {}
 *         "500":
 *           description: Internal server error
 *           content:
 *             application/json: {}
 *   "/accommodations/{accommodationID}":
 *     patch:
 *       tags:
 *         - accommodations
 *       summary:
 *         patches an accommodation entry (uses JSON in req.body & cannot upload
 *         an image)
 *       parameters:
 *         - name: accommodationID
 *           in: path
 *           description: specifies the id of the accommodation facility
 *           required: true
 *           schema:
 *             type: string
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 name: Toronto Hotel
 *                 description: capital street, Toronto, Ontario
 *                 location_id: 1
 *                 latitude: 20.57
 *                 longitude: -10.32
 *                 images_links:
 *                   - https://freesvg.org/img/SC0007.Scribble-house.png
 *                   - https://freesvg.org/img/maison2.png
 *                 add_on_services:
 *                   - name: Car
 *                     details: A five-seats car is proviced.
 *                   - name: Pool
 *                     details: a 3x3x3 metres swimming pool.
 *                 amenities:
 *                   - name: Car
 *                     details: A five-seats car is proviced.
 *                   - name: Pool
 *                     details: a 3x3x3 metres swimming pool.
 *       security:
 *         - BearerToken: []
 *       responses:
 *         "201":
 *           description: Successful response
 *           content:
 *             application/json: {}
 *         "400":
 *           description: Bad request (validation)
 *           content:
 *             application/json: {}
 *         "401":
 *           description: Unauthorized (something wrong with auth token)
 *           content:
 *             application/json: {}
 *         "403":
 *           description: Forbidden (user not allowed to do this)
 *           content:
 *             application/json: {}
 *         "500":
 *           description: Internal server error
 *           content:
 *             application/json: {}
 *   "/accommodations/{accomodationID}":
 *     get:
 *       tags:
 *         - accommodations
 *       summary: fetches an accommodation facility (one)
 *       parameters:
 *         - name: accomodationID
 *           in: path
 *           description: specifies the id of the accommodation facility
 *           required: true
 *           schema:
 *             type: string
 *       security:
 *         - BearerToken: []
 *       responses:
 *         "200":
 *           description: Successful response
 *           content:
 *             application/json: {}
 *         "401":
 *           description: Unauthorized (something wrong with auth token)
 *           content:
 *             application/json: {}
 *         "500":
 *           description: Internal server error
 *           content:
 *             application/json: {}
 *   "/accommodations/{accomodationID}/":
 *     delete:
 *       tags:
 *         - accommodations
 *       summary: deletes an accommodation facility with its rooms.
 *       parameters:
 *         - name: accomodationID
 *           in: path
 *           description: specifies the id of the accommodation facility
 *           required: true
 *           schema:
 *             type: string
 *       security:
 *         - BearerToken: []
 *       responses:
 *         "201":
 *           description: Successful response
 *           content:
 *             application/json: {}
 *         "400":
 *           description: Bad request (validation)
 *           content:
 *             application/json: {}
 *         "401":
 *           description: Unauthorized (something wrong with auth token)
 *           content:
 *             application/json: {}
 *         "403":
 *           description: Forbidden (user not allowed to do this)
 *           content:
 *             application/json: {}
 *         "500":
 *           description: Internal server error
 *           content:
 *             application/json: {}
 *   "/accommodations/{accommodationID}/rooms/":
 *     post:
 *       tags:
 *         - accommodation_rooms
 *       summary: adds a new room
 *       parameters:
 *         - name: accommodationID
 *           in: path
 *           description: specifies the id of the accommodation facility
 *           required: true
 *           schema:
 *             type: string
 *       requestBody:
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 bed_type:
 *                   type: string
 *                   example: aklsdjkl
 *                 cost:
 *                   type: integer
 *                   example: "10333333333333"
 *                 room_image:
 *                   type: string
 *                   format: binary
 *       security:
 *         - BearerToken: []
 *       responses:
 *         "201":
 *           description: Successful response
 *           content:
 *             application/json: {}
 *         "400":
 *           description: Bad request (validation)
 *           content:
 *             application/json: {}
 *         "401":
 *           description: Unauthorized (something wrong with auth token)
 *           content:
 *             application/json: {}
 *         "403":
 *           description: Forbidden (user not allowed to do this)
 *           content:
 *             application/json: {}
 *         "500":
 *           description: Internal server error
 *           content:
 *             application/json: {}
 *   "/accommodations/{accommodationID}/rooms/{roomId}":
 *     patch:
 *       tags:
 *         - accommodation_rooms
 *       summary: patches a room entry (use form data & can add an image file)
 *       parameters:
 *         - name: accommodationID
 *           in: path
 *           description: specifies the id of the accommodation facility
 *           required: true
 *           schema:
 *             type: string
 *         - name: roomId
 *           in: path
 *           description: specifies the id of the room
 *           required: true
 *           schema:
 *             type: string
 *       requestBody:
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 bed_type:
 *                   type: string
 *                   example: x-large
 *                 cost:
 *                   type: integer
 *                   example: "500"
 *                 room_image:
 *                   type: string
 *                   format: binary
 *       security:
 *         - BearerToken: []
 *       responses:
 *         "200":
 *           description: Successful response
 *           content:
 *             application/json: {}
 *   "/accommodations/{accomodationID}/rooms/{roomId}":
 *     patch:
 *       tags:
 *         - accommodation_rooms
 *       summary: patches a room entry (uses JSON in req.body & cannot upload an image)
 *       parameters:
 *         - name: accomodationID
 *           in: path
 *           description: specifies the id of the accommodation facility
 *           required: true
 *           schema:
 *             type: string
 *         - name: roomId
 *           in: path
 *           description: specifies the id of the room
 *           required: true
 *           schema:
 *             type: string
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 accommodation_id: 2
 *                 bed_type: x-large
 *                 cost: 500
 *                 images_links:
 *                   - http://res.cloudinary.com/pacomesimon/image/upload/v1656659553/accommodations/rooms/fxpxvn4abwqhk6rubdqz.png
 *                   - http://res.cloudinary.com/pacomesimon/image/upload/v1656659711/accommodations/rooms/ydqavljua7zx3hnayfuf.png
 *       security:
 *         - BearerToken: []
 *       responses:
 *         "201":
 *           description: Successful response
 *           content:
 *             application/json: {}
 *         "400":
 *           description: Bad request (validation)
 *           content:
 *             application/json: {}
 *         "401":
 *           description: Unauthorized (something wrong with auth token)
 *           content:
 *             application/json: {}
 *         "403":
 *           description: Forbidden (user not allowed to do this)
 *           content:
 *             application/json: {}
 *         "500":
 *           description: Internal server error
 *           content:
 *             application/json: {}
 *   "/accommodations/{accommodationId}/rooms":
 *     get:
 *       tags:
 *         - accommodation_rooms
 *       summary: fetches all rooms, for one accommodation facility
 *       parameters:
 *         - name: accommodationId
 *           in: path
 *           description: specifies the id of the accommodation facility
 *           required: true
 *           schema:
 *             type: string
 *       security:
 *         - BearerToken: []
 *       responses:
 *         "200":
 *           description: Successful response
 *           content:
 *             application/json: {}
 *         "401":
 *           description: Unauthorized (something wrong with auth token)
 *           content:
 *             application/json: {}
 *         "500":
 *           description: Internal server error
 *           content:
 *             application/json: {}
 *   "/accommodations/{accommodationId}/rooms/{roomId}":
 *     delete:
 *       tags:
 *         - accommodation_rooms
 *       summary: deletes a single room entry
 *       parameters:
 *         - name: accommodationId
 *           in: path
 *           description: specifies the id of the accommodation facility
 *           required: true
 *           schema:
 *             type: string
 *         - name: roomId
 *           in: path
 *           description: specifies the id of the room
 *           required: true
 *           schema:
 *             type: string
 *       security:
 *         - BearerToken: []
 *       responses:
 *         "201":
 *           description: Successful response
 *           content:
 *             application/json: {}
 *         "400":
 *           description: Bad request (validation)
 *           content:
 *             application/json: {}
 *         "401":
 *           description: Unauthorized (something wrong with auth token)
 *           content:
 *             application/json: {}
 *         "403":
 *           description: Forbidden (user not allowed to do this)
 *           content:
 *             application/json: {}
 *         "500":
 *           description: Internal server error
 *           content:
 *             application/json: {}
 */