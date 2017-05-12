import { RequestBoardsOnMount } from "../../decorators/requestBoardsOnMount";
import { ReceiveBoardsAsProps } from "../../decorators/receiveBoardsAsProps";
import PutBoardsIntoButtons from "./buttons";

export default RequestBoardsOnMount(ReceiveBoardsAsProps(PutBoardsIntoButtons));
