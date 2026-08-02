import {
  Users,
  UserCheck,
  UserMinus,
  Clock
} from "lucide-react";


interface TabItem {

  id:
    | "followers"
    | "following"
    | "notFollowingBack"
    | "pending";

  label:string;

  count:number;

}



interface Props {

  active:
    | "followers"
    | "following"
    | "notFollowingBack"
    | "pending";

  onChange:(
    id:
      | "followers"
      | "following"
      | "notFollowingBack"
      | "pending"
  )=>void;


  counts:{

    followers:number;

    following:number;

    notFollowingBack:number;

    pending:number;

  };

}




export default function TabGrid({

  active,

  onChange,

  counts

}:Props){



  const tabs:TabItem[] = [

    {

      id:"followers",

      label:"Followers",

      count:
        counts.followers

    },


    {

      id:"following",

      label:"Following",

      count:
        counts.following

    },


    {

      id:"notFollowingBack",

      label:"Non ricambiano",

      count:
        counts.notFollowingBack

    },


    {

      id:"pending",

      label:"Pending",

      count:
        counts.pending

    }

  ];






  function icon(id:TabItem["id"]){


    if(id==="followers")
      return <Users size={20}/>;


    if(id==="following")
      return <UserCheck size={20}/>;


    if(id==="notFollowingBack")
      return <UserMinus size={20}/>;


    return <Clock size={20}/>;

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
        tabs.map(tab => (


          <button

            key={tab.id}

            onClick={() =>
              onChange(tab.id)
            }


            className={

              active===tab.id

              ?

              "
              rounded-3xl
              p-4
              text-left
              bg-gradient-to-br
              from-pink-500
              via-purple-500
              to-orange-400
              shadow-lg
              transition
              active:scale-95
              "

              :

              "
              rounded-3xl
              p-4
              text-left
              bg-white/5
              border
              border-white/10
              transition
              active:scale-95
              "

            }

          >


            <div
              className="
                mb-4
              "
            >

              {icon(tab.id)}

            </div>




            <div
              className="
                font-semibold
                text-sm
              "
            >

              {tab.label}

            </div>



            <div
              className="
                text-xs
                opacity-70
                mt-1
              "
            >

              {tab.count}

            </div>



          </button>


        ))
      }


    </div>

  );

}
