import { useState, useEffect } from 'react';
import Icons from '../../components/ui/Icons';

const PwaInstallButton = () => {
  const [canInstall, setCanInstall] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
      setCanInstall(true);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // Check if the website is installable and update the canInstall state accordingly
        if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
          setCanInstall(false);
        } else {
          setCanInstall(true);
        }
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        setDeferredPrompt(null);
        setCanInstall(false);
        if (choiceResult.outcome === 'accepted') {
          console.log('PWA installed');
        } else {
          console.log('PWA installation declined');
        }
      });
    }
  };

  const getMessage = () => {
    const userAgent = navigator.userAgent;
    const isDesktop = !/Mobi|Android/i.test(userAgent);

    if (isDesktop) {
      return 'Install the app on your desktop';
    } else {
      return 'Install the app on your smartphone';
    }
  };


  return (
    canInstall && (
      <div className="d-flex justify-content-between p-3 text-white bg-primary bg-gradient rounded-4 shadow-sm">
        <div>
          <h3>Install App</h3>
          <p>{getMessage()}</p>
          <button className="btn bg-white btn-hover-primary fw-bold shadow-sm" type="button" onClick={handleInstallClick}>Install App Now</button>
        </div>
        <div className="d-flex align-items-center">
          {Icons.installAlert("text-white shadow", { width: 100, height: 100, transform: "rotate(45deg)" })}
        </div>
      </div>
    )
  );
};

export default PwaInstallButton;
