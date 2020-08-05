import ChromecastAPI from "chromecast-api";

// client.on("device", function (device) {
//   var mediaURL =
//     "http://commondatastorage.googleapis.com/gtv-videos-bucket/big_buck_bunny_1080p.mp4";

//   device.play(mediaURL, function (err) {
//     if (!err) console.log("Playing in your chromecast");
//   });
// });

const appendScriptTag = (url) => {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = url;
  script.async = true;

  document.body.appendChild(script);

  return () => {
    document.body.removeChild(script);
  };
};
const applicationId = "8098D858";

const initializeCastApi = () => {
  // const castContext = window.cast.framework.CastContext.getInstance();
  // castContext.setOptions({
  //   receiverApplicationId:
  //     window.chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
  // });
  // const castSession = castContext.getCurrentSession();
  // if (castSession) {
  //   console.log("session");
  // }
};

// window["__onGCastApiAvailable"] = (isAvailable) => {
//   if (isAvailable) {
//     initializeCastApi();
//   }
// };

export default function* () {
  // const removeScriptTag = appendScriptTag(
  //   "https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1"
  // );
}
