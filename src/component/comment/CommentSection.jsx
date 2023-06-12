import React, {useEffect, useState} from "react";
import commentService from "../../service/CommentService.js";
import authService from "../../service/AuthService.js";
import {useNavigate} from "react-router-dom";
import CreateComment from "./CreateComment.jsx";
import Comment from "./Comment.jsx";

export default function CommentSection(props) {

    const postId = props.postId
    const [comments, setComments] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        commentService.getAllCommentsByPostId(postId)
            .then(response => {
                if (response.status === 200) {
                    const reversedComments = response.data.reverse()
                    setComments(reversedComments)
                }
            })
            .catch(e => {
                if (e.response.status === 401) {
                    authService.logout()
                    navigate("/authentication")
                }
                console.log(e.response.status + ": " + e.response.data.message)
            })
    }, [postId])

    function addNewComment(newComment) {
        setComments([newComment, ...comments])
    }

    function deleteCommentFromSection(commentId) {
        const filteredComments = comments.filter(comment => comment.id !== commentId)
        setComments(filteredComments)
    }

    return (
        <>
            <CreateComment
                postId={postId}
                parentComment={null}
                addNewComment={addNewComment}
            />
            <div className="flex flex-col gap-y-3">
                {comments.map(comment => (
                    <Comment
                        key={comment.id}
                        comment={comment}
                        deleteCommentFromSection={deleteCommentFromSection}
                    />
                ))}
            </div>
        </>
    )
}