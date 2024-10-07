import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './components/Landing';
import One from './components/userAuth/One';
import ClientSignIn from './components/userAuth/ClientSignIn';
import ClientSignUp from './components/userAuth/ClientSignUp';
import ClientLanding from './components/ClientLanding';
import AdvocateSignup from './components/userAuth/AdvocateSignUp';
import AdvocateSignIn from './components/userAuth/AdvocateSignIn';
import AdvocateLanding from './components/AdvocateLanding';
import AddClient from './components/advocateCards/AddClient';
import AddCase from './components/advocateCards/AddCase';
import ChatProvider from './context/ChatProvider';
import Chat from './components/Chat';
import AdvocateDiary from './components/advocateCards/AdvocateDiary';
import Two from './components/userAuth/Two';
import FindAdvocate from './components/clientCards/FindAdvocate';
import ManageClients from './components/advocateCards/ManageClients';
import Ai from './components/advocateCards/Ai';

function App() {
  return (

   

<BrowserRouter>
<ChatProvider>


   <Routes>
    <Route path='/' element={<Landing/>}/>
    <Route path='/one' element={<One/>}/>
    <Route path='/ClientSignUp' element={<ClientSignUp/>}/>
    <Route path='/ClientSignIn' element={<ClientSignIn/>}/>
    <Route path='/AdvocateSignUp' element={<AdvocateSignup/>}/>
    <Route path='/AdvocateSignIn' element={<AdvocateSignIn/>}/>
    <Route path='/client' element={<ClientLanding/>}/>
    <Route path='/advocate' element={<AdvocateLanding/>}/>
    <Route path='/addclient' element={<AddClient/>}/>
    <Route path='/addcase' element={<AddCase/>}/>
    <Route path='/chatProvider' element={<ChatProvider/>}/>
    <Route path="/chat" element={<Chat/>} />
    <Route path='/advocatediary' element={<AdvocateDiary/>}/>
    <Route path='/two' element={<Two/>}/>
    <Route path='/findadvocate' element={<FindAdvocate/>}/>
    <Route path='/manageclients' element={<ManageClients/>}/>
    <Route path='/ai' element={<Ai/>}/>
   </Routes> 
</ChatProvider>
  </BrowserRouter>
   
  );
}

export default App;
