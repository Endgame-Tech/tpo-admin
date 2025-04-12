import TopLogo from '@/components/TopLogo';
import { ChartBarIcon, CircleStackIcon, Squares2X2Icon } from '@heroicons/react/24/solid';
import { Link } from 'react-router';

export default function Sidebar({ pathname = "" }) {

  const tabs = [
    {
      display_name: "Dashboard",
      href: "/dashboard",
      icon: <Squares2X2Icon className="size-5" />,
    },
    {
      display_name: "Analytics",
      href: "/dashboard/analytics",
      icon: <ChartBarIcon className="size-5" />,
    },
    {
      display_name: "Resources",
      href: "/dashboard/resources",
      icon: <CircleStackIcon className="size-5" />,
    },
  ];
  return (
    <aside
      className={`duration-300 sticky top-0 bg-[#232323] grid grid-rows-[auto,_1fr,_auto] gap-4 w-[250px] `}
    >
      <div className=" p-4">
        <TopLogo />
      </div>
      <ul className="flex flex-col gap-2 p-4">
        {tabs.map((tab) => (
          <li key={tab.display_name} className="w-full text-white/70">
            <Link
              to={tab.href}
              className={`${tab.href === pathname
                ? "bg-[#2DB47540] text-[#2DB475]"
                : " hover:bg-[#2DB47520] hover:text-[#2DB475]"
                } p-2 rounded-lg flex gap-4 items-center text-base group relative z-20 duration-300`}
            >
              <div className="w-[10px] bg-[#2DB475] h-[90%] hidden group-hover:flex absolute -left-[20px] rounded-r-lg"></div>
              <div className="text-[#2DB475]">{tab.icon}</div>
              <p className={"w-full"}>{tab.display_name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}
