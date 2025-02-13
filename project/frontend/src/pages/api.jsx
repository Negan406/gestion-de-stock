import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/inventories', // Replace with your Laravel app URL
});

// Fetch all inventories
export const getInventories = () => api.get('/inventories');

// Add a new inventory
export const addInventory = (inventory) => api.post('/inventories', inventory);