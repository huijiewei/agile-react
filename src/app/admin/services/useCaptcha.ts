import { useState } from 'react';
import { requestFlatry } from '@shared/utils/http';
import { useHttp } from '@shared/contexts/HttpContext';

type Captcha = {
  image: string;
  process: string;
};

type UseCaptcha = {
  captcha: Captcha | null;
  updateCaptcha: () => void;
  removeCaptcha: () => void;
};

const useCaptcha = (emptyCaptcha: () => void): UseCaptcha => {
  const { get } = useHttp();
  const [captcha, setCaptcha] = useState<Captcha | null>(null);

  const updateCaptcha = async () => {
    const { data } = await requestFlatry<Captcha | undefined>(get('open/captcha', null, false));

    if (data) {
      setCaptcha(data);
      emptyCaptcha();
    }
  };

  const removeCaptcha = () => {
    setCaptcha(null);
    emptyCaptcha();
  };

  return {
    captcha,
    updateCaptcha,
    removeCaptcha,
  };
};

const processCaptcha = (captcha: unknown, process: string): string => {
  const captchaProcess = new Function('captcha', process);

  return captchaProcess(captcha);
};

export { useCaptcha, processCaptcha };
