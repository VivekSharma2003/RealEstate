import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope } from "react-icons/fa";
import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import apiRequest from "../../lib/apiRequest";
import "./profilePage.scss";
import { Suspense, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function ProfilePage() {
  const data = useLoaderData();
  const { updateUser, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profile/update">
              <button>Update Profile</button>
            </Link>
          </div>

          <div className="info card">
            <div className="info-item avatar">
              <img
                src={currentUser.avatar || "noavatar.jpg"}
                alt="User Avatar"
              />
            </div>

            <div className="info-item">
              <FaUser className="info-icon" />
              <div className="info-text">
                <span className="label">Username</span>
                <span className="value">{currentUser.username}</span>
              </div>
            </div>

            <div className="info-item">
              <FaEnvelope className="info-icon" />
              <div className="info-text">
                <span className="label">E-mail</span>
                <span className="value">{currentUser.email}</span>
              </div>
            </div>

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>

          <div className="title">
            <h1>My List</h1>
            <Link to="/add">
              <button>Create New Post</button>
            </Link>
          </div>
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) => (
                <List posts={postResponse.data.userPosts} />
              )}
            </Await>
          </Suspense>
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) => (
                <List posts={postResponse.data.savedPosts} />
              )}
            </Await>
          </Suspense>
        </div>
      </div>

      <div className="chatContainer">
        <div className="wrapper">
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.chatResponse}
              errorElement={<p>Error loading chats!</p>}
            >
              {(chatResponse) => <Chat chats={chatResponse.data} />}
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
