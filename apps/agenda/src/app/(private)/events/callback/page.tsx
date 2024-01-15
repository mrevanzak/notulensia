"use client"
import React from 'react'

const LinkGmeetCallback = () => {

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
      Please Close This Page
    </div>
  )
}

export default LinkGmeetCallback
