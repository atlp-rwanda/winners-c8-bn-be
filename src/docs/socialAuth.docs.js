/**
 * @openapi
 * tags:
 *   - name: social_oauth
 * paths:
 *   /oauth/google:
 *     get:
 *       tags:
 *         - social_oauth
 *       summary: Logs in using google
 *       responses:
 *         "200":
 *           description: Displays a google login form
 *           examples:
 *             text/html:
 *               <html><body>HTML form</body></html>
 *   /oauth/facebook:
 *     get:
 *       tags:
 *         - social_oauth
 *       summary: Logs in using facebook
 *       responses:
 *         "200":
 *           description: Displays a google login form
 *           examples:
 *             text/html:
 *               <html><body>HTML form</body></html>
 */