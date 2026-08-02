import {
  InstagramUser
} from "../types/instagram";



import JSZip from "jszip";





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







function extractUsersFromJson(
  data: any
): InstagramUser[] {



  const users: InstagramUser[] = [];





  if(
    Array.isArray(data)
  ){


    data.forEach(

      item => {


        const value =
          item?.string_list_data?.[0]
            ?.value;



        if(value){


          users.push(

            createUser(

              normalizeUsername(
                value
              )

            )

          );


        }


      }

    );


  }





  return users;

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







export async function parseInstagramZip(
  file: File
){


  const zip =
    await JSZip.loadAsync(
      file
    );



  const users: InstagramUser[] = [];






  for(
    const path of Object.keys(zip.files)
  ){


    const name =
      path.toLowerCase();




    if(
      name.endsWith(".json")
    ){



      const content =
        await zip.files[path]
          .async("text");



      try {


        const json =
          JSON.parse(
            content
          );



        users.push(

          ...extractUsersFromJson(
            json
          )

        );



      }

      catch{


        continue;

      }


    }


  }







  return uniqueUsers(
    users
  );

}
