/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";

const PredictionData = ({ title }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <button
        type="button"
        class="top-0 bottom-0 text-white focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2"
        onClick={() => setOpenModal(true)}
      >
        <svg
          class="w-[36px] h-[36px] text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fill-rule="evenodd"
            d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z"
            clip-rule="evenodd"
          />
        </svg>

        <span class="sr-only">Icon description</span>
      </button>
      <div className={!openModal ? 'hidden' : ''}>
        <div
          id="default-modal"
          tabindex="-1"
          aria-hidden="true"
          className="fixed inset-0 z-50 flex justify-center items-center overflow-y-auto bg-gray-800 bg-opacity-50"
        >
          <div class="relative p-4 w-full max-w-2xl max-h-full">
            <div class="relative rounded-lg shadow bg-gray-700">
              <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600">
                <h3 class="text-xl font-semibold text-white">
                  {title}
                </h3>
                <button
                  type="button"
                  class="text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white"
                  data-modal-hide="default-modal"
                  onClick={() => setOpenModal(false)}
                >
                  <svg
                    class="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>
              <div class="p-4 md:p-5 space-y-4">
                <p class="text-base leading-relaxed text-gray-400">
                  With less than a month to go before the European Union enacts
                  new consumer privacy laws for its citizens, companies around
                  the world are updating their terms of service agreements to
                  comply.
                </p>
                <p class="text-base leading-relaxed text-gray-400">
                  The European Union’s General Data Protection Regulation
                  (G.D.P.R.) goes into effect on May 25 and is meant to ensure a
                  common set of data rights in the European Union. It requires
                  organizations to notify users as soon as possible of high-risk
                  data breaches that could personally affect them.
                </p>
              </div>
              <div class="flex items-center p-4 md:p-5 border-t rounded-b border-gray-600">
                <button
                  data-modal-hide="default-modal"
                  type="button"
                  class="text-white focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                >
                  I accept
                </button>
                <button
                  data-modal-hide="default-modal"
                  type="button"
                  class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PredictionData;
