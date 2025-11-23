import { FaExternalLinkAlt, FaMapMarkerAlt, FaBuilding } from 'react-icons/fa';

export default function UserCard({ user }) {
  return (
    <div className="user-card">
      <div className="user-card-content">
        <div className="user-header">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="user-avatar"
          />
          <div className="user-info">
            <h2 className="user-name">
              {user.name || user.login}
            </h2>
            <p className="user-username">@{user.login}</p>
            
            {user.bio && (
              <p className="user-bio">{user.bio}</p>
            )}
            
            <div className="user-details">
              {user.location && (
                <div className="detail-item">
                  <FaMapMarkerAlt />
                  <span>{user.location}</span>
                </div>
              )}
              {user.company && (
                <div className="detail-item">
                  <FaBuilding />
                  <span>{user.company}</span>
                </div>
              )}
            </div>
            
            <div className="user-stats">
              <div className="stat-item">
                <span className="stat-number">{user.public_repos}</span>
                <span className="stat-label">repos</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{user.followers}</span>
                <span className="stat-label">followers</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{user.following}</span>
                <span className="stat-label">following</span>
              </div>
            </div>
            
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="profile-link"
            >
              <FaExternalLinkAlt />
              <span>View GitHub Profile</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}