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







function toUsers(
  names: string[]
): InstagramUser[] {


  return Array.from(
    new Set(names)
  )
  .map(

    username => ({

      username

    } as InstagramUser)

  );

}







function extractHtml(
  html: string
): string[] {


  const users =
    new Set<string>();



  const regex =
    /instagram\.com\/([^/"?]+)/gi;



  let match;



  while(
    (match = regex.exec(html))
  ){

    if(match[1]){

      users.add(
        match[1]
      );

    }

  }






  const links =
    /<a[^>]*>(.*?)<\/a>/gi;



  while(
    (match = links.exec(html))
  ){

    const value =
      match[1]
      .replace(/<[^>]+>/g,"")
      .trim();



    if(
      value &&
      !value.includes(" ")
    ){

      users.add(value);

    }

  }




  return Array.from(users);

}







function extractJson(
  json:any
): string[] {


  const users =
    new Set<string>();



  function scan(
    value:any
  ){


    if(
      typeof value === "object" &&
      value !== null
    ){

      if(
        Array.isArray(value)
      ){

        value.forEach(scan);

      }

      else {


        if(
          value.string_list_data
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


  }



  scan(json);



  return Array.from(users);

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
        lower.endsWith(".html") ||
        lower.endsWith(".json")
      )
    )
      continue;





    const content =
      await zip.files[path]
      .async("string");



    let users:string[] = [];





    if(
      lower.endsWith(".html")
    ){

      users =
        extractHtml(content);

    }
    else {


      try{

        users =
          extractJson(
            JSON.parse(content)
          );

      }
      catch{

        continue;

      }

    }







    if(
      lower.includes("followers")
    ){

      followers.push(
        ...users
      );

    }




    if(
      lower.includes("following")
    ){

      following.push(
        ...users
      );

    }


  }






  return {

    followers:
      toUsers(followers),


    following:
      toUsers(following),


    pendingRequests: [],


    receivedRequests: [],


    recentlyUnfollowed: []

  };


}
