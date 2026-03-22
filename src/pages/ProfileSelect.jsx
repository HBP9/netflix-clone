import { useNavigate } from "react-router-dom";
import "./ProfileSelect.css";

const profiles = [
  { id: 1, name: "Yash", color: "#4169e1" },
  { id: 2, name: "Bhushan", color: "#e4a400" },
  { id: 3, name: "Pratibha", color: "#e30914" },
  { id: 4, name: "Children", color: "#4CAF50", isKids: true },
];

const ProfileSelect = () => {
  const navigate = useNavigate();
  return (
    <section className="profile-select">
      <h1 className="profile-select_title">Who's watching?</h1>
      <div className="profile_list">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className="profile_item"
            onClick={() => navigate("/home")}
          >
            <div
              className="profile_card"
              style={{ backgroundColor: profile.color }}
            >
              <img
                src={`https://api.dicebear.com/7.x/fun-emoji/svg?seed=${profile.name}`}
                alt={profile.name}
              />
            </div>
            <p className="profile_name">{profile.name}</p>
          </div>
        ))}
        <div className="profile_item">
          <div className="profile_card profile_add">
            <span>+</span>
          </div>
          <p className="profile_name">Add Profile</p>
        </div>
      </div>
      <button className="manage_profiles_btn">Manage Profiles</button>
    </section>
  );
};

export default ProfileSelect;
