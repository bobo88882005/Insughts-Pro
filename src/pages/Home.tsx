import {
  useRef,
  useState
} from "react";


import {
  Upload,
  Users,
  UserRoundCheck,
  HeartHandshake
} from "lucide-react";


import {
  useInstagramAnalyzer
} from "../hooks/useInstagramAnalyzer";


import InsightsHeader
from "../components/layout/InsightsHeader";


import TabGrid,
{
  TabType
}
from "../components/tabs/TabGrid";


import UserList
from "../components/users/UserList";


import ActivitySection
from "../components/activity/ActivitySection";






export default function Home(){



  const inputRef =
    useRef<HTMLInputElement>(null);



  const {
    analysis,
    loading,
    error,
    uploadZip

  } = useInstagramAnalyzer();





  const [activeTab,setActiveTab] =
    useState<TabType>(
      "followers"
    );







  function openUpload(){

    inputRef.current?.click();

  }






  async function handleFile(
    event:
      React.ChangeEvent<HTMLInputElement>
  ){


    const file =
      event.target.files?.[0];


    if(file){

      await uploadZip(file);

    }

  }







  function currentUsers(){


    if(!analysis)
      return [];



    switch(activeTab){


      case "followers":

        return analysis.followers;


      case "following":

        return analysis.following;


      case "notFollowingBack":

        return analysis.notFollowingBack;


      case "pending":

        return analysis.pendingRequests;


      default:

        return [];

    }

  }






  const followBackPercent =

    analysis && analysis.followingCount > 0

    ?

    Math.round(

      (
        analysis.reciprocalCount /
        analysis.followingCount

      ) * 100

    )

    :

    0;







  return (

    <main

      className="
        min-h-screen
        max-w-xl
        mx-auto
        px-5
        pb-12
      "

    >



      <InsightsHeader

        onUpload={
          openUpload
        }

      />





      <input

        ref={
          inputRef
        }

        type="file"

        accept=".zip"

        hidden

        onChange={
          handleFile
        }

      />





      {
        !analysis &&

        <button

          onClick={
            openUpload
          }

          className="
            mt-10
            w-full
            rounded-3xl
            bg-gradient-to-r
            from-pink-500
            to-purple-600
            py-5
            font-semibold
            flex
            items-center
            justify-center
            gap-3
          "

        >

          <Upload size={22}/>

          Carica export Instagram

        </button>

      }






      {
        loading &&

        <div

          className="
            mt-8
            text-center
            text-gray-400
          "

        >

          Analisi in corso...

        </div>

      }






      {
        error &&

        <div

          className="
            mt-6
            rounded-3xl
            bg-red-500/20
            border
            border-red-500/30
            p-4
            text-sm
          "

        >

          {error}

        </div>

      }








      {
        analysis &&

        <>


          <section

            className="
              mt-8
              grid
              grid-cols-3
              gap-3
            "

          >



            <div className="
              rounded-3xl
              bg-white/5
              border
              border-white/10
              p-4
            ">

              <Users size={20}/>

              <div className="mt-3 text-2xl font-bold">

                {
                  analysis.followersCount
                }

              </div>

              <div className="text-xs text-gray-400">

                Followers

              </div>

            </div>





            <div className="
              rounded-3xl
              bg-white/5
              border
              border-white/10
              p-4
            ">

              <UserRoundCheck size={20}/>

              <div className="mt-3 text-2xl font-bold">

                {
                  analysis.followingCount
                }

              </div>

              <div className="text-xs text-gray-400">

                Following

              </div>

            </div>





            <div className="
              rounded-3xl
              bg-white/5
              border
              border-white/10
              p-4
            ">

              <HeartHandshake size={20}/>

              <div className="mt-3 text-2xl font-bold">

                {followBackPercent}%

              </div>

              <div className="text-xs text-gray-400">

                Follow back

              </div>

            </div>



          </section>






          <TabGrid

            active={
              activeTab
            }

            onChange={
              setActiveTab
            }

            counts={{

              followers:
                analysis.followersCount,

              following:
                analysis.followingCount,

              notFollowingBack:
                analysis.notFollowingBackCount,

              pending:
                analysis.pendingRequests.length

            }}

          />






          <UserList

            users={
              currentUsers()
            }

          />







          <ActivitySection

            inactive={
              analysis.inactiveCount
            }

            received={
              analysis.receivedRequests.length
            }

            unfollowed={
              analysis.recentlyUnfollowed.length
            }

          />



        </>

      }



    </main>

  );

}
