import { useEffect, useRef } from 'react';
import useLogout from '../../hooks/useLogout';
import useAuth from '../../hooks/useAuth';

const useLogoutTimer = (timeoutDuration = 300000) => {
  const timeoutIdRef = useRef(null);
  const logoutCallback = useLogout();

  const resetTimer = () => {
    clearTimeout(timeoutIdRef.current);
    timeoutIdRef.current = setTimeout(() => {
      console.log(sessionStorage.getItem('isAuthenticated'))
      console.log('Local storage cleared after 5 minutes');
      alert('You have been logged out due to inactivity');
      logoutCallback();
    }, timeoutDuration);
  };

  useEffect(() => {
    const handleMouseMove = () => resetTimer();
    const handleKeyDown = () => resetTimer();

    const flag = sessionStorage.getItem('isAuthenticated')
    if (flag === 'true' || flag === true) {
      console.log(flag)
      resetTimer();
    }

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timeoutIdRef.current);
    };
  }, [logoutCallback, timeoutDuration]);

  return resetTimer;
};

export default useLogoutTimer;
