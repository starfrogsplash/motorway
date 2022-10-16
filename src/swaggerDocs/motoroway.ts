/**
@swagger
* components:
*     schemas:
*       statelog:
*         type: object
*         required:
*           - id
*           - make
*         properties:
*           id:
*             type: string
*             description: The id of the vehicle.
*           make:
*             type: string
*             description: the state of the vehicle
*           model:
*             type: string
*             description: the state of the vehicle
*           state:
*             type: string
*             description: the state of the vehicle
*         example:
*            - id: 3
*              make: bmv
*              model: m3
*              state: review
*              timeStamp: 2022-10-10T21:19:55.000Z
*       latest:
*         type: array
*         items:
*           type: object
*         properties:
*           make:
*             type: string
*             description: The make of the vehicle.
*         example:
*            - id: 3
*              make: bmv
*              model: m3
*              state: review
*              timeStamp: 2022-10-10T21:19:55.000Z
*/

/** 
 *@swagger
 *  tags:
 *    name: motorway
 *    description: API to manage vehicles states.
 */

/**
 * @swagger
 * /motorway/{id}/{timeStamp}:
 *    get:
 *      summary: get entry of statelog based on timestamp and vehicle id
 *      tags: [motorway]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the statelog
 *        - in: path
 *          name: timeStamp
 *          schema:
 *            type: string
 *          required: true
 *          description: timeStamp of the statelog in iso string format
 *          example:
 *            '2022-10-10T20:03:21Z'
 *      responses:
 *        "200":
 *          description: return statelog
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/latest'
 */