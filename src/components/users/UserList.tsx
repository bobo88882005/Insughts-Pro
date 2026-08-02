import {
  InstagramUser
} from "../../types/instagram";


import UserRow
from "./UserRow";





interface Props {

  users: InstagramUser[];

}







export default function UserList(
  {
    users
  }: Props
){



  if(
    users.length === 0
  ){


    return (

      <div

        className="
          mt-6
          rounded-3xl
          bg-white/5
          p-6
          text-center
          text-gray-400
        "

      >

        Nessun utente trovato

      </div>

    );


  }






  return (


    <section

      className="
        mt-6
        rounded-3xl
        bg-white/5
        backdrop-blur-xl
        border
        border-white/10
        overflow-hidden
      "

    >



      <div

        className="
          max-h-[520px]
          overflow-y-auto
          divide-y
          divide-white/10
        "

      >



        {
          users.map(

            user => (

              <UserRow

                key={
                  user.username
                }

                user={
                  user
                }

              />

            )

          )
        }



      </div>



    </section>


  );

}
