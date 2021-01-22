module.exports = function success(data) {
    return this.res.status(200).json(data);
}
