"use strict";

import axios from "axios";
import { Notification } from 'element-ui';

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
    // baseURL: process.env.baseURL || process.env.apiUrl || ""
    // timeout: 60 * 1000, // Timeout
    // withCredentials: true, // Check cross-site Access-Control
    headers: { "X-Zplat-Subsystem": "zpan" }
};

const _axios = axios.create(config);

// Add a response interceptor
_axios.interceptors.response.use(
    function (response) {
        return response.data;
    },
    function (error) {
        if (error.response && error.response.status == 401) {
            this.location = "/zplat/signin"
            return Promise.reject("invalid login status");
        }

        let msg = error.message
        if (error.response) {
            msg = error.response.data.msg
        }

        Notification.error(msg)
        return Promise.reject(error);
    }
);


import User from './user'
import Storage from './storage'
import File from './file'
import Folder from './folder'
import Share from './share'
import Recyclebin from './recyclebin'

const zUser = new User(_axios);
const zStorage = new Storage(_axios);
const zfile = new File(_axios);
const zfolder = new Folder(_axios);
const zShare = new Share(_axios);
const zRecyclebin = new Recyclebin(_axios);


export {
    zUser,
    zStorage,
    zfile,
    zfolder,
    zShare,
    zRecyclebin
}