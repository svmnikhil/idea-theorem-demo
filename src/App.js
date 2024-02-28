import './App.css';
import Banner from './components/Banner';
import RegistrationForm from './components/RegistrationForm';

function App() {

  return (
    <>
      <Banner />
      <div className='flex justify-center items-center md:min-h-[80vh]'>
        <RegistrationForm />
      </div>
    </>
    
  );
}

export default App;
