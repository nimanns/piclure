import {
  MainDiv,
  PostDiv,
} from "../components/styled-components/StyledComponents";
import { useMainContext } from "../libs/MainContext";

export default function FAQPage() {
  const { theme } = useMainContext();
  return (
    <MainDiv>
      <PostDiv theme={theme}>
          <a>
            <h1>FAQ</h1>
          </a>
        <div style={{padding:"0 2em 2em 2em"}}>
          <h4>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi,
            pariatur?
          </h4>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem doloremque, molestias quae aperiam laboriosam dolor
            dolorum voluptatem autem, laborum enim deserunt a corrupti rerum
            sequi veritatis. Deserunt provident quibusdam veniam veritatis. Et
            rerum excepturi consectetur. Libero ea fugiat voluptate ratione!
          </p>
          <h4>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores
            maxime corporis possimus provident fuga et?
          </h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
            molestias consectetur, vero ullam natus omnis magni eligendi illum
            libero nam maxime? Quas blanditiis quasi fugit, numquam dolorem
            accusamus inventore itaque similique odio dolorum deleniti,
            asperiores magni quod? Iusto, perspiciatis soluta. Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Nam necessitatibus facere
            quos quod laboriosam voluptates adipisci sequi magnam corrupti
            soluta!
          </p>
          <h4>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia?
          </h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
            earum nulla quia sequi optio illum amet cupiditate quod ullam
            commodi qui, nesciunt deleniti quaerat. Ut voluptatum magnam at
            obcaecati sapiente sunt dolorum dolor. Ea molestiae debitis,
            voluptate excepturi, voluptatibus totam cupiditate facere distinctio
            ullam nulla vel ex repellat tempore modi adipisci hic, quia
            laboriosam? Cum, corporis sequi. Suscipit praesentium blanditiis
            adipisci quia qui facilis, odio minima ducimus inventore veritatis
            placeat.
          </p>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
            possimus nulla qui voluptas aperiam repudiandae molestiae atque
            repellendus iure sapiente, iste quia laudantium et ab nemo officiis
            provident itaque error ducimus optio assumenda quisquam, soluta
            porro deleniti. Rerum animi voluptatibus voluptatem blanditiis.
            Blanditiis repellendus, magni deleniti voluptatum rem sint id!
          </p>
        </div>
      </PostDiv>
    </MainDiv>
  );
}
