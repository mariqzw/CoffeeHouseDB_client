import { guestInstance } from './index.js'

export const createEmployee = async (employee) => {
    const { data } = await guestInstance.post('employee/create', employee)
    return data
}

export const updateEmployee = async (id, employee) => {    
    const { data } = await guestInstance.put(`employee/update/${id}`, employee)
    return data
}

export const deleteEmployee = async (id) => {
    const { data } = await guestInstance.delete(`employee/delete/${id}`)
    return data
}

export const fetchEmployees = async (cafeId) => {
    let url = 'employee/getall'
    if (cafeId) url = url + '/cafeId/' + cafeId
    const { data } = await guestInstance.get(url)
    return data
}


export const fetchEmployee = async (id) => {
    const { data } = await guestInstance.get(`employee/getone/${id}`)
    return data
}
