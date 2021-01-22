module.exports = function error(data) {
    return this.res.status(500).json(data);
}
