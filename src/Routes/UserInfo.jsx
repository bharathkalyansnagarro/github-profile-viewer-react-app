import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Tabs from "../components/Tabs";
import Repo from "../components/Repo";
import Events from "../components/Events";
import UsersContainer from "../components/UsersContainer";
import Loading from "../components/Loading";

const UserInfo = ({}) => {
  const [user, setUser] = useState([]);
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(null);
  const [type, setType] = useState("repos");
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const BASE_URL = "https://api.github.com/users";

  async function getUserinfo() {
    setLoading(true);
    const res = await fetch(`${BASE_URL}${pathname}`);
    const data = await res.json();
    setUser(() => [data]);
    setLoading(null);
  }

  async function getUrls() {
    setUser([]);
    setLoading(true);
    const res = await fetch(`${BASE_URL}${pathname}/${type}`);
    const data = await res.json();
    setInfo(data);
    setLoading(null);
  }

  useEffect(() => {
    getUserinfo();
    getUrls();
  }, [pathname, type]);

  return (
    <div className="py-5">
      <button
        onClick={() => navigate("/")}
        className="px-5 py-1 mx-1 my-4 bg-teal-700 rounded"
      >
        BACK
      </button>
      {user &&
        user?.map((uinfo, idx) => (
          <div
            key={idx}
            className="flex justify-center md:flex-row md:px-0 px-4 flex-col gap-10"
          >
            <img
              src={uinfo.avatar_url}
              className="w-[350px] border-4 border-white md:mx-0 mx-auto"
            />
            <div className="text-sm px-3 ">
              <h1 className="text-3xl pb-4">{uinfo?.name}</h1>
              <h1>
                <span className="text-teal-500">User Name : </span>
                {uinfo?.login}
              </h1>

              <h1>
                <span className="text-teal-500">Followers : </span>
                {uinfo?.followers}
              </h1>
              <h1>
                <span className="text-teal-500">Following : </span>
                {uinfo?.following}
              </h1>
              <h1>
                <span className="text-teal-500">Public Repositories : </span>
                {uinfo?.public_repos}
              </h1>
              <h1>
                <span className="text-teal-500">Joined on : </span>
                {new Date(uinfo?.created_at).toLocaleDateString()}
              </h1>
              <a
                target="_blank "
                className="bg-teal-600 py-2 px-4 my-3"
                href={uinfo?.html_url}
              >
                <span className="medium">Visit Profile Page</span>
              </a>
            </div>
          </div>
        ))}
      <div className="flex border-b pb-4 mt-[10%] mb-6 justify-center gap-6 md:text-xl">
        <Tabs type={type} setType={setType} />
      </div>
      {loading && <Loading />}
      {type === "repos" && (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-7 w-10/12 mx-auto">
          {info && <Repo info={info} />}
        </div>
      )}
      {type === "received_events" && (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-7 w-10/12 mx-auto">
          {info && <Events info={info} />}
        </div>
      )}
      {type === "followers" && <UsersContainer users={info} />}
    </div>
  );
};

export default UserInfo;
