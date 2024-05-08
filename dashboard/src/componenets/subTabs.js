const SubTabs = () => {
  return (
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
  );
};

export default SubTabs