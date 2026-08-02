import {
  InstagramUser
} from "../types/instagram";



function extractUsername(
  value: string
): string | null {


  const match =
    value.match(
      /instagram\.com\/([^/"?]+)/i
    );


  if(match){

    return match[1];

  }


  return null;

}







export async function parseInstagramZip(
  file: File
){


  const text =
    await file.text();



  const users: InstagramUser[] = [];




  const links =
    text.match(
      /https?:\/\/(www\.)?instagram\.com\/[^"'<> ]+/gi
    ) || [];




  links.forEach(

    link => {


      const username =
        extractUsername(
          link
        );



      if(username){


        users.push({

          username,

          profileUrl:
            `https://instagram.com/${username}`

        });


      }


    }

  );




  const unique =
    Array.from(

      new Map(

        users.map(
          user => [
            user.username,
            user
          ]
        )

      ).values()

    );




  return unique;


}
