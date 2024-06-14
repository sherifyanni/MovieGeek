
import './App.css';
import Navbar from './Navbar';
import Home from './Home';
import SignIn from './Signin';

function App() {
 
  return (
    <div className="App">
      <Navbar />
      <div className='content'>
        <SignIn />
      </div>
    </div>
  );
}

export default App;
