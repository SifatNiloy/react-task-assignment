import React, { useState } from 'react';

const Problem1 = () => {
    const [show, setShow] = useState('all');
    const [tasks, setTasks] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        status: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setTasks((prevTasks) => [...prevTasks, formData]);
        setFormData({ name: '', status: '' });
    };

    const handleClick = (val) => {
        setShow(val);
    };

    // Filter and sort tasks based on the current show value
    const filteredTasks = tasks.filter((task) => {
        if (show === 'all') {
            return true;
        } else if (show === 'active') {
            return task.status.toLowerCase() === 'active';
        } else if (show === 'completed') {
            return task.status.toLowerCase() === 'completed';
        }
        return true;
    });

    // Sort tasks based on status and order of submission
    const sortedTasks = filteredTasks.sort((a, b) => {
        const statusOrder = { 'active': 1, 'completed': 2 };

        if (statusOrder[a.status.toLowerCase()] < statusOrder[b.status.toLowerCase()]) {
            return -1;
        } else if (statusOrder[a.status.toLowerCase()] > statusOrder[b.status.toLowerCase()]) {
            return 1;
        } else {
            // If statuses are the same, maintain the order of submission
            return 0;
        }
    });

    return (

        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-1</h4>
                <div className="col-6 ">
                    <form onSubmit={handleSubmit} className="row gy-2 gx-3 align-items-center mb-4">
                        <div className="col-auto">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-auto">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Status"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
                <div className="col-8">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'all' && 'active'}`} type="button" onClick={() => handleClick('all')}>All</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'active' && 'active'}`} type="button" onClick={() => handleClick('active')}>Active</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'completed' && 'active'}`} type="button" onClick={() => handleClick('completed')}>Completed</button>
                        </li>
                    </ul>
                    <div className="tab-content"></div>
                    <table className="table table-striped ">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedTasks.map((task, index) => (
                                <tr key={index}>
                                    <td>{task.name}</td>
                                    <td>{task.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Problem1;