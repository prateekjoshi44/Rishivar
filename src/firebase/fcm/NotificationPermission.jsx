import { useEffect, useState } from 'react';
import { getToken } from 'firebase/messaging';
import { useGetProfileQuery, usePatchProfileMutation } from '../../services/profileSlice';
import { messaging, vapidKey } from '../firebase';
import Spinner from '../../components/Spinner';
import ApiErrorModal from '../../components/modal/ApiErrorModal';
import Icons from '../../components/ui/Icons';

const NotificationPermission = ({ children }) => {
  const [patchProfile, patchProfileRes] = usePatchProfileMutation();
  const profileRes = useGetProfileQuery();
  const [isAllowed, setIsAllowed] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [isRequestingPermission, setIsRequestingPermission] = useState(false);

  const onTokenReceived = async (fcmToken) => {
    try {
      if (profileRes.data.fcmToken !== fcmToken) {
        await patchProfile({ fcmToken });
      }
      setIsAllowed(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEnableNotification = async () => {
    if (Notification.permission === 'default' || Notification.permission === 'denied') {
      setIsRequestingPermission(true);
      const permission = await Notification.requestPermission();

      if (permission === 'granted') {
        getToken(messaging, { vapidKey })
          .then(onTokenReceived)
          .catch((err) => {
            console.log(err);
            setIsBlocked(true);
          });
      } else if (permission === 'denied') {
        setIsBlocked(true);
      }
      setIsRequestingPermission(false);
    }
  };

  useEffect(() => {
    if (profileRes.data) {
      if (Notification.permission === 'granted') {
        getToken(messaging, { vapidKey })
          .then(onTokenReceived)
          .catch((err) => {
            console.log(err);
            setIsBlocked(true);
          });
      } else if (Notification.permission === 'denied') {
        setIsBlocked(true);
      }
    }
  }, [profileRes]);

  if (profileRes.isLoading || patchProfileRes.isLoading || isRequestingPermission) {
    return (
      <div className='text-center d-flex align-items-center justify-content-center'>
        <Spinner size={30} className={'me-2'} />
        Checking Notification Permissions...
      </div>
    );
  }

  if (profileRes.isError || patchProfileRes.isError) {
    return <ApiErrorModal res={profileRes.isError ? profileRes : patchProfileRes} />;
  }

  if (isAllowed) {
    return <>{children}</>;
  }

  if (isBlocked) {
    return (
      <div className="container">
        <div>
          <h3 className='my-3'>Allow Notification?</h3>
          <div className="text-center mb-3">
            {Icons.allowNotification('', { width: '235.67px', height: '232px' })}
          </div>
          <div className="d-flex justify-content-between bg-white rounded-10 py-2 shadow-sm mt-3 text-wrap mx-2 border mb-3" style={{ width: '95%' }}>
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
              {Icons.bell('mx-2 my-1 fs-4')}
              Notification
            </label>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                onChange={handleEnableNotification}
              />
            </div>
          </div>

          <p className='fs-10'>
            By allowing notifications, you’ll receive important updates, reminders, and exclusive offers right when they happen, giving you a seamless and enhanced experience with the app. Don’t miss out on anything!
          </p>
        </div>
      </div>
    );
  }

  return null;
};

export default NotificationPermission;
