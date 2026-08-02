import {
  useRef,
  useState
} from "react";


import {
  Upload
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

      await uploadZip(
        file
      );

    }


  }








  function getUsers(){



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








  return (



    <main

      className="
        min-h-screen
        bg-black
        text-white
        px-5
        pb-10
        max-w-xl
        mx-auto
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
            py-5
            bg-gradient-to-r
            from-pink-500
            to-purple-600
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
            mt-5
            rounded-2xl
            bg-red-500/20
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
              getUsers()
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
