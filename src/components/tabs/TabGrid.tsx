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
    gradient:
      "from-pink-500 to-purple-500"
  },


  {
    id: "following" as TabType,
    label: "Following",
    icon: UserCheck,
    gradient:
      "from-violet-500 to-indigo-500"
  },


  {
    id: "notFollowingBack" as TabType,
    label: "Non ricambiano",
    icon: UserMinus,
    gradient:
      "from-orange-500 to-red-500"
  },


  {
    id: "pending" as TabType,
    label: "Pending",
    icon: Clock,
    gradient:
      "from-blue-500 to-cyan-500"
  }

];








export default function TabGrid({

  active,

  onChange,

  counts

}: Props){



  function getCount(
    id: TabType
  ){


    switch(id){


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
        gap-3
        mt-5
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
                  () =>
                    onChange(
                      tab.id
                    )
                }


                className={

                  selected

                  ?

                  `
                  rounded-3xl
                  p-5
                  text-left
                  bg-gradient-to-br
                  ${tab.gradient}
                  shadow-lg
                  scale-[0.98]
                  transition
                  `

                  :

                  `
                  rounded-3xl
                  p-5
                  text-left
                  bg-white/[0.04]
                  border
                  border-white/10
                  transition
                  hover:bg-white/[0.08]
                  `

                }

              >


                <Icon

                  size={22}

                />



                <div

                  className="
                    mt-5
                    text-xs
                    opacity-80
                  "

                >

                  {tab.label}

                </div>



                <div

                  className="
                    text-2xl
                    font-bold
                    mt-1
                  "

                >

                  {
                    getCount(
                      tab.id
                    )
                  }

                </div>



              </button>


            );

          }

        )

      }


    </div>

  );

}
