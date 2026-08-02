import {
  InstagramUser
} from "../../types/instagram";



interface Props {

  user: InstagramUser;

}



export default function UserRow({

  user

}:Props){



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
        px-4
        py-3
        transition
        active:bg-white/10
      "

    >



      <span

        className="
          text-[15px]
          font-medium
          text-white
        "

      >

        @{user.username}

      </span>




      <span

        className="
          text-gray-500
          text-xl
        "

      >

        ›

      </span>



    </a>

  );

}
