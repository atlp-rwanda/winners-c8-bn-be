    /**
    * @swagger
    * /api/assignRole:
    *   patch:
    *       tags: [Role]
    *       summary: This is to assign new role to application's user, 
    *       description: Only logged in super administrator can assign new role to the user! 
    *       parameters:
    *       - name: email,
    *         in: body,
    *         type: string,
    *         required: true,
    *         description: User Email,
    * 
    *       - name: roleId,
    *         in: body,
    *         type: string,
    *         required: true,
    *         description: Role that we are going to assign to user
    *         
    *       responses:
    *           201:
    *               description: Successfully user role updated!,
    *           404:
    *               description: User doesn't exist,
    *           500:
    *               description: Internal server error
    *             
    */
    
