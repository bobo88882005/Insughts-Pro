import JSZip from "jszip";


import {
  InstagramUser
} from "../types/instagram";





export interface InstagramParsedResult {

  followers: InstagramUser[];

  following: InstagramUser[];

  pendingRequests: InstagramUser[];

  receivedRequests: InstagramUser[];

  recentlyUnfollowed: InstagramUser[];

}








function normalizeUsername(
  username: string
): string {


  return username

    .trim()

    .replace("@", "")

    .toLowerCase();

}








function createUser(
  username: string
): InstagramUser {


  return {

    username,

    profileUrl:
      `https://www.instagram.com/${username}/`

  };

}








function uniqueUsers(
  users: InstagramUser[]
){


  return Array.from(

    new Map(

      users.map(

        user => [

          user.username,

          user

        ]

      )

    ).values()

  );

}








function extractUsers(
  json:any
): InstagramUser[] {


  const result: InstagramUser[] = [];





  function scan(
    value:any
  ){



    if(
      Array.isArray(value)
    ){


      value.forEach(
        scan
      );


      return;

    }





    if(
      value &&
      typeof value === "object"
    ){



      const username =

        value?.string_list_data?.[0]?.value;



      if(username){


        result.push(

          createUser(

            normalizeUsername(
              username
            )

          )

        );

      }





      Object.values(value)
        .forEach(
          scan
        );

    }


  }






  scan(json);



  return uniqueUsers(
    result
  );

}









async function readJsonFile(
  zip:JSZip,
  filename:string
){



  const file =
    Object.keys(zip.files)
      .find(

        path =>

          path.toLowerCase()
            .endsWith(
              filename.toLowerCase()
            )

      );



  if(!file)
    return [];




  try{


    const text =
      await zip.files[file]
        .async("text");



    const json =
      JSON.parse(text);



    return extractUsers(
      json
    );



  }

  catch{


    return [];

  }

}









export async function parseInstagramZip(
  file:File
): Promise<InstagramParsedResult> {



  const zip =
    await JSZip.loadAsync(
      file
    );





  return {


    followers:

      await readJsonFile(

        zip,

        "followers_1.json"

      ),




    following:

      await readJsonFile(

        zip,

        "following.json"

      ),




    pendingRequests:

      await readJsonFile(

        zip,

        "pending_follow_requests.json"

      ),




    receivedRequests:

      await readJsonFile(

        zip,

        "follow_requests_received.json"

      ),




    recentlyUnfollowed:

      await readJsonFile(

        zip,

        "recently_unfollowed_accounts.json"

      )


  };

}
