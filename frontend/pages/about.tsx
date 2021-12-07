import React from "react";
import { MainDiv,PostDiv } from "../components/styled-components/StyledComponents";
import { useMainContext } from "../libs/MainContext";

export default function AboutPage() {
  const {theme}= useMainContext();
  return (
<MainDiv>
      <PostDiv theme={theme}>
          <a>
            <h1>About</h1>
          </a>
        <div style={{padding:"0 2em 2em 2em"}}>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam molestiae delectus similique aliquam voluptatum laboriosam officiis odio alias voluptas, commodi deserunt voluptatibus dolorum quam velit animi asperiores non minima aperiam assumenda, repellendus rerum natus? Mollitia omnis unde quas sed sunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod officia reprehenderit perspiciatis atque ab nam laborum, distinctio, eveniet incidunt architecto deleniti nesciunt odit blanditiis hic, enim cumque veritatis vero similique. Corrupti praesentium vel rerum vitae! Est, eaque repudiandae itaque tempore, modi expedita nesciunt dolor hic tempora illum numquam non delectus ipsa repellendus at omnis quam? Fuga officiis fugit ea, officia consequuntur soluta, dolores sed ab delectus cum impedit atque nisi? Ipsa inventore minus aliquid iste culpa a error porro sapiente accusantium impedit nemo, consectetur pariatur! Dolorum similique deleniti consectetur alias quas? Expedita, molestiae culpa reiciendis alias quia totam quae autem.</p>

          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, quia exercitationem? Voluptate quam molestiae consectetur dolore alias. Iusto laudantium earum nisi voluptas dolorum ipsa vel accusantium hic, ullam tempore soluta reprehenderit quidem beatae necessitatibus molestiae, est dolor. Ex impedit facere exercitationem nesciunt aspernatur praesentium officiis distinctio dolor similique animi at, maxime eius inventore esse dolore delectus sequi itaque doloribus voluptate ducimus! Minima nobis ad quas tempora magnam, ex sed neque maxime sit ratione autem a tempore iusto illo eveniet consectetur earum ipsam maiores sequi reprehenderit architecto similique dolores inventore ducimus? Non quas unde similique consequuntur esse nesciunt quos ipsum quam illum dolorum, molestias veritatis perspiciatis sed consectetur, fuga cupiditate minus. Rerum quae, necessitatibus sunt quo ab odit delectus aliquid voluptas qui atque nulla sit autem provident eligendi fugit similique a? Repudiandae eos praesentium necessitatibus ex adipisci quia odio veniam, minima magnam doloribus, delectus, quisquam fugiat possimus architecto! Praesentium nobis omnis earum minima, molestiae distinctio deleniti debitis sint, laudantium corrupti odit.</p>

          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas quis ipsam aperiam totam enim aliquam reiciendis quisquam, iste odit illo molestiae, repudiandae voluptas dolores ut magni. Maxime quidem corporis delectus, commodi vero dignissimos debitis nobis quo velit veritatis saepe laborum ratione, illo tempore maiores labore ab. Nesciunt, ad nihil! Officiis aperiam minus, deleniti possimus libero repellat soluta dolore reiciendis in animi tempora pariatur molestias mollitia architecto labore explicabo omnis fugiat molestiae neque, illo voluptatibus quae magni cum modi. Harum dolorem commodi laudantium. Non velit sed, suscipit earum hic nobis. Animi odio expedita recusandae, similique delectus explicabo eos adipisci voluptate est, voluptas perspiciatis, vero earum molestias quaerat repudiandae porro aspernatur incidunt molestiae nemo sint consectetur magni quae labore facilis! Omnis sapiente nulla repellat itaque eligendi exercitationem culpa corrupti vel, perferendis cupiditate doloremque suscipit illum ut inventore veritatis, unde quasi esse asperiores dignissimos, odit accusantium? Illum blanditiis nesciunt sequi at recusandae dolores quam mollitia, itaque ullam perferendis? Ea quasi expedita animi. Reprehenderit.</p>
        </div>
      </PostDiv>
    </MainDiv>
  );
}
