import { useTheme } from './ThemeContext';

const Pagination = () => {
  const { isDarkMode } = useTheme();

    return (
        <nav aria-label="Page navigation example">
        <ul class={`pagination ${isDarkMode ? "bg-dark" : ""} justify-content-center`}>
          <li class="page-item"><span class={`page-link ${isDarkMode ? "bg-dark text-light" : ""}`} href="#">&laquo;</span></li>
          <li class="page-item"><span class={`page-link ${isDarkMode ? "bg-dark text-light" : ""}`} href="#">1</span></li>
          <li class="page-item"><span class={`page-link ${isDarkMode ? "bg-dark text-light" : ""}`} href="#">2</span></li>
          <li class="page-item"><span class={`page-link ${isDarkMode ? "bg-dark text-light" : ""}`} href="#">3</span></li>
          <li class="page-item"><span class={`page-link ${isDarkMode ? "bg-dark text-light" : ""}`} href="#">&raquo;</span></li>
        </ul>
    </nav>
    );
}

export default Pagination;
