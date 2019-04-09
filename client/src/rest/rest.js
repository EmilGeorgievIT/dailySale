function request(method) {
    return async (url, data = {}, options = {}) => {
        const response =  await fetch(url , {
            method,
            headers: {
                'Content-Type' : 'application/json'
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