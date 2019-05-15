exports.authentication = (req, res, next) => {
    console.log(req.url);
    next();
}

exports.authorization = function (req, res, next) {
    console.log(req.baseUrl);
    next();
}