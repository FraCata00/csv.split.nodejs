const fs = require('fs')
const csv = require('csv-parser')
const products = []; //product on catalog.csv
//name, price, category, weight, images_url
function generateProduct(nameP, price, category, weight, images_url) {
    return `${nameP}-${price}-${category}-${weight}-${images_url}`
}
fs.createReadStream('catalog.csv')
    .pipe(csv())
    .on('data', function(row) {

        const product = {
            nameP: row.nameP,
            price: row.price,
            category: row.category,
            weight: row.weight,
            images_url: row.images_url
        }
        products.push(product)
    })
    .on('end', function() {
        console.table(products)
        writeToCSVFile(products)
    })

function writeToCSVFile(products) {
    const filename = 'output.csv';
    fs.writeFile(filename, extractAsCSV(products), err => {
        if (err) {
            console.log('Error writing to csv file', err);
        } else {
            console.log(`saved as ${filename}`);
        }
    });
}

function extractAsCSV(products) {
    const header = ["Name, Price, Category, Weight, Images_Url"];
    const rows = products.map(product =>
        `${product.nameP}, ${product.price}, ${product.category}, ${product.weight}, ${product.images_url}`
    );
    return header.concat(rows).join("\n");
}