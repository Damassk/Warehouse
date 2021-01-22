module.exports = function badRequest(data) {
    return this.res.status(400).json(data);
}
