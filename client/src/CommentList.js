import React from 'react';

const CommentList = ({ postId, comments }) => {
    const renderedComments = Object.values(comments).map(({ id, content, status }) => {
        content = (status === 'pending') ? 'This comment is awaiting moderation' : 
                  (status === 'rejected') ? 'This comment has been rejected' :
                  content;

        return <li key={id}>{content}</li>
    });

    return <ul>{renderedComments}</ul>;
};

export default CommentList;