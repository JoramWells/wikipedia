import React, { useEffect, useState } from 'react'

import QuillEditor from '../../../editor/QuillEditor';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useSelector } from "react-redux";


function CreatePage(props) {
    const user = useSelector(state => state.user);

    const [content, setContent] = useState("")
    const [files, setFiles] = useState([])

    const onEditorChange = (value) => {
        setContent(value)
        console.log(content)
    }

    const onFilesChange = (files) => {
        setFiles(files)
    }

    const onSubmit = (event) => {
        event.preventDefault();

        setContent("");

        if (user.userData && !user.userData.isAuth) {
            return alert('Please Log in first');
        }

        const variables = {
            content: content,
            userID: user.userData._id
        }

        axios.post('/api/blog/createPost', variables)
            .then(response => {
                if (response) {
                    console.log("success")

                    setTimeout(() => {
                        props.history.push('/blog')
                    }, 2000);
                }
            })
    }


    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2  > Editor</h2>
            </div>
            <QuillEditor
                placeholder={"Start Posting Something"}
                onEditorChange={onEditorChange}
                onFilesChange={onFilesChange}
            />

            <Form onSubmit={onSubmit}>
                <div style={{ textAlign: 'center', margin: '2rem', }}>
                    <Button
                        size="large"
                        type="submit"
                        className=""
                        onSubmit={onSubmit}
                    >
                        Submit
                </Button>
                </div>
            </Form>
        </div>
    )
}

export default CreatePage
