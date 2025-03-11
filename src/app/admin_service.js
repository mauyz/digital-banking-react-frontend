import { apiClient } from "./auth_service"

export const getCutomers = () => {
    return apiClient().get("/customers");
}

export const getCustomer = (customerId) => {
    return apiClient().get(`/customers/${customerId}`);
}

export const deleteCutomer = (customer) => {
    return apiClient().delete(`/customers/${customer.id}`);
}

export const saveCutomer = (customer) => {
    return apiClient().post('/customers', customer);
}

export const saveCutomerWithUser = (customer) => {
    return apiClient().post('/customers/user', customer);
}

export const updateCutomer = (id, customer) => {
    return apiClient().put(`/customers/${id}`, customer);
}