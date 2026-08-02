import {
  useRef,
  useState
} from "react";


import {
  useInstagramAnalyzer
} from "../hooks/useInstagramAnalyzer";


import InsightsHeader
from "../components/layout/InsightsHeader";


import TabGrid
from "../components/tabs/TabGrid";


import UserList
from "../components/users/UserList";


import ActivitySection
from "../components/activity/ActivitySection";



type TabType =
  | "followers"
  | "following"
  | "notFollowingBack"
  | "pending";





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
    useState<TabType>("followers");







  function openFile(){


    inputRef.current?.click();


  }







  async function handleFile(
    event: React.ChangeEvent<HTMLInputElement>
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







  return (

    <main

      className="
        min-h-screen
        bg-black
        text-white
        px-4
        pb-10
      "

    >


      <input

        ref={inputRef}

        type="file"

        accept=".zip"

        hidden

        onChange={handleFile}

      />





      <InsightsHeader

        onUpload={openFile}

      />







      {
        analysis &&

        <>


          <TabGrid

            active={activeTab}

            onChange={setActiveTab}

            counts={

              {

                followers:
                  analysis.followersCount,


                following:
                  analysis.followingCount,


                notFollowingBack:
                  analysis.notFollowingBackCount,


                pending:
                  analysis.pendingRequests.length

              }

            }

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







      {
        !analysis &&

        <div

          className="
            mt-16
            text-center
            text-gray-500
            text-sm
          "

        >

          Carica il tuo archivio Instagram

        </div>

      }







      {
        loading &&

        <p

          className="
            mt-5
            text-center
            text-sm
            text-gray-400
          "

        >

          Analisi in corso...

        </p>

      }






      {
        error &&

        <p

          className="
            mt-5
            text-center
            text-sm
            text-red-400
          "

        >

          {error}

        </p>

      }



    </main>

  );

}
