const mongoose = require('mongoose');
const papa = require('papaparse');
const fs = require('fs');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://rafiel:2203@172.26.0.3:27017/admin?authMechanism=DEFAULT&authSource=admin');
    
    // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
    const economy = new mongoose.Schema({
        Year: String,
        Country_Name: String,
        GDP: Number,
        GDP_Per_Capita: Number,
        GDP_growth: Number,
        imports_of_goods_and_services: Number,
        exports_of_goods_and_services: Number,
        total_reserves: Number,
        inflation: Number,
        population: Number,
        population_growth: Number,
        life_expectancy: Number,
    });

    const economyData = mongoose.model('indianEconomy', economy);

    const csv = fs.readFileSync('./data/indianEconomy/indianEco.csv', 'utf8');
    const data = papa.parse(csv, { header: true, skipEmptyLines: true });

    economyData.insertMany(data.data, function(error, docs) {});
    
}