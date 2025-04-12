import { ArrowPathIcon } from "@heroicons/react/20/solid";

export function SpinningArrow() {
  return <ArrowPathIcon className="size-4  animate-spin" />;
}

export function Spinning4Squares() {
  return (
    <div className="flex gap-2 items-center justify-center">
      <div className="flex gap-2">
        <div className=" animate-spin w-2 h-2 bg-accent-green"></div>
        <div className=" animate-spin w-2 h-2 bg-accent-red"></div>
        <div className=" animate-spin w-2 h-2 bg-accent-green"></div>
        <div className=" animate-spin w-2 h-2 bg-accent-red"></div>
      </div>
    </div>
  );
}
