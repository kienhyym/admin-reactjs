import React, { useContext, useEffect, useState } from "react";
import {
    Form,
    Input,
    Upload,
    Button,
    Radio,
    Checkbox,
    Space,
    message
} from "antd";
import {
    UploadOutlined,
    DeleteOutlined,
    PlusOutlined
} from "@ant-design/icons";

import { deleteQuestion, getQuestion, updateQuestion } from "../../util/api";
import { useNavigate, useParams } from "react-router-dom";
import "./QuestionDetailPage.css";
import { AuthContext } from "../../component/context/authContext";

const { TextArea } = Input;

const QuestionDetailPage = () => {
    const navigate = useNavigate()
    const { questionId } = useParams();
    const [form] = Form.useForm();
    const { setFullPageLoading } = useContext(AuthContext)

    const [type, setType] = useState("single");
    const [correctAnswer, setCorrectAnswer] = useState(null);

    /* ---------------- GET DATA ---------------- */

     const fetchQuestion = async () => {
            setFullPageLoading(true)
            const res = await getQuestion(questionId);
            setFullPageLoading(false)
            if (!res) return;

            const question = res.question;
            const options = res.options;

            setType(question.type);

            /* convert option image -> upload fileList */

            const formattedOptions = options.map((op) => ({
                _id: op._id,   // 🔴 thêm ID
                content: op.content,
                isCorrect: op.isCorrect,
                image: op.imageUrl
                    ? [{
                        uid: op._id,
                        name:  op.fileName,
                        status: "done",
                        url: op.imageUrl
                    }]
                    : []
            }));

            /* find correct answer for single */

            if (question.type === "single") {

                const correctIndex = options.findIndex(
                    (o) => o.isCorrect
                );

                setCorrectAnswer(correctIndex);

            }

            /* question image */

            const questionImage = question.imageUrl
                ? [{
                    uid: "question-image",
                    name: "image",
                    status: "done",
                    url: question.imageUrl
                }]
                : [];

            form.setFieldsValue({
                question: question.content,
                questionImage,
                options: formattedOptions
            });

        };

    useEffect(() => {
        fetchQuestion();
    }, [questionId]);


    const handleUpdateQuestion = async (values) => {
        try {
            try {
                setFullPageLoading(true)
                const res = await updateQuestion(questionId, values)
                if (res.status === 'ok') {
                    message.success("Cập nhật thành công")
                    fetchQuestion();

                } else {
                    message.error(res.message)
                }
                setFullPageLoading(false)
            } catch (error) {
                message.error(error.message)
                setFullPageLoading(false)
            }
        } catch (error) {
            message.error(error.message)
            setFullPageLoading(false)
        }
    };


    /* ---------------- SUBMIT ---------------- */

    const handleSubmit = async () => {
        await form.validateFields();

        const values = form.getFieldsValue(true);

        const formData = new FormData();

        formData.append("question", values.question);
        formData.append("type", type);
        formData.append("oldImage", values?.questionImage[0]?.url || null);

        // question image
        if (values.questionImage?.length > 0) {
            const img = values.questionImage[0];
            if (img.originFileObj) {
                formData.append("questionImage", img.originFileObj);
            }
        }

        // correct answer
        if (type === "single") {
            formData.append("correctAnswer", correctAnswer);
        }

        if (type === "boolean") {
            formData.append("correctAnswer", values.correctAnswer);
        }
        // options
        if (values.options?.length) {
            values.options.forEach((op, index) => {

                formData.append(`options[${index}][content]`, op.content || "");
                if (op._id) {
                    formData.append(`options[${index}][_id]`, op._id);
                }
                if (type === "multiple") {
                    formData.append(
                        `options[${index}][isCorrect]`,
                        op.isCorrect ? "true" : "false"
                    );
                }
                if (op.image?.length > 0) {
                    const img = op.image[0];
                    if (img.originFileObj) {
                        formData.append(
                            `options[${index}][newImage]`,
                            img.originFileObj
                        );
                    } if (img?.url) {
                        formData.append(
                            `options[${index}][oldImage]`,
                            img.url
                        );
                    }
                }

            });
        }

        // debug
        // formData.forEach((v, k) => console.log(k, v));

        handleUpdateQuestion(formData);
    };
    const handleDelete = async () => {
        try {
            setFullPageLoading(true)
            const res = await deleteQuestion(questionId);
            if (res.status) {
                navigate(-1)
            }
            setFullPageLoading(false)
        } catch (error) {
            message.error(error.message)
            setFullPageLoading(false)
        }

    }

    /* ---------------- UI ---------------- */

    return (

        <div className="question-page">

            <h2>Chi tiết câu hỏi</h2>

            <Form form={form} layout="vertical">

                {/* QUESTION */}

                <Form.Item label="Câu hỏi">

                    <Space align="start">

                        <Form.Item
                            name="question"
                            rules={[{ required: true }]}
                            noStyle
                        >
                            <TextArea
                                rows={3}
                                style={{ width: 600, height: 100 }}
                            />
                        </Form.Item>

                        <Form.Item
                            name="questionImage"
                            valuePropName="fileList"
                            getValueFromEvent={(e) => e?.fileList}
                            style={{ marginBottom: 0 }}
                        >
                            <Upload
                                beforeUpload={() => false}
                                listType="picture-card"
                                maxCount={1}
                            >
                                <UploadOutlined />
                            </Upload>
                        </Form.Item>

                    </Space>

                </Form.Item>

                {/* TYPE */}

                <Form.Item label="Loại câu hỏi">

                    <Radio.Group
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <Radio value="single">Single</Radio>
                        <Radio value="multiple">Multiple</Radio>
                    </Radio.Group>

                </Form.Item>

                {/* BOOLEAN */}

                {type === "boolean" && (

                    <Form.Item name="correctAnswer">

                        <Radio.Group>

                            <Radio value={true}>True</Radio>

                            <Radio value={false}>False</Radio>

                        </Radio.Group>

                    </Form.Item>

                )}

                {/* OPTIONS */}

                {type !== "boolean" && (

                    <Form.List name="options">

                        {(fields, { add, remove }) => (

                            <>

                                {fields.map((field, index) => (
                                    <Space
                                        key={field.key}
                                        align="center"
                                        style={{
                                            display: "flex",
                                            marginBottom: 12
                                        }}
                                    >
                                        <Form.Item
                                            name={[field.name, "_id"]}
                                            hidden
                                        >
                                            <Input />
                                        </Form.Item>

                                        {/* SINGLE */}

                                        {type === "single" && (

                                            <Radio
                                                checked={correctAnswer === index}
                                                onChange={() => setCorrectAnswer(index)}
                                            />

                                        )}

                                        {/* MULTIPLE */}

                                        {type === "multiple" && (

                                            <Form.Item
                                                name={[field.name, "isCorrect"]}
                                                valuePropName="checked"
                                                style={{ marginBottom: 0 }}
                                            >

                                                <Checkbox />

                                            </Form.Item>

                                        )}

                                        {/* TEXT */}

                                        <Form.Item
                                            key={field.key}
                                            name={[field.name, "content"]}
                                            rules={[{ required: true }]}
                                            style={{ marginBottom: 0 }}
                                        >

                                            <Input
                                                style={{ width: 350 }}
                                                placeholder={`Answer ${String.fromCharCode(
                                                    65 + index
                                                )}`}
                                            />

                                        </Form.Item>

                                        {/* IMAGE */}

                                        <Form.Item
                                            name={[field.name, "image"]}
                                            valuePropName="fileList"
                                            getValueFromEvent={(e) => e?.fileList}
                                            style={{ marginBottom: 0 }}
                                        >

                                            <Upload
                                                beforeUpload={() => false}
                                                maxCount={1}
                                                listType="picture-card"
                                            >
                                                <UploadOutlined />
                                            </Upload>

                                        </Form.Item>

                                        {/* DELETE */}

                                        <DeleteOutlined
                                            onClick={() => remove(field.name)}
                                            style={{
                                                color: "red",
                                                fontSize: 18
                                            }}
                                        />

                                    </Space>
                                ))}

                                <Button
                                    icon={<PlusOutlined />}
                                    onClick={() => add()}
                                >
                                    Add answer
                                </Button>

                            </>

                        )}

                    </Form.List>

                )}

            </Form>

            <Button
                type="primary"
                onClick={handleSubmit}
                style={{ marginTop: 30 }}
            >
                Lưu
            </Button>
            <Button
                type="dashed"
                onClick={handleDelete}
                style={{ marginTop: 30, marginLeft: 30 }}
            >
                Xoá
            </Button>
        </div>

    );

};

export default QuestionDetailPage;