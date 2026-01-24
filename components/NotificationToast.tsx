import React, { useState, useEffect } from 'react';
import { MOCK_NAMES, THEME_COLOR } from '../config';

interface NotificationToastProps {
  type: 'REGISTER' | 'ACTIVATE';
}

export const NotificationToast: React.FC<NotificationToastProps> = ({ type }) => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({ name: '', time: '' });
  const isBlue = THEME_COLOR === 'BLUE';

  useEffect(() => {
    const INITIAL_DELAY = 2000;
    const SHOW_DURATION = 4000;
    const GAP_DURATION = 3500;

    let timeoutId: ReturnType<typeof setTimeout>;

    const showNext = () => {
      const randomName = MOCK_NAMES[Math.floor(Math.random() * MOCK_NAMES.length)];
      const times = ['Just now', '1m ago', 'Just now', '2m ago', 'Just now'];
      const randomTime = times[Math.floor(Math.random() * times.length)];

      setData({
        name: randomName,
        time: randomTime
      });

      setVisible(true);

      timeoutId = setTimeout(() => {
        setVisible(false);
        timeoutId = setTimeout(showNext, GAP_DURATION);
      }, SHOW_DURATION);
    };

    timeoutId = setTimeout(showNext, INITIAL_DELAY);
    return () => clearTimeout(timeoutId);
  }, []);

  // Center horizontally using left-1/2 and use keyframes defined in index.html
  // slideDown/slideUp handle the translate(-50%, ...) logic
  const animationClass = visible ? 'animate-slideDown' : 'animate-slideUp';

  const avatarLetter = data.name.charAt(0).toUpperCase();
  
  const activateColor = isBlue ? 'bg-indigo-600' : 'bg-emerald-500';
  const registerColor = isBlue ? 'bg-sky-600' : 'bg-blue-600';
  const avatarBg = type === 'ACTIVATE' ? activateColor : registerColor;

  return (
    <div className={`fixed top-4 left-1/2 z-[60] w-[90%] max-w-[360px] ${animationClass}`}>
      <div className="bg-[#1c1c1e]/90 backdrop-blur-xl border border-white/10 shadow-2xl rounded-[2rem] p-3 pr-5 flex items-center gap-3">
        
        {/* Avatar Icon */}
        <div className={`w-10 h-10 min-w-[2.5rem] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg ${avatarBg}`}>
          {avatarLetter}
        </div>

        {/* Text Content */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <div className="flex justify-between items-baseline w-full">
            <p className="text-white text-sm font-semibold truncate pr-2">
              {data.name}
            </p>
            <span className="text-gray-500 text-[10px] font-medium whitespace-nowrap">
              {data.time}
            </span>
          </div>
          <p className="text-gray-400 text-xs truncate leading-tight">
            {type === 'ACTIVATE' ? 'Activated Lifetime Access 💎' : 'Registered on Stream Africa 🚀'}
          </p>
        </div>
      </div>
    </div>
  );
};