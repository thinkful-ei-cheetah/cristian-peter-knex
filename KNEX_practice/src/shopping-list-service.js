const ShoppingListService = {
    getAllItems(knex) {
        return knex
                .select('*')
                .from('shopping_list')
    },
    deleteItem(knex, id){
        return knex('shopping_list')
                .where({ id })
                .delete()
    },
    updateItem(knex, id, newFields){
        return knex('shopping_list')
                .where({id})
                .update(newFields)
    },
    insertItem(knex, newItem){
        return knex
                .insert(newItem)
                .into('shopping_list')
                .returning('*')
                .then(rows => rows[0])
    },
    getById(knex, id){
        return knex 
                .from('shopping_list')
                .select('*')
                .where('id',id)
                .first()
    },
}

module.exports = ShoppingListService;

// {
//     id: 3,
//     name: newFields.name,
//     price: newFields.price,
//     checked: newFields.checked,
//     category: newFields.category
// }

// {
//     id: targetId,
//     ...originalItem,
//     ...newFields
// }