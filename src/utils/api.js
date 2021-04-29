import axios from 'axios'
import qs from 'qs';

let base = 'http://121.196.98.32:8080/api';
export const getRequest = (url, params) => {
    params = '?'+qs.stringify(params)
    console.log(params)
    return axios({
        method: 'get',
        url: `${base}${url}${params}`,
    });
}
export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params,
        transformRequest: [function (data) {
            data = qs.stringify(data)
            return data
        }],
    });
}
export const uploadFileRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params,
        headers: {
            'content-type': 'multipart/form-data'
        }
    });
}
export const putRequest = (url, params) => {
    return axios({
        method: 'put',
        url: `${base}${url}`,
        data: qs.stringify(params, {arrayFormat: 'repeat'}),
    });
}
export const deleteRequest = url => {
    return axios({
        method: 'delete',
        url: `${base}${url}`
    });
}
export const postJsonRequest = url => {
    return axios({
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        url: `${base}${url}`
    });
}