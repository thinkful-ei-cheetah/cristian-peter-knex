const ShoppingListService = {
    getAllItems() {
        return knex
                .select('*')
                .from('shopping_list')
    },
    deleteItem(knex, id){
        return
    },
    updateItem(knex, id, newFields){
        return
    },
    insertItem(knex, newItem){
        return
    },
    getById(knex, id){
        return 
    },
}

module.exports = ShoppingListService;