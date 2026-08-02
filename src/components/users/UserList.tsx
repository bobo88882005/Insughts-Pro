import {
  useState
} from "react";


import {
  InstagramUser
} from "../../types/instagram";


import UserRow
from "./UserRow";



interface Props {

  users: InstagramUser[];

}





export default function UserList({

  users

}: Props){



  const [search,setSearch] =
    useState("");





  const filtered =
    users.filter(

      user =>

        user.username
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )

    );







  return (

    <section

      className="
        mt-5
      "

    >



      {
        users.length > 5 &&


        <input

          value={search}

          onChange={
            e =>
              setSearch(
                e.target.value
              )
          }

          placeholder="Cerca utente"

          className="
            w-full
            mb-3
            rounded-2xl
            bg-white/[0.05]
            border
            border-white/10
            px-4
            py-3
            text-sm
            outline-none
            placeholder:text-gray-500
          "

        />

      }






      {
        filtered.length === 0 ?


        (

          <div

            className="
              text-center
              text-sm
              text-gray-500
              py-10
            "

          >

            Nessun utente trovato

          </div>

        )


        :


        (

          <div

            className="
              space-y-2
              max-h-[420px]
              overflow-y-auto
              pr-1
            "

          >

            {
              filtered.map(

                user =>

                <UserRow

                  key={
                    user.username
                  }

                  user={
                    user
                  }

                />

              )

            }


          </div>

        )

      }




    </section>

  );

}
