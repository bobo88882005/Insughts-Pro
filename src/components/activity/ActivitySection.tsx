interface Props {

  inactive: number;

  received: number;

  unfollowed: number;

}






export default function ActivitySection({

  inactive,

  received,

  unfollowed

}: Props){



  const items = [

    {
      title: "Possibili inattivi",
      value: inactive,
      description: "Account che interagiscono poco"
    },

    {
      title: "Richieste ricevute",
      value: received,
      description: "Nuove richieste follower"
    },

    {
      title: "Recently unfollowed",
      value: unfollowed,
      description: "Account che hanno smesso di seguirti"
    }

  ];





  return (

    <section

      className="
        mt-6
        rounded-3xl
        bg-white/5
        backdrop-blur-xl
        border
        border-white/10
        p-5
      "

    >



      <h2

        className="
          text-lg
          font-semibold
          mb-4
        "

      >

        Activity

      </h2>





      <div

        className="
          space-y-3
        "

      >



        {
          items.map(

            item => (

              <div

                key={
                  item.title
                }

                className="
                  flex
                  items-center
                  justify-between
                  rounded-2xl
                  bg-black/20
                  p-4
                  border
                  border-white/5
                "

              >



                <div>


                  <div

                    className="
                      text-sm
                      font-medium
                    "

                  >

                    {item.title}

                  </div>



                  <div

                    className="
                      text-xs
                      text-gray-500
                      mt-1
                    "

                  >

                    {item.description}

                  </div>



                </div>





                <div

                  className="
                    text-2xl
                    font-bold
                  "

                >

                  {item.value}

                </div>




              </div>


            )

          )

        }



      </div>



    </section>


  );

}
