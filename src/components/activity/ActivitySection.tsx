interface Props {

  inactive:number;

  received:number;

  unfollowed:number;

}



export default function ActivitySection({

  inactive,

  received,

  unfollowed

}:Props){



  const items = [

    {
      label:"Possibili inattivi",
      value:inactive
    },

    {
      label:"Richieste ricevute",
      value:received
    },

    {
      label:"Recently unfollowed",
      value:unfollowed
    }

  ];





  return (

    <section

      className="
        mt-5
        rounded-3xl
        bg-white/[0.03]
        border
        border-white/10
        p-4
      "

    >


      <h2

        className="
          text-xs
          uppercase
          tracking-wider
          text-gray-500
          mb-3
        "

      >

        Activity

      </h2>





      <div

        className="
          divide-y
          divide-white/10
        "

      >


        {
          items.map(item => (


            <div

              key={
                item.label
              }

              className="
                flex
                justify-between
                items-center
                py-3
              "

            >


              <span

                className="
                  text-sm
                  text-gray-300
                "

              >

                {item.label}

              </span>




              <span

                className="
                  text-sm
                  font-semibold
                  text-white
                "

              >

                {item.value}

              </span>


            </div>


          ))
        }



      </div>



    </section>

  );

}
