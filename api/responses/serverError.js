module.exports = function serverError(data) {
    return this.res.status(500).json(data);
}
