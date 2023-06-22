import { guestInstance } from './index.js'
/*
 * Создание, обновление и удаление кофейни, получение списка всех кофеен
 */
export const createCafe = async (cafe) => {
    const { data } = await guestInstance.post('cafe/create', cafe)
    return data
}

export const updateCafe = async (id, cafe) => {
    const { data } = await guestInstance.put(`cafe/update/${id}`, cafe)
    return data
}

export const deleteCafe = async (id) => {
    const { data } = await guestInstance.delete(`cafe/delete/${id}`)
    return data
}

export const fetchCafes = async () => {
    const { data } = await guestInstance.get('cafe/getall')
    return data
}

export const fetchCafe = async (id) => {
    const { data } = await guestInstance.get(`cafe/getone/${id}`)
    return data
}

