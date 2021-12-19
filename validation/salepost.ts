import Joi from "joi"

const salePostUp = Joi.object({
    title:Joi.string().required() , 
    productName:Joi.string().required(), 
    price:Joi.number(), 
    contents:Joi.string().required(),
})


export default salePostUp;