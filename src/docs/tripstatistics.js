/**
 * @openapi
 * /trips/tripstatistics:
 *  get:
 *      tags: [Trip Stats]
 *      security:
 *          - BearerToken: []
 *      summary: Only logged  user can see the stats of the requested trips.
 *      description:  Only logged  user can see the stats of the requested trips!
 *      requestBody:
 *          description: Retrieve user's Trip stats
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          from:
 *                              type: string
 *                          to:
 *                              type: string
 *      responses:
 *           200:
 *              description: successfully user's strip stats retrieved!
 *           401:
 *              description: Unauthorized 
 *           404:
 *              description: Not found
 *           500:
 *              description: internal server error
 *
 * /trips/managerstatistics:
 *  get:
 *      tags: [Trip Stats]
 *      security:
 *          - BearerToken: []
 *      summary: Only logged  manager can see the stats of the requested trips.
 *      description:  Only logged  user can see the stats of the requested trips!
 *      requestBody:
 *          description: Retrieve manager's Trip stats
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          from:
 *                              type: string
 *                          to:
 *                              type: string
 *      responses:
 *           200:
 *              description: successfully manager's strip stats retrieved!
 *           401:
 *              description: Unauthorized 
 *           404:
 *              description: Not found
 *           500:
 *              description: internal server error
 */
