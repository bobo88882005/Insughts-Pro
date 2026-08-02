import {
  useState
} from "react";


import {
  InstagramUser
} from "../../types/instagram";


import UserRow from "./UserRow";



interface Props {

  users: InstagramUser[];

}



export default function UserList({

  users

}:Props){



  const [search,setSearch] =
    useState("");




  const filteredUsers =
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
        rounded-3xl
        overflow-hidden
        bg-white/5
        border
        border-white/10
      "

    >



      <div

        className="
          p-3
          border-b
          border-white/10
        "

      >

        <input

          value={search}

          onChange={
            e =>
              setSearch(
                e.target.value
              )
          }


          placeholder="
            Cerca username
          "


          className="
            w-full
            rounded-2xl
            bg-black/30
            border
            border-white/10
            px-4
            py-3
            text-sm
            outline-none
            placeholder:text-gray-500
          "

        />


      </div>






      <div

        className="
          max-h-[430px]
          overflow-y-auto
          divide-y
          divide-white/10
        "

      >



        {
          filteredUsers.length === 0

          ?

          (

            <div

              className="
                py-12
                text-center
                text-sm
                text-gray-500
              "

            >

              Nessun utente

            </div>

          )


          :


          filteredUsers.map(

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



    </section>

  );

}
