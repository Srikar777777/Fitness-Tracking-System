import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1 style={{ fontSize: '40px' }}>Fitness Tracking System</h1>
      <div style={{ margin: '50px' }}>
        <Link to="/register">
          <button style={{ margin: '45px', padding: '10px 20px', fontSize: '30px' }}>
            Register
          </button>
        </Link>
        <Link to="/login">
          <button style={{ margin: '45px', padding: '10px 20px', fontSize: '30px' }}>
            Login
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
