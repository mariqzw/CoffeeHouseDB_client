import { guestInstance } from './index.js'

export const createOrder = async (order) => {
    const { data } = await guestInstance.post('order/create', order)
    return data
}

export const updateOrder = async (id, order) => {    
    const { data } = await guestInstance.put(`order/update/${id}`, order)
    return data
}

export const deleteOrder = async (id) => {
    const { data } = await guestInstance.delete(`order/delete/${id}`)
    return data
}

export const fetchOrders = async (employeeId) => {
    let url = 'order/getall'
    if (employeeId) url = url + '/employeeId/' + employeeId
    const { data } = await guestInstance.get(url)
    
    return data
}

export const fetchOrder = async (id) => {
    const { data } = await guestInstance.get(`order/getone/${id}`)
    return data
}
