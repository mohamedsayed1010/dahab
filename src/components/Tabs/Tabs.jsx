import {tabs} from "../../constant/tabs"
import useTabsLogic from "./hook/useTabsLogic";



export default function Tabs() {

  const getFlex = (label) => {
  switch (label) {
    case "فضة":
      return "flex-[1.4]";
    case "سبائك":
      return "flex-[0.8]";
    default:
      return "flex-1";
  }
};
  const{
     isMainActive,
    handleMainClick,
    handleSubClick,
  } =useTabsLogic("tab");

  return (
    <div className="w-full mt-3 px-2 md:px-4">
      <div className="flex w-full backdrop-blur-md rounded-2xl border border-border shadow-lg overflow-hidden">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const mainActive = isMainActive(tab);
          const hasChildren = !!tab.children;

          return (
            <div
              key={tab.id}
                className={`flex flex-col border-l border-border last:border-l-0 ${getFlex(tab.label)}`}
            >
              {/* MAIN TAB */}
              <button
                onClick={() => handleMainClick(tab)}
                className={`
                  flex flex-col items-center justify-center
                  h-full min-h-[22px]
                  transition-all duration-300
                  whitespace-nowrap
                  py-2

                  ${mainActive ? "bg-primary text-white" : "text-textMuted"}

                
                `}
              >
                <span className="text-lg md:text-2xl font-bold">
                  {tab.label}
                </span>
              </button>

              {/* SUB TABS */}
              {hasChildren && (
                <div className="flex border-t border-border">
                  {tab.children.map((child) => {
                    const subActive = location.pathname === child.path;

                    const Icon = child.icon;

                    return (
                      <button
                        key={child.id}
                        onClick={() => handleSubClick(child.path)}
                        className={`
                        flex-1
                        flex flex-col
                        items-center justify-center
                        gap-1
                        py-2
                        px-1
                        
                        transition-all duration-300
                        border-l border-border last:border-l-0
                        ${subActive ? "bg-primary text-white" : "bg-bg text-textMuted"}
                      `}
                      >
                        <Icon className="w-5 h-5 md:w-7 md:h-7" />

                        <span className="text-[12px] md:text-xs lg:text-lg font-medium">
                          {child.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
