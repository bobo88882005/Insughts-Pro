import {
  Upload,
  Sparkles
} from "lucide-react";





interface Props {

  onUpload: () => void;

}







export default function InsightsHeader({

  onUpload

}: Props){



  return (

    <header

      className="
        pt-8
        flex
        items-start
        justify-between
      "

    >




      <div>


        <div

          className="
            flex
            items-center
            gap-2
          "

        >



          <h1

            className="
              text-4xl
              font-bold
              tracking-tight
              bg-gradient-to-r
              from-pink-500
              via-purple-500
              to-orange-400
              bg-clip-text
              text-transparent
            "

          >

            Insights

          </h1>





          <span

            className="
              flex
              items-center
              gap-1
              rounded-full
              bg-white/10
              border
              border-white/10
              px-2
              py-1
              text-[10px]
              font-semibold
              text-white/80
            "

          >

            <Sparkles size={12}/>

            PRO

          </span>




        </div>





        <p

          className="
            mt-2
            text-sm
            text-gray-400
          "

        >

          Instagram analytics dashboard

        </p>




      </div>








      <button

        onClick={
          onUpload
        }

        className="
          w-12
          h-12
          rounded-2xl
          bg-white/10
          backdrop-blur-xl
          border
          border-white/10
          flex
          items-center
          justify-center
          hover:bg-white/20
          transition-all
          duration-300
          active:scale-90
        "

      >



        <Upload

          size={22}

        />



      </button>




    </header>


  );

}
