import { useLocation, useNavigate } from "react-router-dom";

export default function useTabsLogic() {
  const navigate = useNavigate();
  const location = useLocation();


  // 🔥 main active checker
  const isMainActive = (tab) => {
    if (!tab.children) return location.pathname === tab.path;

    return tab.children.some((child) => location.pathname === child.path);
  };

  // 🔥 handlers
  const handleMainClick = (tab) => {
    if (!tab.children) {
      navigate(tab.path);
    }
  };

  const handleSubClick = (path) => {
    navigate(path);
  };

  return {
    isMainActive,
    handleMainClick,
    handleSubClick,
  };
}