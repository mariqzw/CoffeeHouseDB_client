import { guestInstance } from './index.js'

export const createDessert = async (dessert) => {
    const { data } = await guestInstance.post('dessert/create', dessert)
    return data
}

export const updateDessert = async (id, dessert) => {
    const { data } = await guestInstance.put(`dessert/update/${id}`, dessert)
    return data
}

export const deleteDessert = async (id) => {
    const { data } = await guestInstance.delete(`dessert/delete/${id}`)
    return data
}


export const fetchDesserts = async (price) => {
    let url = 'dessert/getall';
    console.log('price = ', price,'!')
    if (price && price !=='')  url = url + '/'+price;
    console.log(url,'!');
    const { data } = await guestInstance.get(url)
    return data
}


export const fetchDessert = async (id) => {
    const { data } = await guestInstance.get(`dessert/getone/${id}`)
    return data
}



