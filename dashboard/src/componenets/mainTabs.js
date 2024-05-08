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
            to="/FirstBlood"
            class={location.pathname === "/FirstBlood" || location.pathname === "/" ? activeTab : normalTab}
          >
            First Blood
          </Link>
        </li>
        <li class="me-2">
          <Link
            to="/FirstTower"
            class={location.pathname === "/FirstTower" ? activeTab : normalTab}
          >
            First Tower
          </Link>
        </li>
        <li class="me-2">
          <Link
            to="/FirstDragon"
            class={location.pathname === "/FirstDragon" ? activeTab : normalTab}
          >
            First Dragon
          </Link>
        </li>
        <li class="me-2">
          <Link
            to="/FirstBaron"
            class={location.pathname === "/FirstBaron" ? activeTab : normalTab}
          >
            First Baron
          </Link>
        </li>
        <li class="me-2">
          <Link
            to="/FirstInhibitor"
            class={location.pathname === "/FirstInhibitor" ? activeTab : normalTab}
          >
            First Inhibitor
          </Link>
        </li>
        <li class="me-2">
          <Link
            to="/MostKills"
            class={location.pathname === "/MostKills" ? activeTab : normalTab}
          >
            Most Kills
          </Link>
        </li>
        <li class="me-2">
          <Link
            to="/Winner"
            class={location.pathname === "/Winner" ? activeTab : normalTab}
          >
            Winner
          </Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default MainTabs;
