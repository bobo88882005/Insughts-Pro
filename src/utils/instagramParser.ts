import JSZip from "jszip";



export interface InstagramData {

  followers: string[];

  following: string[];

}





function extractUsernamesFromHtml(
  html: string
): string[] {


  const users = new Set<string>();


  const regex =
    /https:\/\/www\.instagram\.com\/([^/"?]+)/g;


  let match;


  while(
    (match = regex.exec(html)) !== null
  ){

    if(match[1]){

      users.add(
        match[1]
      );

    }

  }



  const anchorRegex =
    /<a[^>]*>([^<]+)<\/a>/g;


  while(
    (match = anchorRegex.exec(html)) !== null
  ){

    const name =
      match[1]
      .trim()
      .replace("@","");


    if(
      name &&
      !name.includes(" ")
    ){

      users.add(name);

    }

  }



  return Array.from(users);

}







function extractUsernamesFromJson(
  data: unknown
): string[] {


  const users = new Set<string>();



  function scan(
    value: any
  ){


    if(
      typeof value === "string"
    ){

      if(
        value.length > 1 &&
        !value.includes(" ")
      ){

        users.add(value);

      }


      return;

    }




    if(
      Array.isArray(value)
    ){

      value.forEach(scan);

      return;

    }





    if(
      value &&
      typeof value === "object"
    ){

      Object.values(value)
      .forEach(scan);

    }


  }




  scan(data);



  return Array.from(users);

}







export async function parseInstagramZip(
  file: File
): Promise<InstagramData>{



  const zip =
    await JSZip.loadAsync(file);



  const followers: string[] = [];

  const following: string[] = [];





  const entries =
    Object.keys(zip.files);





  for(
    const path of entries
  ){


    const lower =
      path.toLowerCase();



    if(
      !(
        lower.endsWith(".html") ||
        lower.endsWith(".json")
      )
    ){

      continue;

    }




    const content =
      await zip.files[path]
      .async("string");





    let users: string[] = [];




    if(
      lower.endsWith(".html")
    ){

      users =
        extractUsernamesFromHtml(
          content
        );

    }

    else {


      try {


        const json =
          JSON.parse(content);


        users =
          extractUsernamesFromJson(
            json
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
      Array.from(
        new Set(followers)
      ),



    following:
      Array.from(
        new Set(following)
      )

  };


}
