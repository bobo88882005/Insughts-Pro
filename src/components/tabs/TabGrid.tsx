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

    followers:number;

    following:number;

    notFollowingBack:number;

    pending:number;

  };

}





const tabs = [

  {
    id:"followers" as TabType,
    label:"Followers",
    icon:Users,
    color:"from-pink-500 to-purple-600"
  },


  {
    id:"following" as TabType,
    label:"Following",
    icon:UserCheck,
    color:"from-purple-500 to-indigo-600"
  },


  {
    id:"notFollowingBack" as TabType,
    label:"Non ricambiano",
    icon:UserMinus,
    color:"from-orange-500 to-red-600"
  },


  {
    id:"pending" as TabType,
    label:"Pending",
    icon:Clock,
    color:"from-blue-500 to-cyan-500"
  }

];







export default function TabGrid({

  active,

  onChange,

  counts

}:Props){





  function countFor(
    id:TabType
  ){


    if(id==="followers")
      return counts.followers;


    if(id==="following")
      return counts.following;


    if(id==="notFollowingBack")
      return counts.notFollowingBack;


    return counts.pending;


  }








  return (

    <div

      className="
        grid
        grid-cols-2
        gap-3
        mt-6
      "

    >


      {
        tabs.map(

          tab => {


            const Icon =
              tab.icon;


            const selected =
              active===tab.id;





            return (

              <button

                key={
                  tab.id
                }

                onClick={
                  ()=>onChange(tab.id)
                }

                className={

                  selected

                  ?

                  `
                  rounded-3xl
                  p-5
                  text-left
                  bg-gradient-to-br
                  ${tab.color}
                  shadow-xl
                  scale-[1.02]
                  transition-all
                  duration-300
                  `

                  :

                  `
                  rounded-3xl
                  p-5
                  text-left
                  bg-white/5
                  border
                  border-white/10
                  hover:bg-white/10
                  transition-all
                  duration-300
                  `

                }

              >


                <Icon

                  size={24}

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
                    text-3xl
                    font-bold
                    mt-1
                  "

                >

                  {
                    countFor(
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
