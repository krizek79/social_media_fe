import React, {useContext, useEffect, useState} from "react"
import commentService from "../../api/CommentApi.js"
import CreateComment from "./CreateComment.jsx"
import Comment from "./Comment.jsx"
import {AuthContext} from "../security/AuthContext.js"

export default function CommentSection(props) {

    const { logout } = useContext(AuthContext)
    const postId = props.postId
    const [comments, setComments] = useState([])

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
                    logout()
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