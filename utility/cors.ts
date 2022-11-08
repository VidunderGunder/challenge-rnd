import MicroCors from "micro-cors";
import Cors from "cors";

export const microCors = MicroCors();
export const cors = Cors({
  origin: "*",
});
