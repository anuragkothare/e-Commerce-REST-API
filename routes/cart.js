const express = require('express')
const cartController = require('../controllers/cartController')
const appConfig = require('./../config/appConfig')

let setRouter = (app) => {
    let baseUrl = appConfig.apiVersion + '/cart'

    app.post(baseUrl + '/addProducts', cartController.addProducts)

    /**
     * @api {post} /api/v1/cart/addProducts Add Products in the cart 
     * @apiVersion 0.0.1
     * @apiGroup create
     * 
     * @apiParam {[String]} productID[] the Array of productID should be passed as the URL parameter   
     * 
     * 
     * 
     * @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Products Added Successfully in Cart.",
	    "status": 200,
	    "data": [
                            {
                                    productID: "string",
                                    addedOn: Date
                                
                            }
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed to add products in Cart",
	    "status": 500,
	    "data": null
	   }
	 */

    app.post(baseUrl + '/removeProducts', cartController.removeProducts)

    /**
     * @api {post} /api/v1/cart/removeProducts Remove Products in the cart 
     * @apiVersion 0.0.1
     * @apiGroup delete
     * 
     * @apiParam {[String]} productID[] the Array of productID should be passed as the URL parameter   
     * 
     * 
     * 
     * @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Products Removed Successfully from Cart.",
	    "status": 200,
	    "data": [
                            {
                                productID: "string",
                                addedOn: Date
                                
                            }
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed to remove products from the Cart",
	    "status": 500,
	    "data": null
	   }
	 */


    app.get(baseUrl + '/viewProducts', cartController.viewProductsInCart)

    /**
     * @api {get} /api/v1/cart/viewProducts Get all products present in cart
     * @apiVersion 0.0.1
     * @apiGroup read   
     * 
     * 
     * 
     * @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Displaying all Products Present in Cart",
	    "status": 200,
	    "data": [
                            {
                                        productID: "string",
                                        name: "string",
                                        category: "string",
                                        price: number,
                                        brand: "string",
                                        isInStock: boolean,
                                        sizes: object(type = array),
                                        numberOfPiecesAvailable : number,
                                        addedOn: "date"
                            }
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To Find Product Details",
	    "status": 500,
	    "data": null
	   }
	 */
}



module.exports = {
    setRouter : setRouter
}