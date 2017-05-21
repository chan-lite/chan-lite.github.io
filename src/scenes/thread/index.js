import receivePosts from "../../decorators/receivePostsAsProps";
import requestPosts from "../../decorators/requestPostsOnMount";
import scrollTop from "../../decorators/scrollTopOnWillMount";
import Component from "./components";

export default scrollTop(requestPosts(receivePosts(Component)));
