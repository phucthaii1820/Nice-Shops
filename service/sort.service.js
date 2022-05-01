const sortAscending = function(data) {
    data.sort(function(a, b) {
        return a.price - b.price;
    })
    return data;
}

const sortDescending = function(data) {
    data.sort(function(a, b) {
        return b.price - a.price;
    })
    return data;
}

export default{
    sortAscending,
    sortDescending
}