import {
  useState
} from "react";


import {
  InstagramAnalysis,
  ParsedInstagramData
} from "../types/instagram";





function createEmptyAnalysis(
  data: ParsedInstagramData
): InstagramAnalysis {


  return {

    followers:
      data.followers,


    following:
      data.following,


    notFollowingBack:
      [],


    youDontFollowBack:
      [],


    reciprocal:
      [],


    pendingRequests:
      data.pendingRequests,


    receivedRequests:
      data.receivedRequests,


    recentlyUnfollowed:
      data.recentlyUnfollowed,


    possibleInactive:
      [],


    excludedUsers:
      [],



    followersCount:
      data.followers.length,


    followingCount:
      data.following.length,


    originalFollowingCount:
      data.following.length,


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

}








export function useInstagramAnalyzer(){



  const [analysis,setAnalysis] =
    useState<InstagramAnalysis | null>(
      null
    );



  const [loading,setLoading] =
    useState(false);



  const [error,setError] =
    useState<string | null>(
      null
    );







  async function uploadZip(
    file: File
  ){


    setLoading(true);

    setError(null);




    try {



      console.log(
        "Instagram ZIP:",
        file.name
      );



      const emptyData: ParsedInstagramData = {


        followers: [],


        following: [],


        pendingRequests: [],


        receivedRequests: [],


        recentlyUnfollowed: []

      };




      setAnalysis(

        createEmptyAnalysis(
          emptyData
        )

      );



    }


    catch {


      setError(
        "Errore durante l'analisi"
      );


    }


    finally {


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
