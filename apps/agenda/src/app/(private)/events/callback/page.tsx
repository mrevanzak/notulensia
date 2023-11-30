"use client"
import React from 'react'

const page = () => {

    const handleCallback = () => {
        const urlParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = urlParams.get('access_token');
      
        if (accessToken) {
          localStorage.setItem('googleAccessToken', accessToken);
          window.close();
        }
      };
      
      handleCallback();
    const accesstoken = localStorage.getItem('googleAccessToken');
  return (
    <div className='text-white'>
      {accesstoken}
    </div>
  )
}

export default page
