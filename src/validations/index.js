const Joi = require('joi');

function validateToDo(list){
    const schema = Joi.object({
        text: Joi.string().required(),
        iscompleted: Joi.boolean().required()
    })

    return schema.validate(list);
}

module.exports = validateToDo;