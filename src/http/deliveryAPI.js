import { guestInstance } from './index.js'

export const createDelivery = async (delivery) => {
    const { data } = await guestInstance.post('delivery/create', delivery)
    return data
}

export const updateDelivery = async (id, delivery) => {    
    const { data } = await guestInstance.put(`delivery/update/${id}`, delivery)
    return data
}

export const deleteDelivery = async (id) => {
    const { data } = await guestInstance.delete(`delivery/delete/${id}`)
    return data
}

export const fetchDeliverys = async (employeeId) => {
    let url = 'delivery/getall'
    if (employeeId) url = url + '/employeeId/' + employeeId
    const { data } = await guestInstance.get(url)
    
    return data
}

export const fetchDelivery = async (id) => {
    const { data } = await guestInstance.get(`delivery/getone/${id}`)
    return data
}
