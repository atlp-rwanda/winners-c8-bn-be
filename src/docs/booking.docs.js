/**
 * @openapi
 * /rooms/{roomId}/booking:
 *   post:
 *      security:
 *          - BearerToken: []
 *      tags: [Room Booking]
 *      summary: It helps travellers to book rooms in an accommodation facility to assure place to stay at the destination.
 *      description: Only requester users are allowed to book rooms in an accommodation.
 *      parameters:
 *              - name: roomId
 *                in: path
 *                description: roomId to be booked!
 *                required: true
 *      requestBody:
 *          description: Book Accommodation
 *          required: true
 *          content:
 *            application/json:
 *                  schema:
 *                       type: object
 *                       properties:
 *                           tripId:
 *                               type: integer
 *                           from:
 *                               type: string
 *                           to:
 *                               type: string
 *                  example:
 *                      tripId: 100
 *                      from: '2022-07-10' 
 *                      to: '2023-01-01'  
 *      responses:
 *         201:
 *           description: Room Booked Successfully!
 *         400:
 *           description: Bad Request!
 *         401:
 *           description: Unauthorized  
 *         500:
 *           description: Internal Server Error
 * 
 * 
 * /rooms/{roomId}/freeRoom:
 *   post:
 *      tags: [Room Booking]
 *      summary: It makes room available once it was booked.
 *      description: Only travel admin is allowed to free the room.
 *      parameters:
 *              - name: roomId
 *                in: path
 *                required: true
 *      responses:
 *          200:
 *             description: Room is set to free now.
 *          401:
 *             description: Unauthorized | only travel admin
 *          404:
 *             description: Not found
*/
