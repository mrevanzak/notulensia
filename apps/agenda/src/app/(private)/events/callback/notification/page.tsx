"use client"
import React from 'react'

const NotificationCallback = () => {

    const keyStorage = 'accessTokenNotification';

    const handleCallback = () => {
        const urlParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = urlParams.get('access_token');
      
        if (accessToken) {
          localStorage.setItem(keyStorage, accessToken);
          window.close();
        }
      };
      
      handleCallback();
    const accesstoken = localStorage.getItem(keyStorage);
  return (
    <div className='text-white'>
        Close This Page
    </div>
  )
}

export default NotificationCallback
