module.exports = function notFound(data) {
    return this.res.status(404).json(data);
}
