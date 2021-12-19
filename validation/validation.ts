import Joi from "joi"

const passwordRegExp = /^[0-9a-z!?@#$%^&*():;+-=~{}<>\_\[\]\|\\\"\'\,\.\/\`\₩]{4,}$/i;

const signUp = Joi.object({
    nickName: Joi.string().min(2).max(11).required(),
    email:Joi.string().email({minDomainSegments:2,tlds:{allow:false}}).required(),
    password:Joi.string().min(4).max(16).regex(passwordRegExp).required(),
})


export default signUp;