function NoAuth() {
  return (
    <p className="text-sad-gray sad-text absolute top-[50%] left-[50%] m-0 -translate-x-1/2 -translate-y-1/2 transform text-center text-3xl">
      You are not logged in to Twitch! Please go to{" "}
      <a
        href="https://nowlive.jewelexx.com/auth/"
        target="_blank"
        rel="noreferrer"
      >
        this page
      </a>
      , log in with Twitch, and then come back here.
    </p>
  );
}

export default NoAuth;
