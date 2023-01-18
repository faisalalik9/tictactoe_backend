async function errorHandler(err,res){
    console.log(err);
    if(typeof err === "string"){
        const is404 = err.toLowerCase().endsWith("not found");
        const statusCode = is404 ? 404 : 400;
        return res.status(statusCode),json({msg : err, code : statusCode});
    }

    if(err.name === "Unauthorized Error"){
        return res.status(401).json({msg : "invalid Error", code : 401});
    }

    return res.status(500).json({msg : err.message, code: 500});
}

export default errorHandler;