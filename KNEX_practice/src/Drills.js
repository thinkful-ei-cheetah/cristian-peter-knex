require('dotenv').config();
const knex = require('knex');

const knexInst = knex({
    client:'pg',
    connection: "postgresql://dunder-mifflin:paper@localhost/knex-practice",
});

console.log('drill start work');
console.log(process.env.DB_URL)

function searchByName(searchTerm){
    knexInst
    .select('*')
    .from('shopping_list')
    .where('name', "ILIKE", `%${searchTerm}%`)
    .then(result => {
        console.log(result)
    })
}

searchByName('mi');

function paginateItems(page){
    const itemLimit = 6;
    const offset = itemLimit * (page - 1)
    knexInst
        .select( 'id','name','price','checked', 'category')
        .from('shopping_list')
        .limit(itemLimit)
        .offset(offset)
        .then(result => {
            console.log('PAGINATE ITEMS', { page })
            console.log(result)
        })
}

paginateItems(2);

function costPerCategory() {
    knexInst
      .select('category')
      .count('price as total')
      .from('shopping_list')
      .groupBy('category')
      .then(result => {
        console.log('COST PER CATEGORY')
        console.log(result)
      })
  }
  costPerCategory();