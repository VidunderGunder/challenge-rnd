import SwaggerUI from "swagger-ui-react";
import { swaggerCSS } from "../../styles/swagger";

const apiUrl = process.env.API_URL;
const apiKey = "/docs";

export default function CRUD(props: {}) {
  return (
    <div css={swaggerCSS}>
      <SwaggerUI url={apiUrl + apiKey} />
    </div>
  );
}
