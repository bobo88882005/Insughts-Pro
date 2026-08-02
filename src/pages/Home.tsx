import {
  useRef,
  useState
} from "react";


import {
  Upload,
  Sparkles
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


    }


  }







  const followBack =

    analysis && analysis.followingCount

    ?

    Math.round(

      analysis.reciprocalCount /
      analysis.followingCount *
      100

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

        <section

          className="
            mt-14
            rounded-[32px]
            bg-white/5
            border
            border-white/10
            backdrop-blur-xl
            p-8
            text-center
          "

        >


          <div

            className="
              mx-auto
              w-20
              h-20
              rounded-full
              bg-gradient-to-br
              from-pink-500
              via-purple-500
              to-orange-400
              flex
              items-center
              justify-center
            "

          >

            <Sparkles size={36}/>

          </div>





          <h2

            className="
              mt-6
              text-2xl
              font-bold
            "

          >

            Analizza Instagram

          </h2>





          <p

            className="
              mt-3
              text-sm
              text-gray-400
            "

          >

            Carica il tuo export Instagram
            ZIP e scopri follower,
            follow back e attività.

          </p>






          <button

            onClick={
              openUpload
            }

            className="
              mt-7
              w-full
              rounded-3xl
              py-4
              bg-gradient-to-r
              from-pink-500
              to-purple-600
              font-semibold
              flex
              items-center
              justify-center
              gap-2
            "

          >

            <Upload size={20}/>

            Importa Export

          </button>




        </section>

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
            p-4
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

              <div className="text-2xl font-bold">

                {analysis.followersCount}

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

              <div className="text-2xl font-bold">

                {analysis.followingCount}

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

              <div className="text-2xl font-bold">

                {followBack}%

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
