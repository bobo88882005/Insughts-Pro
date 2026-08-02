import { Users, UserCheck, UserMinus, Clock } from "lucide-react";

export type TabType =
  | "followers"
  | "following"
  | "notFollowingBack"
  | "pending";

interface Props {
  active: TabType;
  onChange: (tab: TabType) => void;
  counts: {
    followers: number;
    following: number;
    notFollowingBack: number;
    pending: number;
  };
}

const tabs = [
  {
    id: "followers",
    label: "Followers",
    icon: Users,
    color:
      "from-pink-500 via-fuchsia-500 to-purple-500",
  },
  {
    id: "following",
    label: "Following",
    icon: UserCheck,
    color:
      "from-violet-500 to-indigo-500",
  },
  {
    id: "notFollowingBack",
    label: "Non ricambiano",
    icon: UserMinus,
    color:
      "from-orange-500 to-red-500",
  },
  {
    id: "pending",
    label: "Pending",
    icon: Clock,
    color:
      "from-sky-500 to-cyan-500",
  },
] satisfies {
  id: TabType;
  label: string;
  icon: typeof Users;
  color: string;
}[];

export default function TabGrid({
  active,
  onChange,
  counts,
}: Props) {
  return (
    <div className="grid grid-cols-2 gap-3 mt-6">
      {tabs.map((tab) => {
        const Icon = tab.icon;

        const value =
          tab.id === "followers"
            ? counts.followers
            : tab.id === "following"
            ? counts.following
            : tab.id === "notFollowingBack"
            ? counts.notFollowingBack
            : counts.pending;

        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={
              active === tab.id
                ? `rounded-3xl p-5 bg-gradient-to-br ${tab.color} text-white shadow-xl transition-all duration-200 scale-[0.98]`
                : "rounded-3xl p-5 bg-white/5 border border-white/10 text-white transition-all duration-200 hover:bg-white/10"
            }
          >
            <Icon size={22} />

            <div className="mt-6 text-sm opacity-90">
              {tab.label}
            </div>

            <div className="text-2xl font-bold mt-1">
              {value}
            </div>
          </button>
        );
      })}
    </div>
  );
}
