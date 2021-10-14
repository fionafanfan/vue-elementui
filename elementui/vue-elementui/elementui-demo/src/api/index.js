import Axios from '../libs/AxiosPlugin'

// 接口地址
const BASE_PATH = process.env.API_URL

// 用户登录
export const login = params => { return Axios.post(`${BASE_PATH}/user/login`, params).then(res => res.data); };

// 获取用户列表
export const getUserList = params => { return Axios.get(`${BASE_PATH}/user/list`, { params: params }).then(res => res.data); };

// 获取模型列表
export const getModelList = params => { return Axios.post(`${BASE_PATH}/api/nlp/model/list`, params).then(res => res.data); };

// 获取实体类型列表 getEntityTypeList
export const getEntityTypeList = params => { return Axios.post(`${BASE_PATH}/api/nlp/entityType/list`, params).then(res => res.data); };

// 获取具体实体语料数据列表
export const getEntityList = params => { return Axios.post(`${BASE_PATH}/api/nlp/entityCorpus/list`, params).then(res => res.data); };

// 获取意图类型列表 getEntityTypeList
export const getIntentTypeList = params => { return Axios.post(`${BASE_PATH}/api/nlp/intentType/list`, params).then(res => res.data); };

// 获取具体意图语料数据列表
export const getIntentList = params => { return Axios.post(`${BASE_PATH}/api/nlp/intentCorpus/list`, params).then(res => res.data); };

// 首页加载数据
export const loadData  = params => { return Axios.post(`${BASE_PATH}/home/loadData`).then(res => res.data) };

// 文件上传地址
export const uploadFile = `${BASE_PATH}/file/upload`;
