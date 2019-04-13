function request(method) {
    const getAuthHeader = () => {
        return sessionStorage.getItem('token') ? 
        { 'Authorization' : `Bearer sessionStorage.getItem('token')`} :
        '';
    }
    return async (url, data = {}, options = {}) => {
        const authHeader = getAuthHeader();
        const response =  await fetch(url , {
            method,
            headers: {
                'Content-Type' : 'application/json',
                ...authHeader
            },
            body: Object.keys(data).length ?
            JSON.stringify(data) : 
            undefined,
            ...options,
        })
        return response.json();
    }
}

export const get = request('get');
export const post = request('post');
export const remove = request('delete');
export const put = request('put');