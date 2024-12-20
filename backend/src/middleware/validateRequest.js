const validateRequest = (schema) => async (req,res, next)=>{
    try {
        await schema.validate({
            body : req.body,
            query : req.query,
            params : req.params
        });
        return next();
    } catch (error) {
        console.log(error);
        return res.status(400).json({"error" : error.message})
    }
}

module.exports = validateRequest;