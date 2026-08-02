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

      href={user.profileUrl}

      target="_blank"

      rel="noreferrer"

      className="
        flex
        items-center
        justify-between
        rounded-2xl
        px-4
        py-3
        bg-white/[0.04]
        border
        border-white/[0.06]
        hover:bg-white/[0.08]
        transition
      "

    >



      <span

        className="
          text-sm
          font-medium
        "

      >

        @{user.username}

      </span>





      <ExternalLink

        size={16}

        className="
          text-gray-500
        "

      />



    </a>

  );

}
