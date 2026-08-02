import {
  Upload
} from "lucide-react";


interface Props {

  onUpload: () => void;

}



export default function InsightsHeader({

  onUpload

}: Props) {


  return (

    <header
      className="
        sticky
        top-0
        z-30
        -mx-4
        px-4
        pt-8
        pb-5
        bg-black/60
        backdrop-blur-xl
        border-b
        border-white/10
      "
    >


      <div
        className="
          flex
          items-start
          justify-between
        "
      >


        <div>


          <h1
            className="
              text-4xl
              font-bold
              tracking-tight
              text-white
            "
          >

            Insights

          </h1>



          <p
            className="
              mt-1
              text-sm
              text-gray-400
            "
          >

            Instagram Analysis

          </p>


        </div>





        <button

          onClick={onUpload}

          className="
            mt-2
            flex
            items-center
            justify-center
            h-10
            w-10
            rounded-full
            bg-white/10
            border
            border-white/10
            active:scale-95
            transition
          "

        >

          <Upload
            size={19}
          />

        </button>



      </div>


    </header>

  );

}
