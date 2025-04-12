import DropdownMenu from "@/components/DropdownMenu";

interface sideBarPropType {
  pathname: "/dashboard" | "/dashboard/analytics" | "/dashboard/resources";
}

export default function Header({ pathname }: sideBarPropType) {
  const headers: { [key in typeof pathname]: string } = {
    "/dashboard": "Overview",
    "/dashboard/analytics": "Analytics",
    "/dashboard/resources": "Resources",
  };

  return (
    <div className="w-full px-4 py-8">
      <div className="flex justify-between w-full text-[#B5B5B5]">
        <p className="text-4xl">{headers[pathname]}</p>
        <div className="flex gap-2 items-center">
          <DropdownMenu/>
        </div>
      </div>

      <div className="flex items-center">
        <div className="w-1.5 h-1.5 bg-[#464646] rounded-full"></div>
        <div className="w-full h-[2px] bg-[#464646]"></div>
        <div className="w-1.5 h-1.5 bg-[#464646] rounded-full"></div>
      </div>
    </div>
  );
}
