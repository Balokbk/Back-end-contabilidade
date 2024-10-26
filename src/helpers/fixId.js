module.exports = (params, idKey) => {
    return {[idKey]: Number(params[idKey]) || Number(params.id)}
}