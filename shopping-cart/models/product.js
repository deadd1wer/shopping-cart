var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//сохдание объекта ,в базе данных (
var schema = new Schema({
    //картинки
    imagePath: {type: String, required: true},
    title: {type: String, required: true},
    quantity: {type: Number, required: true},
    price: {type: Number, required: true}
});

//Экспортируем модели
module.exports = mongoose.model('Product', schema);