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






function createUsers(
  usernames: string[]
): InstagramUser[] {

  return Array.from(
    new Set(usernames)
  )
  .map(

    username => ({

      username

    } as InstagramUser)

  );

}







function extractHtmlUsers(
  html: string
): string[] {


  const users =
    new Set<string>();



  const profileRegex =
    /instagram\.com\/([^/"?]+)/gi;



  let match;



  while(
    (match = profileRegex.exec(html)) !== null
  ){

    if(match[1]){

      users.add(
        match[1]
      );

    }

  }





  const anchorRegex =
    /<a[^>]*>(.*?)<\/a>/gi;



  while(
    (match = anchorRegex.exec(html)) !== null
  ){

    const username =
      match[1]
      .replace(/<[^>]+>/g,"")
      .trim();



    if(
      username &&
      !username.includes(" ")
    ){

      users.add(username);

    }

  }




  return Array.from(users);

}








function extractJsonUsers(
  data:any
): string[] {


  const users =
    new Set<string>();





  function scan(
    value:any
  ){


    if(
      !value
    )
      return;




    if(
      Array.isArray(value)
    ){

      value.forEach(scan);

      return;

    }





    if(
      typeof value === "object"
    ){


      if(
        Array.isArray(
          value.string_list_data
        )
      ){

        value.string_list_data.forEach(
          (item:any)=>{

            if(item.value){

              users.add(
                item.value
              );

            }

          }
        );

      }




      Object.values(value)
      .forEach(scan);


    }


  }





  scan(data);



  return Array.from(users);

}








function isFollowersFile(
  path:string
):boolean {


  const file =
    path.toLowerCase();



  return (

    file.includes("followers_") ||

    file.endsWith(
      "followers.html"
    ) ||

    file.endsWith(
      "followers.json"
    )

  );

}








function isFollowingFile(
  path:string
):boolean {


  const file =
    path.toLowerCase();



  return (

    (
      file.includes("following")
      ||
      file.includes("following.html")
      ||
      file.includes("following.json")
    )

    &&

    !file.includes("followers")

  );

}








export async function parseInstagramZip(
  file: File
): Promise<InstagramData>{



  const zip =
    await JSZip.loadAsync(file);




  const followers:string[] = [];

  const following:string[] = [];






  for(
    const path of Object.keys(zip.files)
  ){


    const lower =
      path.toLowerCase();




    if(
      !(
        lower.endsWith(".html")
        ||
        lower.endsWith(".json")
      )
    ){

      continue;

    }






    let users:string[] = [];





    const content =
      await zip.files[path]
      .async("string");





    if(
      lower.endsWith(".html")
    ){

      users =
        extractHtmlUsers(
          content
        );


    }
    else {


      try {

        users =
          extractJsonUsers(
            JSON.parse(content)
          );


      }
      catch {

        continue;

      }


    }







    if(
      isFollowersFile(path)
    ){

      followers.push(
        ...users
      );

    }







    else if(
      isFollowingFile(path)
    ){

      following.push(
        ...users
      );

    }



  }








  return {

    followers:
      createUsers(
        followers
      ),



    following:
      createUsers(
        following
      ),



    pendingRequests: [],



    receivedRequests: [],



    recentlyUnfollowed: []

  };


}
