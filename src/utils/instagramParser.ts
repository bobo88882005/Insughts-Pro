import JSZip from "jszip";

import {
  InstagramUser
} from "../types/instagram";



export interface InstagramData {

  followers: InstagramUser[];

  following: InstagramUser[];

  pendingRequests: InstagramUser[];

  receivedRequests: InstagramUser[];

  recentlyUnfollowed: InstagramUser[];

}







function extractInstagramUsers(
  html: string
): string[] {


  const users = new Set<string>();



  const regex =
    /<a\s+href="https:\/\/www\.instagram\.com\/([^"\/?]+)"[^>]*>.*?<\/a>/gis;



  let match;



  while(
    (match = regex.exec(html)) !== null
  ){


    const username =
      match[1]
        .trim()
        .toLowerCase();



    if(
      username &&
      ![
        "accounts",
        "explore",
        "about"
      ].includes(username)
    ){

      users.add(username);

    }


  }



  return Array.from(users);

}









function toInstagramUsers(
  list:string[],
  source:
    "followers" |
    "following"
):InstagramUser[]{


  return list.map(

    username => ({

      username,

      profileUrl:
        `https://www.instagram.com/${username}/`,

      source

    })

  );


}









export async function parseInstagramZip(
  file: File
):Promise<InstagramData>{



  const zip =
    await JSZip.loadAsync(file);





  let followers:string[] = [];

  let following:string[] = [];







  for(
    const filename of Object.keys(zip.files)
  ){



    const name =
      filename.toLowerCase();




    if(
      !name.endsWith(".html")
    )
      continue;





    const html =
      await zip.files[filename]
      .async("string");





    const users =
      extractInstagramUsers(html);







    if(
      name.includes("followers")
    ){


      followers =
        [
          ...followers,
          ...users
        ];


    }







    if(
      name.includes("following")
    ){


      following =
        [
          ...following,
          ...users
        ];


    }



  }









  return {


    followers:

      toInstagramUsers(

        Array.from(
          new Set(followers)
        ),

        "followers"

      ),





    following:

      toInstagramUsers(

        Array.from(
          new Set(following)
        ),

        "following"

      ),






    pendingRequests: [],



    receivedRequests: [],



    recentlyUnfollowed: []



  };


}
