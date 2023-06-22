import { guestInstance } from './index.js'

export const createDrink = async (drink) => {
    const { data } = await guestInstance.post('drink/create', drink)
    return data
}

export const updateDrink = async (id, drink) => {
    const { data } = await guestInstance.put(`drink/update/${id}`, drink)
    return data
}

export const deleteDrink = async (id) => {
    const { data } = await guestInstance.delete(`drink/delete/${id}`)
    return data
}


export const fetchDrinks = async (price) => {
    let url = 'drink/getall';
    console.log('price = ', price,'!')
    if (price && price !=='')  url = url + '/'+price;
    console.log(url,'!');
    const { data } = await guestInstance.get(url)
    return data
}

// export const fetchDrinks = async () => {
//     const { data } = await guestInstance.get('drink/getall')
//     return data
// }

// export const fetchDrinks = async (price) => {
//     let url = 'drink/getall'
//     if (price) url = url + '?price=' + price
//     const { data } = await guestInstance.get(url)
//     return data
// }

export const fetchDrink = async (id) => {
    const { data } = await guestInstance.get(`drink/getone/${id}`)
    return data
}



