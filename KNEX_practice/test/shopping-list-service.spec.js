
const ShoppingListService = require('../src/shopping-list-service')
const knex = require('knex')

describe('shopping list service object', function() {
    let db;
    let testItems = [
        {
            id: 1,
            name: 'test1',
            price: '1.00',
            category: 'Main'
        },
        {
            id: 2,
            name: 'test2',
            price: '2.00',
            category: 'Snack'
        },
        {
            id: 3,
            name: 'test3',
            price: '3.33',
            category: 'Breakfast'
        },
        {
            id: 4,
            name: 'test4',
            price: '4.44',
            category: 'Lunch'
        },
        {
            id: 5,
            name: 'test5',
            price: '5.55',
            category: 'Main'
        }
    ];
console.log(process.env.DB_URL)
    before(() => {
        db = knex({
          client: 'pg',
          connection:'postgresql://dunder-mifflin:paper@localhost/knex-practice' ,
        })
      })

    before(() => db('shopping_list').truncate())

    afterEach(() => db('shopping_list').truncate())

    after(() => db.destroy())

    context(`Given 'shopping_list' has data`, () => {
        beforeEach(() => {
            return db
                .into('shopping_list')
                .insert(testItems)
            })
        //})

        it(`getAllItems() returns all items from 'shopping_list' table`, () => {
            const expected = testItems.map(item => ({...item, checked:false}))
            return ShoppingListService.getAllItems(db)
                .then(actual => {
                    expect(actual).to.eql(expected);
                })
        } )

        it(`deleteItem() removes item by id from 'shopping_list' table`, () => {
            let targetId = 2
            return ShoppingListService.deleteItem(db,targetId)
                    .then(() => ShoppingListService.getAllItems(db))
                    .then(allItems => {
                        const expected = testItems.filter(item => item.id !== targetId).map(item => ({...item, checked:false}))
                        expect(allItems).to.eql(expected)
                    })
        })

        it(`updateItem() updates item by id with new fields from 'shopping_list' table`, () => {
                const targetId = 3;
                const originalItem = testItems[targetId - 1]
                const newFields = {
                    name: 'updateTest',
                    price: '9.99',
                    checked: true,
                    category: 'Lunch',
                }
            return ShoppingListService.updateItem(db, targetId, newFields)
                    .then(() => ShoppingListService.getById(db, targetId))
                    .then(actual => {
                        expect(actual).to.eql({
                            id: 3,
                            name: newFields.name,
                            price: newFields.price,
                            checked: newFields.checked,
                            category: newFields.category
                        })
                    })
        })
        it(`getById() returns an item with the specified id from 'shopping_list' table` ,() => {
            const targetId = 2;
            const targetItem = testItems[targetId -1];

            return ShoppingListService.getById(db,targetId)
            .then(actual => {
                expect(actual).to.eql({
                    id: targetId,
                    name: targetItem.name,
                    price: targetItem.price,
                    category: targetItem.category,
                    checked: false,
                })
            })
        })
    })
    it(`insertItem() inserts item with new specified id into 'shopping_list' table`, () => {
            const newItem = {
                name: 'testadd',
                price: '7.77',
                checked: false,
                category: 'Main'
            }
            return ShoppingListService.insertItem(db,newItem)
            .then(actual => {
                expect(actual).to.eql({
                    id:1,
                    name: newItem.name,
                    price: newItem.price,
                    checked: newItem.checked,
                    category: newItem.category,
                })
        })
    })
})