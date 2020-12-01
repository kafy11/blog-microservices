import React, { useState } from 'react';
import axios from 'axios';

const PostCreate = () => {
    const [title, setTitle] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios.post('http://posts.com/posts/create', { title });

        setTitle('');
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input 
                        value={title} 
                        className="form-control" 
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default PostCreate;