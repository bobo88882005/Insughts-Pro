import {
  ExternalLink
} from "lucide-react";


import {
  InstagramUser
} from "../../types/instagram";





interface Props {

  user: InstagramUser;

}







export default function UserRow({

  user

}: Props){



  return (

    <a

      href={
        user.profileUrl
      }

      target="_blank"

      rel="noreferrer"

      className="
        flex
        items-center
        justify-between
        px-5
        py-4
        hover:bg-white/10
        transition
        active:scale-[0.99]
      "

    >




      <div

        className="
          flex
          items-center
          gap-3
        "

      >



        <div

          className="
            w-10
            h-10
            rounded-full
            bg-gradient-to-br
            from-pink-500
            via-purple-500
            to-orange-400
            flex
            items-center
            justify-center
            text-sm
            font-bold
          "

        >

          {
            user.username
              .charAt(0)
              .toUpperCase()
          }

        </div>





        <div>


          <div

            className="
              font-medium
              text-sm
            "

          >

            {user.username}

          </div>


          <div

            className="
              text-xs
              text-gray-500
            "

          >

            Instagram profile

          </div>



        </div>



      </div>





      <ExternalLink

        size={18}

        className="
          text-gray-400
        "

      />




    </a>

  );

}
