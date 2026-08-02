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






function buildAnalysis(
  data: ParsedInstagramData
): InstagramAnalysis {



  const followers =
    data.followers;



  const following =
    data.following;




  const followerSet =
    new Set(

      followers.map(

        user =>

          user.username.toLowerCase()

      )

    );




  const followingSet =
    new Set(

      following.map(

        user =>

          user.username.toLowerCase()

      )

    );





  const notFollowingBack =
    following.filter(

      user =>

        !followerSet.has(

          user.username.toLowerCase()

        )

    );





  const youDontFollowBack =
    followers.filter(

      user =>

        !followingSet.has(

          user.username.toLowerCase()

        )

    );





  const reciprocal =
    following.filter(

      user =>

        followerSet.has(

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
    file:File
  ){



    setLoading(true);

    setError(null);




    try {



      const parsed =
        await parseInstagramZip(
          file
        );





      const data:ParsedInstagramData = {


        followers:
          parsed.followers,



        following:
          parsed.following,



        pendingRequests:
          parsed.pendingRequests,



        receivedRequests:
          parsed.receivedRequests,



        recentlyUnfollowed:
          parsed.recentlyUnfollowed


      };





      setAnalysis(

        buildAnalysis(
          data
        )

      );



    }


    catch(error){



      console.error(
        error
      );



      setError(
        "Impossibile leggere l'archivio Instagram"
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
