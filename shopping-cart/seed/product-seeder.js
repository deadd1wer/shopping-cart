var Product = require('../models/product');

//подключение к mongoose
var mongoose = require ('mongoose');

mongoose.connect('localhost:27017/shopping');

//пропись путей
var products = [
    new Product({
        imagePath:'images/m0851-555421.jpg',
        title: 'Geometric',
        quantity:238,
        price:10
    }),
    new Product({
        imagePath:'images/Screen-Shot-2017-05-12-at-1.18.52-PM-p-500.png',
        title: 'Prophet',
        quantity:41,
        price:5
    }),
    new Product({
        imagePath:'images/c254e43eadbd80529961ed3025a8f3f9.jpg',
        title: 'Bearskin',
        quantity:98,
        price:65
    }),
    new Product({
        imagePath:'images/kristina-balic-632481-p-1080.jpeg',
        title: 'Bump',
        quantity:116,
        price:80
    }),
    new Product({
        imagePath:'images/joanna-kosinska-375321.jpg',
        title: 'Pity',
        quantity:238,
        price:590
    }),
    new Product({
        imagePath:'images/1NLEPYGWNB.jpg',
        title: 'Homicidal',
        quantity:2,
        price:100
    }),
    new Product({
        imagePath:'images/jason-blackeye-247132.jpg',
        title: 'Bribery',
        quantity:100,
        price:80
    }),
    new Product({
        imagePath:'images/pexels-photo-185373.jpeg',
        title: 'Short-Handlebars',
        quantity:36,
        price:70
    }),
    new Product({
        imagePath:'images/otilia-stocks-52922.jpg',
        title: 'Apocalypse',
        quantity:48,
        price:310
    }),
    new Product({
        imagePath:'images/pexels-photo-135486.jpeg',
        title: 'Apocalypse2',
        quantity:48,
        price:310
    })
];

var done = 0;
for (var i = 0; i <products.length; i++) {
    //вызов products
    //для сохранении модели в db
    products[i].save(function(err, result) {
        done++;
        if(done===products.length){
            exit();
        }
    });
}

function exit(){
    mongoose.disconnect();
}
//дисконектим mongoose

