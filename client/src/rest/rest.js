function request(method) {
    const getAuthHeader = () => {
        return localStorage.getItem('token') ? 
        { 'Authorization' : `Bearer ${localStorage.getItem('token')}`} :
        '';
    }
    return async (url, data = {}, options = {}) => {
        const authHeader = getAuthHeader();
        const response =  await fetch(url , {
            method,
            headers: {
                'Content-Type' : 'application/json',
                'Access-Control-Allow-Origin': '*',
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