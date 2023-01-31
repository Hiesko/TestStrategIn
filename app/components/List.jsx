import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/List.css';

const List = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/users', {
                    headers: {
                        'Access-Control-Allow-Origin': 'http://localhost:5173',
                    }
                });
                setUsers(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="container">
            <h2>Liste des utilisateurs inscrits</h2>
            <div className="users-list">
                {users.map(user => (
                    <div key={user._id} className="user-card">
                        <p>Email: {user.email}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default List;