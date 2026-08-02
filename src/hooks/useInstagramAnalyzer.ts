import {
  useState
} from "react";


import {
  InstagramAnalysis,
  ParsedInstagramData
} from "../types/instagram";


import {
  parseInstagramZip
} from "../utils/instagramParser";





function createEmptyAnalysis(
  data: ParsedInstagramData
): InstagramAnalysis {


  const followers =
    data.followers;


  const following =
    data.following;



  const followerNames =
    new Set(

      followers.map(

        user =>
          user.username.toLowerCase()

      )

    );



  const followingNames =
    new Set(

      following.map(

        user =>
          user.username.toLowerCase()

      )

    );



  const notFollowingBack =
    following.filter(

      user =>

        !followerNames.has(

          user.username.toLowerCase()

        )

    );



  const youDontFollowBack =
    followers.filter(

      user =>

        !followingNames.has(

          user.username.toLowerCase()

        )

    );



  const reciprocal =
    following.filter(

      user =>

        followerNames.has(

          user.username.toLowerCase()

        )

    );






  return {


    followers,


    following,


    notFollowingBack,


    youDontFollowBack,


    reciprocal,



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
      followers.length,


    followingCount:
      following.length,


    originalFollowingCount:
      following.length,


    excludedCount:
      0,


    inactiveCount:
      0,


    reciprocalCount:
      reciprocal.length,


    notFollowingBackCount:
      notFollowingBack.length,


    youDontFollowBackCount:
      youDontFollowBack.length

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



      const users =
        await parseInstagramZip(
          file
        );




      const data: ParsedInstagramData = {


        followers:
          users,


        following:
          [],


        pendingRequests:
          [],


        receivedRequests:
          [],


        recentlyUnfollowed:
          []

      };





      setAnalysis(

        createEmptyAnalysis(
          data
        )

      );



    }


    catch(error){



      console.error(
        error
      );



      setError(
        "Errore durante l'analisi del file Instagram"
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
