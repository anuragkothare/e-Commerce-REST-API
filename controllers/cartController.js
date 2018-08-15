const mongoose = require('mongoose')
const shortid = require('shortid')
const bodyParser = require('body-parser')
const response = require('./../libs/responseLib')
const time = require('./../libs/timeLib')
const check = require('./../libs/checkLib')
const logger = require('./../libs/loggerLib')

//importing the model here
const ProductModel = mongoose.model('Product')

// Importing the Cart Model
const CartModel = mongoose.model('Cart')




// method to add Product into Cart
let addProducts = (req, res) => {
   
    CartModel.find((err, carts) => {
        if(err) {
            res.send(err)
        } else {
            // if cart dosen't exist
            if(carts === undefined || carts.length === 0) {
                var cart = new CartModel({
                    productIds:[],
                    addedOn: Date.now()
                })
                // If Cart exit then use same cart
            } else {
               var cart = carts[0]
            }
            // console.log(cart)

            var productIds = req.body.products
            // console.log(productsIds)
            console.log(cart)
                for(var productId of productIds) {
                    
                    if(!cart.productIds.includes(productId)) {
                        cart.productIds.push(productId)
                    }
                }
                cart.save((err, result) => {
                if(err) {
                    console.log(err)
                    logger.error(`Error Occured : ${err}`, 'Database', 10)
                    let apiResponse = response.generate(true, 'Failed to add products in Cart', 500, null)
                } else {
                    let apiResponse = response.generate(false, 'Products Added Successfully in Cart.', 200, result)
                    res.send(apiResponse)
                }
            })  
        }
    }) 
}


// method to remove Products from Cart
let removeProducts = (req, res) => {

    CartModel.find((err, carts) => {
        if(err) {
            res.send(err)
        } else {
            if(carts === undefined || carts.length === 0) {
                res.send("Cart Dosen't Exist")
            } else {
                var cart = carts[0]
            }

            // get productids from req
            var productIds = req.body.products

            // delete productids from cart object only if given productid exist already in cart
            for(var id of productIds) {
                if(cart.productIds.includes(id)) {
                    var index = cart.productIds.indexOf(id)
                    cart.productIds.splice(index, 1)
                }
            }
            cart.save((err, result) => {
                if(err) {
                    console.log(err)
                    logger.error(`Error Occured : ${err}`, 'Database', 10)
                    let apiResponse = response.generate(true, 'Failed to remove products from the Cart', 500, null)
                } else {
                    let apiResponse = response.generate(false, 'Products Removed Successfully from Cart.', 200, result)
                    res.send(apiResponse)
                }
            })  
        }
    })
}

// method to get all Products from Cart
//GET
let viewProductsInCart = (req, res) => {
    // get all productids from cart object
    CartModel.find((err, carts) => {
        if(err){
            res.send(err)
        } else {
            if(carts === undefined || carts.length === 0) {
                res.send("Cart is Empty")
            } else {
                var cart = carts[0]
                console.log(cart.productIds)

                ProductModel.find({ productID:  { $in: cart.productIds} } , (err, products) => {
                    if(err) {
                        console.log(err)
                        logger.error(`Error Occured : ${err}`, 'Database', 10)
                        let apiResponse = response.generate(true, 'Failed to get products from the cart', 500, null)
                res.send(apiResponse)
                    } else {
                        console.log(products)
                        let apiResponse = response.generate(false, 'Displaying all Products Present in Cart', 200, products)
                        res.send(apiResponse)
                    }
                })
                 
            }
        }
    })
    
    // get products from those product ids
    // return list of product    
}

module.exports = {
    addProducts,
    removeProducts,
    viewProductsInCart
}
