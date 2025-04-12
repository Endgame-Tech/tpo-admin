import { UserGroupIcon } from "@heroicons/react/24/outline";
import { Card } from "../page";
import { getDeactivatedAccountsData, getUserData, getVolunteersData, getVotersData } from "../../../../utils/CardData";

interface UsersCardProps {
  data: any[] | null;
}

export function UsersCard({ data }: UsersCardProps) {
  const { userCount, verifiedUsersAsPercentage } = getUserData(data);

  return (
    <Card
      icon={<UserGroupIcon className="size-6 text-black" />}
      title={"Users"}
      mainStats={`${userCount}`}
      subStats={`${verifiedUsersAsPercentage}% are Verified`}
    />
  );
}

export function VotersCard({ data }: UsersCardProps) {
  const {votersCount, votersAsPercentage } = getVotersData(data);
  return (
    <Card
      icon={<UserGroupIcon className="size-6 text-black" />}
      title={"Voters"}
      mainStats={`${votersCount}`}
      subStats={`${votersAsPercentage}% are Verified`}
    />
  );
}

export function VolunteerCard({ data }: UsersCardProps) {
    const {volunteersCount, volunteersAsPercentage } = getVolunteersData(data);
    return (
      <Card
        icon={<UserGroupIcon className="size-6 text-black" />}
        title={"Volunteers"}
        mainStats={`${volunteersCount}`}
        subStats={`${volunteersAsPercentage}% are Verified`}
      />
    );
}

export function DeactivatedAccountsCard({ data }: UsersCardProps) {
    const {deactivatedAccountsCount, deactivatedAccountsAsPercentage } = getDeactivatedAccountsData(data);
    return (
      <Card
        icon={<UserGroupIcon className="size-6 text-black" />}
        title={"Deactivated Accounts"}
        mainStats={`${deactivatedAccountsCount}`}
        subStats={`${deactivatedAccountsAsPercentage}% of Users`}
      />
    );
}
