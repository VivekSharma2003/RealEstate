import React, { useEffect, useState } from "react";
import apiRequest from "../../lib/apiRequest";
import "./agents.scss";

function Agents() {
    const [users, setUsers] = useState([]);
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await apiRequest.get("/users");
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        const fetchProperties = async () => {
            try {
                const response = await apiRequest.get("/posts");
                setProperties(response.data);
            } catch (error) {
                console.error("Error fetching properties:", error);
            }
        };

        fetchUsers();
        fetchProperties();
    }, []);

    const getPropertiesByUserId = (userId) => {
        return properties.filter(property => property.userId === userId);
    };

    const getUsersWithProperties = () => {
        return users.filter(user => {
            const userProperties = getPropertiesByUserId(user.id);
            return userProperties.length > 0;
        });
    };

    return (
        <div className="agentsPage">
            <div className="header">
                <h1>Meet Our Agents</h1>
            </div>
            {getUsersWithProperties().map(user => (
                <div key={user.id} className="agentSection">
                    <div className="agentCard">
                        <img src={user.avatar || "/noavatar.jpg"} alt={user.username} className="agentImage" />
                        <h2>{user.username}</h2>
                    </div>
                    <div className="properties">
                        <h2>Properties Listed by {user.username}</h2>
                        <div className="propertyList">
                            {getPropertiesByUserId(user.id).map(property => (
                                <div key={property.id} className="propertyCard">
                                    <img src={property.images[0]} alt={property.title} className="propertyImage" />
                                    <div className="propertyInfo">
                                        <h3>{property.title}</h3>
                                        <p>
                                            {property.bedroom} Bed | {property.bathroom} Bath | ${property.price}
                                        </p>
                                        <p>{property.address}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Agents;
