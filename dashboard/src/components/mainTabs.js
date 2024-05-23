import { Outlet, Link, useLocation  } from "react-router-dom";
const MainTabs = () => {
  const location = useLocation()
  const normalTab ="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:border-gray-300 hover:text-gray-300"
  const activeTab =  "inline-block p-4  border-b-2 rounded-t-lg active text-blue-500 border-blue-500"
  return (
    <div class="text-sm font-medium text-center border-b text-gray-400 border-gray-700">
      <ul class="flex flex-wrap -mb-px">
      <li class="me-2">
          <Link
            to="/"
            class={location.pathname === "/" ? activeTab : normalTab}
          >
            Predictions
          </Link>
        </li>
        <li class="me-2">
          <Link
            to="/RecentGames"
            class={location.pathname === "/RecentGames" ? activeTab : normalTab}
          >
            Players KDA
          </Link>
        </li>
        <li class="me-2">
          <Link
            to="/PlayerStats"
            class={location.pathname === "/PlayerStats" ? activeTab : normalTab}
          >
            Player Statistics
          </Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default MainTabs;
