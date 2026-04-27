import Script from "next/script";

const META_PIXEL_ID = "2045420926400437";

const utmifyIdList: Record<string, string> = {
  kim: "69efaf9f58354e39716fcefa",
  rock: "69efaf9f58354e39716fcefa",
  megan: "69efaf9f58354e39716fcefa",
};

export default function HeaderScript({ content }: { content: string }) {

  const utmifyId = utmifyIdList[content];

  if (!utmifyId) return null;

  return (
    <>
      {/* Meta Pixel */}
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
            document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init','${META_PIXEL_ID}');
            fbq('track','PageView');
          `,
        }}
      />

      {/* UTMify */}
      <Script
        id="utmify-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.pixelId=${JSON.stringify(utmifyId)};`,
        }}
      />
      <Script
        id="utmify-pixel"
        src="https://cdn.utmify.com.br/scripts/pixel/pixel.js"
        strategy="afterInteractive"
      />
      <Script
        id="utmify-utms"
        src="https://cdn.utmify.com.br/scripts/utms/latest.js"
        data-utmify-prevent-subids
        strategy="afterInteractive"
      />
    </>
  );

};