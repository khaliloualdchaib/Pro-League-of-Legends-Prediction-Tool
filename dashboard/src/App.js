import "./App.css";
import ChampSelect from "./componenets/champSelect";
function App() {
  return (
    <div className="App">
      <h1>League of Legends Prediction Tool</h1>
      <div class="grid grid-cols-5 gap-4">
        <div>
          <div class="flex flex-col">
            <div>
              <ChampSelect team="blue" />
            </div>
            <div className="pt-5">
              <ChampSelect team="red" />
            </div>
          </div>
        </div>
        <div class="col-span-4">
          <div class="flex flex-col">
            <div>
              <div class="text-sm font-medium text-center border-b text-gray-400 border-gray-700">
                <ul class="flex flex-wrap -mb-px">
                  <li class="me-2">
                    <a
                      href="#t"
                      class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:border-gray-300 hover:text-gray-300"
                    >
                      First Blood
                    </a>
                  </li>
                  <li class="me-2">
                    <a
                      href="#t"
                      class="inline-block p-4  border-b-2 rounded-t-lg active text-blue-500 border-blue-500"
                      aria-current="page"
                    >
                      First Tower
                    </a>
                  </li>
                  <li class="me-2">
                    <a
                      href="#t"
                      class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:border-gray-300 hover:text-gray-300"
                    >
                      First Dragon
                    </a>
                  </li>
                  <li class="me-2">
                    <a
                      href="#t"
                      class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:border-gray-300 hover:text-gray-300"
                    >
                      First Baron
                    </a>
                  </li>
                  <li class="me-2">
                    <a
                      href="#t"
                      class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:border-gray-300 hover:text-gray-300"
                    >
                      First Inhibitor
                    </a>
                  </li>
                  <li class="me-2">
                    <a
                      href="#t"
                      class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:border-gray-300 hover:text-gray-300"
                    >
                      Most Kills
                    </a>
                  </li>
                  <li class="me-2">
                    <a
                      href="#t"
                      class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:border-gray-300 hover:text-gray-300"
                    >
                      Win
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex justify-center pt-5">
              <ul class="flex flex-wrap text-sm font-medium text-center text-gray-400">
                <li class="me-2">
                  <a
                    href="#t"
                    class="inline-block px-4 py-3 text-white bg-blue-600 rounded-lg active"
                    aria-current="page"
                  >
                    Prediction
                  </a>
                </li>
                <li class="me-2">
                  <a
                    href="#t"
                    class="inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white"
                  >
                    Statistics
                  </a>
                </li>
              </ul>
            </div>
            <div className="mt-5">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
