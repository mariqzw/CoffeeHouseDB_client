import { makeAutoObservable } from 'mobx'

class CoffeeStore {
    _cafes = []
    _employees = []
    _ds = []
    _orders = []
    _deliverys = []
    _cafe = null // выбранное кафе
    _employee = null // выбранный работник 
    _d = null
    _order = null
    _delivery = null

    constructor() {
        makeAutoObservable(this)
    }

    get deliverys() {
        return this._deliverys
    }
    get delivery() {
        return this._delivery
    }

    get orders() {
        return this._orders
    }
    get order() {
        return this._order
    }

    get ds() {
        return this._ds
    }

    get d() {
        return this._d
    }

    get employees() {
        return this._employees
    }

    get employee() {
        return this._employee
    }

    get cafes() {
        return this._cafes
    }
    get cafe() {
        return this._cafe
    }


    set deliverys(deliverys) {
        this._deliverys = deliverys
    }

    set delivery(id) {     
        this._delivery = id
    }

    set orders(orders) {
        this._orders = orders
    }

    set order(id) {     
        this._order = id
    }

    set ds(ds) {
        this._ds = ds
    }

    set d(id) {     
        this._d = id
    }
    
    set employees(employees) {
        this._employees = employees
    }

    set employee(id) {     
        this._employee = id
    }

    set cafes(cafes) {
        this._cafes = cafes
    }

    set cafe(id) {     
        this._cafe = id
    }
}

export default CoffeeStore