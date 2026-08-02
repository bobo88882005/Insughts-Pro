import {
  useState
} from "react";


import {
  InstagramAnalysis,
  ParsedInstagramData
} from "../types/instagram";



export function useInstagramAnalyzer(){



  const [analysis,setAnalysis] =
    useState<InstagramAnalysis | null>(null);



  const [loading,setLoading] =
    useState(false);



  const [error,setError] =
    useState<string | null>(null);





  async function uploadZip(
    file: File
  ){


    setLoading(true);

    setError(null);



    try {


      console.log(
        "Analisi file:",
        file.name
      );



      /*
        Qui verrà collegato
        il parser Instagram ZIP.

        Per ora mantiene
        la struttura pronta.
      */


      const emptyData: ParsedInstagramData = {

        followers: [],

        following: [],

        pendingRequests: [],

        receivedRequests: [],

        recentlyUnfollowed: []

      };



      const emptyAnalysis =
        {

          followers:
            emptyData.followers,


          following:
            emptyData.following,


          notFollowingBack:
            [],


          youDontFollowBack:
            [],


          reciprocal:
            [],


          pendingRequests:
            emptyData.pendingRequests,


          receivedRequests:
            emptyData.receivedRequests,


          recentlyUnfollowed:
            emptyData.recentlyUnfollowed,


          possibleInactive:
            [],


          excludedUsers:
            [],



          followersCount:
            0,


          followingCount:
            0,


          originalFollowingCount:
            0,


          excludedCount:
            0,


          inactiveCount:
            0,


          reciprocalCount:
            0,


          notFollowingBackCount:
            0,


          youDontFollowBackCount:
            0

        };



      setAnalysis(
        emptyAnalysis
      );


    }


    catch(err){


      setError(
        "Errore durante l'analisi"
      );


    }


    finally{


      setLoading(false);


    }


  }






  return {


    analysis,


    loading,


    error,


    uploadZip


  };

}
