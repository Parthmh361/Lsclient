import { Box, Container, Heading, Text, Button, VStack } from '@chakra-ui/react';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import ClientDashboard from './ClientDashboard';
import Navbar from './Navbar';
import img1 from '../images/CL.png';
import gsap from 'gsap';
const ClientLanding = () => {
    const navigate = useNavigate();
    async function verify(){
        try{
            const userInfo = JSON.parse(localStorage.getItem("User"));
            const token = userInfo.token;
            const res = await fetch("https://lsserver-2.onrender.com/api/clientauth", {
               method: "GET",
               headers: {
                 Authorization: `Bearer ${token}`
               }
             });
             if (!res.ok){
            navigate('/ClientSignIn')
             }
           
        }catch(err){
            navigate('/ClientSignIn')
        }
      
    }
   
    useEffect(() => {
        verify();
    //     const timeline = gsap.timeline({ defaults: { duration: 1.5, ease: 'power3.out' } });

    // timeline
    //   .from('.hero-background', { opacity: 0, scale: 1.1 })
    //   .from('.hero-heading', { opacity: 0, y: 30 }, '-=1')
    //   .from('.hero-text', { opacity: 0, y: 20 }, '-=1')
    //   .fromTo('.hero-button', { opacity: 0, y: 20 },{opacity:1},'-=1');
    }, [])
    
  return (
    <>
    <Navbar/>
    
    <ClientDashboard/>
      <Button onClick={()=>{
        localStorage.removeItem("User");
        verify();
      }}>
        Logout
      </Button>
    </>
  )
}

export default ClientLanding
