/**
 * @openapi
 * components:
 *   responses:
 *     Success:
 *       description: Successfully fetched the most travelled location(s).
 *     UnauthorizedError:
 *       description: Not Authenticated.
 *     ForbiddenError:
 *       description: Not authorizedion.
 *     InternalError:
 *       description: Internal error
 *     NotFoundError:
 *       description: No such trip found
 *     BadRequestError:
 *       description: Invalid format or missing fields.
 * paths:
 *   "/locations/stats":
 *     get:
 *       security:
 *         - BearerToken: []
 *       description: It will return the most traveled locations
 *       summary: It will retrieve 3 most travelled locations
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
 */


















