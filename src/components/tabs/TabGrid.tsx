import {
  Users,
  UserCheck,
  UserMinus,
  Clock
} from "lucide-react";


export type TabType =
  | "followers"
  | "following"
  | "notFollowingBack"
  | "pending";



interface Props {

  active: TabType;

  onChange: (
    tab: TabType
  ) => void;

  counts: {

    followers: number;

    following: number;

    notFollowingBack: number;

    pending: number;

  };

}



const tabs = [

  {
    id: "followers" as TabType,
    label: "Followers",
    icon: Users,
    gradient: "from-pink-500 via-red-500 to-orange-400"
  },

  {
    id: "following" as TabType,
    label: "Following",
    icon: UserCheck,
    gradient: "from-purple-500 to-indigo-500"
  },

  {
    id: "notFollowingBack" as TabType,
    label: "Non ricambiano",
    icon: UserMinus,
    gradient: "from-orange-500 to-red-500"
  },

  {
    id: "pending" as TabType,
    label: "Pending",
    icon: Clock,
    gradient: "from-blue-500 to-cyan-400"
  }

];





export default function TabGrid({

  active,

  onChange,

  counts

}: Props) {



  function getCount(
    id: TabType
  ) {


    switch(id) {

      case "followers":
        return counts.followers;

      case "following":
        return counts.following;

      case "notFollowingBack":
        return counts.notFollowingBack;

      case "pending":
        return counts.pending;

    }

  }





  return (

    <div

      className="
        grid
        grid-cols-2
        gap-4
        mt-8
      "

    >

      {
        tabs.map(

          tab => {


            const Icon =
              tab.icon;


            const selected =
              active === tab.id;



            return (

              <button

                key={
                  tab.id
                }

                onClick={
                  () => onChange(tab.id)
                }

                className={`
                  relative
                  overflow-hidden
                  rounded-[28px]
                  p-5
                  text-left
                  transition-all
                  duration-300
                  active:scale-95
                  ${
                    selected

                    ? `
                      bg-gradient-to-br
                      ${tab.gradient}
                      shadow-2xl
                      scale-[1.03]
                    `

                    :

                    `
                      bg-white/5
                      border
                      border-white/10
                      backdrop-blur-xl
                      hover:bg-white/10
                    `
                  }
                `}

              >


                <Icon

                  size={24}

                  strokeWidth={2}

                />



                <div

                  className="
                    mt-6
                    text-sm
                    font-medium
                    opacity-90
                  "

                >

                  {tab.label}

                </div>



                <div

                  className="
                    mt-1
                    text-3xl
                    font-bold
                  "

                >

                  {
                    getCount(
                      tab.id
                    )
                  }

                </div>



                {
                  selected &&

                  <div

                    className="
                      absolute
                      inset-0
                      bg-white/10
                      opacity-30
                      pointer-events-none
                    "

                  />

                }


              </button>

            );


          }

        )

      }


    </div>

  );

}
