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

const uploadBaiGiang = (id, value) => {
    const URL_API = `/v1/api/lecture/` + id;
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
    const URL_API = `/v1/api/lectures/` + value+'/questions';
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
const getKnowledgeDetail = (value) => {
    const URL_API = `/v1/api/knowledge/` + value;
    return axios.get(URL_API);
}
const deleteLKnowledge = (value) => {
    const URL_API = `/v1/api/knowledge/` + value;
    return axios.delete(URL_API);
}

const importQuizz = (examId, questions) => {
    const URL_API = `/v1/api/lectures/${examId}/questions/import`;
    return axios.post(URL_API, questions, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}
const getQuestionsByLecture = (value) => {
    const URL_API = `/v1/api//lectures/${value}/questions/`;
    return axios.get(URL_API);
}
const updateTitleVideo = (id, value) => {
    const URL_API = `/v1/api/video/${id}`;
    return axios.put(URL_API, value);
}

// +++++++++ QUESTIONS ++++++++++++++
const createQuestion = (examId, value) => {
    const URL_API = `/v1/api/questions/` + examId;
    return axios.post(URL_API, value, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}
const updateQuestion = (questionId, value) => {
    const URL_API = `/v1/api/question/` + questionId;
    return axios.put(URL_API, value, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}
const getQuestions = (examId) => {
    const URL_API = `/v1/api/questions/${examId}`;
    return axios.get(URL_API);
}
const getQuestion = (questionId) => {
    const URL_API = `/v1/api/question/${questionId}`;
    return axios.get(URL_API);
}
const deleteQuestion = (questionId) => {
    const URL_API = `/v1/api/question/${questionId}`;
    return axios.delete(URL_API);
}
// ######################################################
const getAchievements = () => {
    const URL_API = `/v1/api/achievements`;
    return axios.get(URL_API);
}


const createChapter = (value) => {
    const URL_API = `/v1/api/chapter`;
    return axios.post(URL_API, value);
}
const updateChapter = (id, value) => {
    const URL_API = `/v1/api/chapter/` + id;
    return axios.put(URL_API, value);
}


const getChapter = (id) => {
    const URL_API = `/v1/api/chapter/${id}`;
    return axios.get(URL_API);
}
const deleteChapter = (id) => {
    const URL_API = `/v1/api/chapter/${id}`;
    return axios.delete(URL_API);
}

const getChapters = () => {
    const URL_API = `/v1/api/chapters`;
    return axios.get(URL_API);
}


const getExams = (lectureId) => {
    const URL_API = `/v1/api/exams/` + lectureId;
    return axios.get(URL_API);
}
const createExam = (value) => {
    const URL_API = `/v1/api/exam/`;
    return axios.post(URL_API, value);
}

const getExam = (examId) => {
    const URL_API = `/v1/api/exam/` + examId;
    return axios.get(URL_API);
}
const updateExam = (examId, value) => {
    const URL_API = `/v1/api/exam/` + examId;
    return axios.put(URL_API, value);
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
    uploadKnowledge, updateKnowledge, getKnowledge, getKnowledgeDetail, deleteLKnowledge,
    importQuizz, getQuestionsByLecture,
    updateTitleVideo, 
    createQuestion, getQuestion, deleteQuestion, updateQuestion,getQuestions,
    getAchievements,
    createChapter, updateChapter, getChapter, deleteChapter, getChapters,
    getExams, createExam, getExam, updateExam
}