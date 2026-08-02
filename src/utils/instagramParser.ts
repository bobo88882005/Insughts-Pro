import {
  InstagramUser
} from "../types/instagram";





function normalizeUsername(
  username: string
){

  return username
    .trim()
    .replace("@", "")
    .toLowerCase();

}







function createProfileUrl(
  username:string
){

  return `https://www.instagram.com/${username}/`;

}







function uniqueUsers(
  users: InstagramUser[]
){

  const map =
    new Map<string, InstagramUser>();



  users.forEach(

    user => {

      map.set(

        user.username.toLowerCase(),

        user

      );

    }

  );



  return Array.from(
    map.values()
  );

}








export async function parseInstagramZip(
  file: File
): Promise<InstagramUser[]> {



  const text =
    await file.text();




  const users: InstagramUser[] = [];





  const regex =
    /instagram\.com\/([a-zA-Z0-9._]+)/gi;





  let match;



  while(
    (match = regex.exec(text)) !== null
  ){


    const username =
      normalizeUsername(
        match[1]
      );



    if(
      username &&
      !username.includes("accounts")
    ){


      users.push({

        username,

        profileUrl:
          createProfileUrl(
            username
          )

      });


    }


  }






  return uniqueUsers(
    users
  );

}
