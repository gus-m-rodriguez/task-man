import {useAuth} from '../context/AuthContext.jsx';

function ProfilePage() {
  const { user } = useAuth();
  return (
    <div>
      <div>{JSON.stringify(user, null, 2)}</div>
    </div>
  )
}

export default ProfilePage
