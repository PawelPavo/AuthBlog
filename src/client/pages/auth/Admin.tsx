import * as React from 'react';
import { useState } from 'react';
import { IBlogs } from '../../utils/interfaces';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiServices, { Token } from '../../utils/api-services';

export interface AdminProps { }

const Admin: React.FC<AdminProps> = () => {
    const [blogs, setBlogs] = useState<IBlogs[]>([])
    const getBlogs = async () => {
        try {
            let blogs = await apiServices('/api/blogs')
            setBlogs(blogs);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getBlogs();
    }, []);

    const deleteBlog = async (id: number) => {
        const  destroy = await apiServices(`/api/blogs/${id}`, 'DELETE')
        getBlogs()
    }

    return (
        <div className="container">
            <div className="list-group mt-5">
                {blogs.map(blog => (
                    <div key={`blog-${blog.id}`} className="list-group-item list-group-item-action">
                        <div className="row align-items-center shadow-sm p-3">
                            <div className="col-8">
                                <h5>{blog.title}</h5>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-secondary">
                                        <Link className="text-warning" to={`/${blog.id}/edit`}>Edit</Link>
                                    </button>
                                    <button onClick={() => deleteBlog(blog.id)} type="button" className="btn btn-outline-secondary btn-sm text-danger">Delete</button>
                                </div>
                            </div>
                            <div className="col-4">
                                <span>{blog.image_url && <img src={blog.image_url} className="img-thumbnail" width="75" height="75" />}</span>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default Admin;