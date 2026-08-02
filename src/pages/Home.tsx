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



type Tab =
  | "followers"
  | "following"
  | "notFollowingBack"
  | "pending";





export default function Home(){



  const fileInput =
    useRef<HTMLInputElement>(null);



  const {

    analysis,

    uploadZip,

    loading,

    error

  } = useInstagramAnalyzer();




  const [activeTab,setActiveTab] =
    useState<Tab>("followers");






  async function upload(){

    fileInput.current?.click();

  }





  async function handleFile(
    e:React.ChangeEvent<HTMLInputElement>
  ){

    const file =
      e.target.files?.[0];


    if(file){

      await uploadZip(file);

    }

  }







  function users(){


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
        px-4
        pb-10
      "

    >



      <input

        ref={fileInput}

        type="file"

        accept=".zip"

        hidden

        onChange={handleFile}

      />





      <InsightsHeader

        onUpload={upload}

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
              users()
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
            mt-10
            text-center
            text-sm
            text-gray-500
          "

        >

          Carica il tuo archivio Instagram

        </div>

      }








      {
        loading &&

        <p

          className="
            mt-4
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
            mt-4
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
