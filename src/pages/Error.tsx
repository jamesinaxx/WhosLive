import { FaGithub } from "react-icons/fa";

function Error() {
  return (
    <div className="p-14 text-center">
      <h1 className="text-error-red text-[7vw]">Failed to connect to Twitch</h1>
      <p className="text-[3vw]">
        Please try to troubleshoot your connection and if everything seems okay,
        try going to{" "}
        <a
          href="https://twitch.tv"
          target="_blank"
          rel="noreferrer"
          className="link link-primary"
        >
          Twitch
        </a>
        .
        <br />
        <br />
        If Twitch loads fine, then there is a bug with Now Live. Please report
        this{" "}
        <a
          href="https://github.com/jewlexx/NowLive/issues"
          className="link link-secondary"
        >
          here{" "}
          <FaGithub
            style={{
              color:
                document.body.style.backgroundColor === "rgb(255, 255, 255)"
                  ? "#000"
                  : "#fff",
            }}
          />
        </a>
      </p>
    </div>
  );
}

export default Error;
