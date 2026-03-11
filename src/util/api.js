import axios from "./axios.custiomzie";

const createrUserApi = (name, email, password) => {
    const URL_API = `/v1/api/register`;
    const data = {
        name,
        email,
        password
    }
    return axios.post(URL_API, data);
}


const loginApi = (email, password) => {
    const URL_API = `/v1/api/login`;
    const data = {
        email,
        password
    }
    return axios.post(URL_API, data);
}

const getUsersApi = () => {
    const URL_API = `/v1/api/user`;

    return axios.get(URL_API);
}

const homeApi = () => {
    const URL_API = `/v1/api`;

    return axios.get(URL_API, "truy cập api thành công");
}

const getAccountApi = () => {
    const URL_API = `/v1/api/account`;

    return axios.get(URL_API);
}

const uploadBaiGiang = (value) => {
    const URL_API = `/v1/api/lecture`;
    return axios.post(URL_API, value, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}
const updateBaiGiang = (id, value) => {
    const URL_API = `/v1/api/lecture/` + id;
    return axios.put(URL_API, value, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}
const getLecturesApi = () => {
    const URL_API = `/v1/api/lectures`;
    return axios.get(URL_API);
}
const getLectureDetailApi = (value) => {
    const URL_API = `/v1/api/lecture/` + value;
    return axios.get(URL_API);
}
const deleteLectureDetailApi = (value) => {
    const URL_API = `/v1/api/lecture/` + value;
    return axios.delete(URL_API);
}

const getCountExamStatusByLecture = (value) => {
    const URL_API = `/v1/api/lectures/` + value + "/exams/status-count";
    return axios.get(URL_API);
}


const uploadExtend = (value) => {
    const URL_API = `/v1/api/extend`;
    return axios.post(URL_API, value, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}
const updateExtend = (id, value) => {
    const URL_API = `/v1/api/extend/` + id;
    return axios.put(URL_API, value, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}
const getExtend = () => {
    const URL_API = `/v1/api/extend`;
    return axios.get(URL_API);
}
const getExtendDetail = (value) => {
    const URL_API = `/v1/api/extend/` + value;
    return axios.get(URL_API);
}
const deleteLExtend = (value) => {
    const URL_API = `/v1/api/extend/` + value;
    return axios.delete(URL_API);
}




const uploadKnowledge = (value) => {
    const URL_API = `/v1/api/knowledge`;
    return axios.post(URL_API, value, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}
const updateKnowledge = (id, value) => {
    const URL_API = `/v1/api/knowledge/` + id;
    return axios.put(URL_API, value, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}
const getKnowledge = () => {
    const URL_API = `/v1/api/knowledge`;
    return axios.get(URL_API);
}
const getKnowledgeDetail= (value) => {
    const URL_API = `/v1/api/knowledge/` + value;
    return axios.get(URL_API);
}
const deleteLKnowledge = (value) => {
    const URL_API = `/v1/api/knowledge/` + value;
    return axios.delete(URL_API);
}

const importQuizz = (lectureId,questions) => {
    const URL_API = `/v1/api/lectures/${lectureId}/questions/import`;

    return axios.post(URL_API, questions, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}
const getQuestionsByLecture= (value) => {
    const URL_API = `/v1/api//lectures/${value}/questions/`;
    return axios.get(URL_API);
}

export {
    createrUserApi,
    loginApi, getUsersApi,
    homeApi, getAccountApi,
    uploadBaiGiang, getLecturesApi,
    getLectureDetailApi,
    updateBaiGiang,
    deleteLectureDetailApi,
    getCountExamStatusByLecture,
    uploadExtend, getExtend, getExtendDetail, deleteLExtend, updateExtend,
    uploadKnowledge,updateKnowledge,getKnowledge,getKnowledgeDetail,deleteLKnowledge,
    importQuizz,getQuestionsByLecture

}