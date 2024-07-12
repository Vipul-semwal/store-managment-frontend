import axios from "axios";

class Data {
    constructor(url) {
        this.url = url
    }

    async ItemMaster(data) {
        try {
            const result = await axios.post(`${this.url}/add-item`, data, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log("Response from server:", result);

            return result;
        } catch (error) {
            console.log('error', error)
            if (error.response) {
                return error.response
            } else if (error.request) {
                console.error('No response received:', error.request);
                return null
            } else {
                return null
            }
        }
    }

    async CreateCategory(data) {
        try {
            const result = await axios.post(`${this.url}/create-catagory`, data, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log("Response from server:", result);

            return result;
        } catch (error) {
            console.log('error', error)
            if (error.response) {
                return error.response
            } else if (error.request) {
                console.error('No response received:', error.request);
                return null
            } else {
                return null
            }
        }
    }

    async CreateUnit(data) {
        try {
            const result = await axios.post(`${this.url}/create-unit`, data, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log("Response from server:", result);

            return result;
        } catch (error) {
            console.log('error', error)
            if (error.response) {
                return error.response
            } else if (error.request) {
                console.error('No response received:', error.request);
                return null
            } else {
                return null
            }
        }
    }

    async PartieRegister(data) {
        try {
            const result = await axios.post(`${this.url}/add-partie`, data, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log("Response from server:", result);

            return result;
        } catch (error) {
            console.log('error', error)
            if (error.response) {
                return error.response
            } else if (error.request) {
                console.error('No response received:', error.request);
                return null
            } else {
                return null
            }
        }
    }

    async PurchaseRegister(data) {
        try {
            const result = await axios.post(`${this.url}/purchase-item`, data, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log("Response from server:", result);

            return result;
        } catch (error) {
            console.log('error', error)
            if (error.response) {
                return error.response
            } else if (error.request) {
                console.error('No response received:', error.request);
                return null
            } else {
                return null
            }
        }
    }

    async SalesEntry(data) {
        try {
            const result = await axios.post(`${this.url}/sales-entry`, data, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log("Response from server:", result);

            return result;
        } catch (error) {
            console.log('error', error)
            if (error.response) {
                return error.response
            } else if (error.request) {
                console.error('No response received:', error.request);
                return null
            } else {
                return null
            }
        }
    }

    async Cashbook(data) {
        try {
            const result = await axios.post(`${this.url}/add-to-cash-book`, data, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log("Response from server:", result);

            return result;
        } catch (error) {
            console.log('error', error)
            if (error.response) {
                return error.response
            } else if (error.request) {
                console.error('No response received:', error.request);
                return null
            } else {
                return null
            }
        }
    }

    async intialCashAmmount(data) {
        try {
            const result = await axios.post(`${this.url}/inital-amout-cash-book`, data, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log("Response from server:", result);

            return result;
        } catch (error) {
            console.log('error', error)
            if (error.response) {
                return error.response
            } else if (error.request) {
                console.error('No response received:', error.request);
                return null
            } else {
                return null
            }
        }
    }
    // get data from db

    async GetUserData() {
        try {
            const result = await axios.get(`${this.url}/get-data`, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log("Response from server:", result);

            return result;
        } catch (error) {
            console.log('error', error)
            if (error.response) {
                return error.response
            } else {
                console.log('nothing received')
                return null
            }
        }
    }

    async GetPurchaseData(data) {
        try {
            const result = await axios.get(`${this.url}/get-purchase-data?${data}`, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log("Response from server:", result);

            return result;
        } catch (error) {
            console.log('error', error)
            if (error.response) {
                return error.response
            } else if (error.request) {
                console.error('No response received:', error.request);
                return null
            } else {
                return null
            }
        }
    }

    async GetSalesData(data) {
        try {
            const result = await axios.get(`${this.url}/get-sales-data?${data}`, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log("Response from server:", result);

            return result;
        } catch (error) {
            console.log('error', error)
            if (error.response) {
                return error.response
            } else if (error.request) {
                console.error('No response received:', error.request);
                return null
            } else {
                return null
            }
        }
    }

    async GetCashBook(data) {
        try {
            const result = await axios.get(`${this.url}/get-cash-book-data?${data}`, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log("Response from server:", result);

            return result;
        } catch (error) {
            console.log('error', error)
            if (error.response) {
                return error.response
            } else if (error.request) {
                console.error('No response received:', error.request);
                return null
            } else {
                return null
            }
        }
    }

    async BillNoData(data) {
        try {
            const result = await axios.get(`${this.url}/get-bill-no/${data}`, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log("Response from server:", result);

            return result;
        } catch (error) {
            console.log('error', error)
            if (error.response) {
                return error.response
            } else if (error.request) {
                console.error('No response received:', error.request);
                return null
            } else {
                return null
            }
        }
    }

    async GetAllbills(data) {
        try {
            const result = await axios.get(`${this.url}/get-all-bill?${data}`, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log("Response from server:", result);

            return result;
        } catch (error) {
            console.log('error', error)
            if (error.response) {
                return error.response
            } else if (error.request) {
                console.error('No response received:', error.request);
                return null
            } else {
                return null
            }
        }
    }

    // update apis
    async UpdateItem(data) {

        try {
            const result = await axios.put(`${this.url}/update-item`, data, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log("Response from server:", result);

            return result;
        } catch (error) {
            console.log('error', error)
            if (error.response) {
                return error.response
            } else if (error.request) {
                console.error('No response received:', error.request);
                return null
            } else {
                return null
            }
        }
    }

    async UpdatePartie(data) {

        try {
            const result = await axios.put(`${this.url}/update-partie`, data, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log("Response from server:", result);

            return result;
        } catch (error) {
            console.log('error', error)
            if (error.response) {
                return error.response
            } else if (error.request) {
                console.error('No response received:', error.request);
                return null
            } else {
                return null
            }
        }
    }

    // Delete apis
    async DeletePartie(data) {

        try {
            const result = await axios.delete(`${this.url}/delete-partie`, {
                data: { id: data },
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            console.log("Response from server:", result);

            return result;
        } catch (error) {
            console.log('error', error)
            if (error.response) {
                return error.response
            } else if (error.request) {
                console.error('No response received:', error.request);
                return null
            } else {
                return null
            }
        }
    }

    async DeleteItem(data) {
        try {
            const result = await axios.delete(`${this.url}/delete-item`, {
                data: { id: data },
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            console.log("Response from server:", result);

            return result;
        } catch (error) {
            console.log('error', error)
            if (error.response) {
                return error.response
            } else if (error.request) {
                console.error('No response received:', error.request);
                return null
            } else {
                return null
            }
        }
    }

}

const dataApi = new Data('https://store-management-backend-vjn4.onrender.com')

export default dataApi