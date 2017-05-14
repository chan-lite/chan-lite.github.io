import React, { PureComponent } from "react";
import Rx from "rxjs/Rx";

export function BindScrollBehavior(Decorated, nearBottom) {
  return class extends PureComponent {
    customEventName: "nearBottom";
    customEventObservable: null;

    componentDidMount() {
      window.scroll(0, 0);
      this.customEventObservable = this.getObservable().subscribe(nearBottom);
      window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
      this.customEventObservable.unsubscribe();
      window.removeEventListener("scroll", this.handleScroll);
    }

    getObservable() {
      return Rx.Observable
        .fromEvent(window, this.customEventName)
        .throttleTime(2000);
    }

    handleScroll = () => {
      if (!document.body || !document.documentElement) {
        throw new Error(
          "Cannot find `body` or `documentElement` on the `document` object."
        );
      }

      const windowHeight = "innerHeight" in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;

      const docHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      const windowBottom = windowHeight + window.pageYOffset;

      if (windowBottom >= docHeight * 3 / 4) {
        window.dispatchEvent(new Event(this.customEventName));
      }
    };

    render() {
      return <Decorated {...this.props} />;
    }
  };
}
