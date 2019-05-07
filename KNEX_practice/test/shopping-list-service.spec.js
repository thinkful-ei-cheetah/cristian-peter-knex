const ShoppingListService = require('../src/shopping-list-service')
const knex = require('knex')

describe('shopping list service object', function() {
    let db;
    let testItems = [
        {
            id: 1,
            name: 'test1',
            price: '1.00',
            Category: 'Main'
        },
        {
            id: 2,
            name: 'test2',
            price: '2.00',
            Category: 'Snack'
        },
        {
            id: 3,
            name: 'test3',
            price: '3.33',
            Category: 'Breakfast'
        },
        {
            id: 4,
            name: 'test4',
            price: '4.44',
            Category: 'Lunch'
        },
        {
            id: 5,
            name: 'test5',
            price: '5.55',
            Category: 'Main'
        }
    ];

    before(() => db('shopping_list').truncate())

    afterEach(() => db('shopping_list').truncate())

    after(() => db.destroy())

    context(`Given 'shopping_list' has data`, () => {
        beforeEach(() => {
            return db
                .into('shopping_list')
                .insert(testItems)
            })
        })

        it(`getAllItems() returns all items from 'shopping_list' table`, () => {
            const expected = testItems.map(item => ({...item}))
            return ShoppingListService.getAllItems(db)
                .then(actual => {
                    expect(actual).to.eql(expected);
                })
        } )

        it(`deleteItem() removes item by id from 'shopping_list' table`, () => {

            return
        })

        it(`updateItem() updates item by id with new fields from 'shopping_list' table`, () => {

            return
        })
        it(`insertItem() inserts item with new specified id into 'shopping_list' table`, () => {

            return
        })
        it(`getById() returns an item with the specified id from 'shopping_list' table` () => {

            return
        })
})